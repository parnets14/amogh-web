import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import axios from 'axios';

const API_URL = 'http://localhost:5010/api/contact-info';

const ContactInformationAdmin = () => {
  const [form] = Form.useForm();
  const [infoList, setInfoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setInfoList(res.data ? [res.data] : []);
    } catch (err) {
      message.error('Failed to load contact info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (editingInfo) {
        await axios.put(`${API_URL}/${editingInfo._id}`, values);
        message.success('Updated successfully');
      } else {
        await axios.post(API_URL, values);
        message.success('Created successfully');
      }
      fetchInfo();
      form.resetFields();
      setModalOpen(false);
      setEditingInfo(null);
    } catch (err) {
      message.error('Error saving data');
    }
  };

  const handleEdit = (record) => {
    setEditingInfo(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success('Deleted successfully');
      fetchInfo();
    } catch (err) {
      message.error('Delete failed');
    }
  };

  const columns = [
    { title: 'Address', dataIndex: 'address' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Business Hours', dataIndex: 'businessHours' },
    { title: 'WhatsApp Number', dataIndex: 'whatsappNumber' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger type="link">Delete</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Contact Information</h2>
        <Button type="primary" onClick={() => { setModalOpen(true); form.resetFields(); setEditingInfo(null); }}>
          Add Contact Info
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={infoList}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />

      <Modal
        title={editingInfo ? 'Edit Contact Info' : 'Add Contact Info'}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setEditingInfo(null); }}
        onOk={() => form.submit()}
        okText={editingInfo ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Business Hours" name="businessHours" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="WhatsApp Number" name="whatsappNumber" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactInformationAdmin;
