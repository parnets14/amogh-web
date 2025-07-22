// src/pages/AdminCoreValues.jsx
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

const API = "http://localhost:5010/api/core-values";

const AdminCoreValues = () => {
  const [form] = Form.useForm();
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [visible, setVisible] = useState(false);

  const fetchValues = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setValues(res.data);
    } catch (err) {
      message.error("Failed to load core values");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValues();
  }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setVisible(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
    });
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      message.success("Deleted successfully");
      fetchValues();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const handleSubmit = async (valuesForm) => {
    const formData = new FormData();
    formData.append("title", valuesForm.title);
    formData.append("description", valuesForm.description);
    if (valuesForm.image?.file) {
      formData.append("image", valuesForm.image.file);
    }

    try {
      if (editing) {
        await axios.put(`${API}/${editing._id}`, formData);
        message.success("Updated successfully");
      } else {
        await axios.post(API, formData);
        message.success("Created successfully");
      }
      setVisible(false);
      fetchValues();
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
            style={{ objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    { title: "Title", dataIndex: "title" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Actions",
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)}>
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
    <div style={{ padding: "24px" }}>
      <h2>🌟 Admin - Our Core Values</h2>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <Button icon={<PlusOutlined />} type="primary" onClick={openCreate}>
          Add New Core Value
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={values}
        rowKey="_id"
        loading={loading}
        bordered
      />

      <Modal
        open={visible}
        title={editing ? "Edit Core Value" : "Add Core Value"}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>

          <Form.Item name="image" label="Image">
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCoreValues;
