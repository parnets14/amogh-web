import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Image,
  Popconfirm,
  Rate,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";

const API_URL = "http://localhost:5010/api/testimonials";

const TestimonialsPage = () => {
  const [form] = Form.useForm();
  const [testimonials, setTestimonials] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(API_URL);
      setTestimonials(res.data);
    } catch (err) {
      message.error("Failed to load testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleAddNew = () => {
    form.resetFields();
    setEditingTestimonial(null);
    setImageFile(null);
    setPreviewUrl(null);
    setModalVisible(true);
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    form.setFieldsValue({
      name: testimonial.name,
      role: testimonial.role,
      feedback: testimonial.feedback,
      rating: testimonial.rating,
    });
    setPreviewUrl(`http://localhost:5010/uploads/testimonials/${testimonial.image}`);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Deleted");
      fetchTestimonials();
    } catch {
      message.error("Delete failed");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("role", values.role);
      formData.append("feedback", values.feedback);
      formData.append("rating", values.rating);
      if (imageFile) formData.append("image", imageFile);

      if (editingTestimonial) {
        await axios.put(`${API_URL}/${editingTestimonial._id}`, formData);
        message.success("Testimonial updated");
      } else {
        await axios.post(API_URL, formData);
        message.success("Testimonial added");
      }

      setModalVisible(false);
      form.resetFields();
      setImageFile(null);
      setPreviewUrl(null);
      fetchTestimonials();
    } catch (err) {
      message.error("Submit failed");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img) =>
        img ? (
          <Image
            width={80}
            src={`http://localhost:5010/uploads/testimonials/${img}`}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (rating) => <Rate disabled value={rating} />,
    },
    {
      title: "Actions",
      render: (_, testimonial) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(testimonial)} />
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(testimonial._id)}
          >
            <Button danger icon={<DeleteOutlined />} style={{ marginLeft: 8 }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Testimonials Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
          Add Testimonial
        </Button>
      </div>

      <Table dataSource={testimonials} columns={columns} rowKey="_id" bordered />

      <Modal
        title={editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
        okText={editingTestimonial ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="feedback"
            label="Feedback"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, type: "number" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              beforeUpload={(file) => {
                setImageFile(file);
                setPreviewUrl(URL.createObjectURL(file));
                return false;
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            {previewUrl && (
              <div style={{ marginTop: 10 }}>
                <Image
                  src={previewUrl}
                  width={120}
                  height={80}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TestimonialsPage;
