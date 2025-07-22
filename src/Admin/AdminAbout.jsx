// src/pages/AdminAbout.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Form,
  InputNumber,
  Button,
  message,
  Space,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const API = "http://localhost:5010/api/about";

const AdminAbout = () => {
  const [form] = Form.useForm();
  const [records, setRecords] = useState([]);
  const [editing, setEditing] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setRecords(res.data);
    } catch (err) {
      message.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setVisible(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      message.success("Deleted successfully");
      fetchData();
    } catch {
      message.error("Delete failed");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editing) {
        await axios.put(`${API}/${editing._id}`, values);
        message.success("Updated successfully");
      } else {
        await axios.post(API, values);
        message.success("Created successfully");
      }
      setVisible(false);
      fetchData();
    } catch {
      message.error("Save failed");
    }
  };

  const columns = [
    {
      title: "Years Experience",
      dataIndex: "yearsExperience",
    },
    {
      title: "Healthcare Partners",
      dataIndex: "healthcarePartners",
    },
    {
      title: "Customer Satisfaction (%)",
      dataIndex: "customerSatisfaction",
    },
    {
      title: "Support Available (Hrs)",
      dataIndex: "supportAvailable",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Confirm delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>📊 Admin - About Page Metrics</h2>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Add Metrics
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={records}
        rowKey="_id"
        loading={loading}
        bordered
      />

      <Modal
        open={visible}
        title={editing ? "Edit Metrics" : "Add Metrics"}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="yearsExperience"
            label="Years of Experience"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="healthcarePartners"
            label="Healthcare Partners"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="customerSatisfaction"
            label="Customer Satisfaction (%)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="supportAvailable"
            label="Support Available (Hours)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={24} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminAbout;
