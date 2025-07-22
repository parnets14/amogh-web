import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Card, notification } from "antd";
import axios from "axios";

const API_URL = "http://localhost:5010/api/map-embed";

const MapEmbedAdmin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");

  const fetchMapEmbed = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data?.embedUrl) {
        form.setFieldsValue({ embedUrl: res.data.embedUrl });
        setEmbedUrl(res.data.embedUrl);
      }
    } catch (error) {
      console.error("Failed to fetch map embed URL", error);
      message.error("Error loading map embed URL");
    }
  };

  useEffect(() => {
    fetchMapEmbed();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post(API_URL, values);
      setEmbedUrl(values.embedUrl);

      notification.success({
        message: "Location Updated",
        description: "Google Maps embed URL has been updated successfully.",
        placement: "topRight",
      });
    } catch (error) {
      console.error(error);
      message.error("Failed to update map embed URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card title="Update Google Maps Embed URL" className="mb-6 shadow-lg">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Google Maps Embed URL"
            name="embedUrl"
            rules={[{ required: true, message: "Please enter the Google Maps embed URL" }]}
          >
            <Input.TextArea
              rows={3}
              onChange={(e) => setEmbedUrl(e.target.value)}
              placeholder="Paste only the iframe 'src' URL here"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Map
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {embedUrl && (
        <Card title="Live Map Preview" className="shadow-md">
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map Preview"
          ></iframe>
        </Card>
      )}
    </div>
  );
};

export default MapEmbedAdmin;
