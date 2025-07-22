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
  Row,
  Col,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const API_URL = "http://localhost:5010/api/offer-banners";

const OfferBannerPage = () => {
  const [form] = Form.useForm();
  const [offers, setOffers] = useState([]);
  const [editingOffer, setEditingOffer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(API_URL);
      setOffers(res.data);
    } catch (error) {
      message.error("Failed to load offers");
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("cta", values.cta);
      if (imageFile) formData.append("image", imageFile);

      if (editingOffer) {
        await axios.put(`${API_URL}/${editingOffer._id}`, formData);
        message.success("Offer updated");
      } else {
        await axios.post(API_URL, formData);
        message.success("Offer created");
      }

      setModalVisible(false);
      form.resetFields();
      setImageFile(null);
      setPreviewUrl(null);
      setEditingOffer(null);
      fetchOffers();
    } catch (error) {
      message.error("Submit failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Offer deleted");
      fetchOffers();
    } catch {
      message.error("Delete failed");
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    form.setFieldsValue({
      title: offer.title,
      description: offer.description,
      cta: offer.cta,
    });
    setPreviewUrl(`http://localhost:5010/uploads/offers/${offer.image}`);
    setModalVisible(true);
  };

  const handleAddNew = () => {
    form.resetFields();
    setEditingOffer(null);
    setImageFile(null);
    setPreviewUrl(null);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img) =>
        img ? (
          <Image width={80} src={`http://localhost:5010/uploads/offers/${img}`} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "CTA",
      dataIndex: "cta",
    },
    {
      title: "Actions",
      render: (_, offer) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(offer)} />
          <Popconfirm title="Confirm delete?" onConfirm={() => handleDelete(offer._id)}>
            <Button danger icon={<DeleteOutlined />} style={{ marginLeft: 8 }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Row justify="space-between" align="middle" className="mb-4">
        <Col>
          <h2 className="text-2xl font-semibold">Offer Banner Management</h2>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
          >
            Add Offer
          </Button>
        </Col>
      </Row>

      <Table dataSource={offers} columns={columns} rowKey="_id" bordered />

      <Modal
        title={editingOffer ? "Edit Offer" : "Add Offer"}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setImageFile(null);
          setPreviewUrl(null);
        }}
        onOk={handleSubmit}
        okText={editingOffer ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="cta" label="CTA Button Text" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Image Upload">
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
                  width={150}
                  height={100}
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

export default OfferBannerPage;
