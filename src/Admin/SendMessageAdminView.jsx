import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;

const SendMessageAdminView = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5010/api/messages');
      setMessages(res.data);
    } catch (err) {
      message.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      render: (text) => <div style={{ maxWidth: 300 }}>{text}</div>,
    },
    {
      title: 'Submitted At',
      dataIndex: 'createdAt',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Send a Message - Admin Panel</Title>

      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={messages}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default SendMessageAdminView;
