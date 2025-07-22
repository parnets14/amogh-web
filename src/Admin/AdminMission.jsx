// src/pages/AdminMission.jsx
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

const API = "http://localhost:5010/api/missions";

const AdminMission = () => {
  const [form] = Form.useForm();
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMission, setEditingMission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch all missions
  const fetchMissions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setMissions(res.data);
    } catch (err) {
      message.error("Failed to fetch missions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  // Open modal for creating new mission
  const handleCreate = () => {
    setEditingMission(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Open modal for editing
  const handleEdit = (record) => {
    setEditingMission(record);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      points: record.points.join(", "),
    });
    setIsModalVisible(true);
  };

  // Delete mission
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      message.success("Mission deleted");
      fetchMissions();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  // Form submit (create or update)
  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append(
      "points",
      JSON.stringify(values.points.split(",").map((p) => p.trim()))
    );
    if (values.image?.file) {
      formData.append("image", values.image.file);
    }

    try {
      if (editingMission) {
        await axios.put(`${API}/${editingMission._id}`, formData);
        message.success("Mission updated");
      } else {
        await axios.post(API, formData);
        message.success("Mission created");
      }
      setIsModalVisible(false);
      fetchMissions();
    } catch (err) {
      message.error("Save failed");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img) =>
        img ? (
          <Image src={`http://localhost:5010${img}`} width={60} />
        ) : (
          "No Image"
        ),
    },
    { title: "Title", dataIndex: "title" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Points",
      dataIndex: "points",
      render: (points) =>
        points?.map((p, i) => (
          <div key={i}>
            • {p}
          </div>
        )),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this mission?"
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
    <div style={{ padding: "24px" }}>
      <h2>📌 Admin Mission Panel</h2>

      {/* Add Button aligned right */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Add New Mission
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={missions}
        rowKey="_id"
        loading={loading}
        bordered
      />

      <Modal
        title={editingMission ? "Edit Mission" : "Create Mission"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="points"
            label="Points (comma separated)"
            rules={[{ required: true }]}
          >
            <Input placeholder="e.g., Step 1, Step 2, Step 3" />
          </Form.Item>

          <Form.Item name="image" label="Upload Image">
            <Upload
              maxCount={1}
              listType="picture"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminMission;
