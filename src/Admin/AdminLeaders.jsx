// src/pages/AdminLeaders.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  Upload,
  Space,
  message,
  Image,
  Popconfirm,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const API = "http://localhost:5010/api/leaders";

const AdminLeaders = () => {
  const [form] = Form.useForm();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch all leaders
  const fetchLeaders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setLeaders(res.data);
    } catch (err) {
      message.error("Failed to load leaders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  // Open modal to create
  const handleCreate = () => {
    setEditingLeader(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Open modal to edit
  const handleEdit = (record) => {
    setEditingLeader(record);
    form.setFieldsValue({
      name: record.name,
      role: record.role,
      bio: record.bio,
    });
    setModalVisible(true);
  };

  // Delete leader
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      message.success("Leader deleted");
      fetchLeaders();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  // Submit form
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("role", values.role);
    formData.append("bio", values.bio);
    if (values.image?.file) {
      formData.append("image", values.image.file);
    }

    try {
      if (editingLeader) {
        await axios.put(`${API}/${editingLeader._id}`, formData);
        message.success("Leader updated");
      } else {
        await axios.post(API, formData);
        message.success("Leader created");
      }
      setModalVisible(false);
      fetchLeaders();
    } catch (err) {
      message.error("Save failed");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img) =>
        img ? (
          <Image
            src={`http://localhost:5010${img}`}
            width={60}
            height={60}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        ) : (
          "No Image"
        ),
    },
    { title: "Name", dataIndex: "name" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Bio",
      dataIndex: "bio",
      render: (bio) => (
        <div style={{ maxWidth: 300, whiteSpace: "pre-line" }}>{bio}</div>
      ),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
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
      <h2>👥 Admin - Meet Our Leadership</h2>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add Leader
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={leaders}
        rowKey="_id"
        loading={loading}
        bordered
      />

      <Modal
        title={editingLeader ? "Edit Leader" : "Add Leader"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Leader's full name" />
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Input placeholder="e.g., CEO, CTO" />
          </Form.Item>

          <Form.Item name="bio" label="Bio" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Short biography" rows={4} />
          </Form.Item>

          <Form.Item name="image" label="Profile Image">
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminLeaders;
