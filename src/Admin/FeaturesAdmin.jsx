import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  Row,
  Col,
} from 'antd';
import axios from 'axios';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const API_URL = 'http://localhost:5010/api/features';

const FeaturesAdmin = () => {
  const [form] = Form.useForm();
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all features
  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setFeatures(res.data);
    } catch (err) {
      message.error('Failed to fetch features');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // Submit form
  const handleSubmit = async (values) => {
    try {
      if (editingFeature) {
        await axios.put(`${API_URL}/${editingFeature._id}`, values);
        message.success('Feature updated successfully');
      } else {
        await axios.post(API_URL, values);
        message.success('Feature added successfully');
      }
      setModalOpen(false);
      form.resetFields();
      setEditingFeature(null);
      fetchFeatures();
    } catch (err) {
      message.error('Failed to save feature');
    }
  };

  // Delete feature
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success('Feature deleted');
      fetchFeatures();
    } catch (err) {
      message.error('Delete failed');
    }
  };

  // Open modal for editing
  const openEditModal = (feature) => {
    setEditingFeature(feature);
    form.setFieldsValue(feature);
    setModalOpen(true);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this feature?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <h2 style={{ margin: 0 }}>Feature Management</h2>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields();
              setEditingFeature(null);
              setModalOpen(true);
            }}
          >
            Add Feature
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={features}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingFeature ? 'Edit Feature' : 'Add Feature'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText={editingFeature ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeaturesAdmin;
