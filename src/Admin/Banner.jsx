import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Table,
  message,
  Modal,
  Space,
  Image,
  Popconfirm,
} from 'antd';
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const API_URL = 'http://localhost:5010/api/banners';

const BannerPage = () => {
  const [form] = Form.useForm();
  const [banners, setBanners] = useState([]);
  const [editing, setEditing] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchBanners = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setBanners(data);
    } catch (error) {
      console.error("Fetch error:", error);
      message.error('Failed to fetch banners');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const openModal = (record = null) => {
    setEditing(record);
    setModalVisible(true);
    form.resetFields();
    setFileList([]);

    if (record) {
      form.setFieldsValue(record);
      if (record.image) {
        setFileList([
          {
            uid: '-1',
            name: record.image,
            status: 'done',
            url: `http://localhost:5010/uploads/images/${record.image}`,
          },
        ]);
      }
    }
  };

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('cta', values.cta);

    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.originFileObj) {
        formData.append('image', file.originFileObj);
      }
    }

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing._id}`, formData);
        message.success('Banner updated');
      } else {
        await axios.post(API_URL, formData);
        message.success('Banner created');
      }
      fetchBanners();
      form.resetFields();
      setFileList([]);
      setModalVisible(false);
      setEditing(null);
    } catch (error) {
      console.error('Save error:', error);
      message.error('Failed to save banner');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success('Banner deleted successfully');
      fetchBanners(); // Refresh the list
    } catch (error) {
      console.error('Delete error:', error);
      message.error('Failed to delete banner');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'CTA', dataIndex: 'cta' },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) =>
        image && (
          <Image
            width={100}
            src={`http://localhost:5010/uploads/images/${image}`}
            alt="banner"
            style={{ borderRadius: 8 }}
          />
        ),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this banner?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Banner Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Add New Banner
        </Button>
      </div>

      <Table
        dataSource={banners}
        rowKey={(record) => record._id || record.id}
        columns={columns}
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editing ? 'Edit Banner' : 'Add New Banner'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter banner title" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Enter banner description" />
          </Form.Item>

          <Form.Item name="cta" label="CTA">
            <Input placeholder="Enter call-to-action text" />
          </Form.Item>

          <Form.Item label="Upload Image">
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editing ? 'Update Banner' : 'Create Banner'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BannerPage;
