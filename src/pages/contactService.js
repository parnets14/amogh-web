// src/services/contactService.js
import axios from 'axios';

const API_BASE = 'http://localhost:5010/api';

export const getContactInfo = () => axios.get(`${API_BASE}/contact-info`);
export const updateContactInfo = (id, data) => axios.put(`${API_BASE}/contact-info/${id}`, data);
export const createContactInfo = (data) => axios.post(`${API_BASE}/contact-info`, data);

export const getMessages = () => axios.get(`${API_BASE}/messages`);
export const submitMessage = (data) => axios.post(`${API_BASE}/messages`, data);

export const getMapEmbed = () => axios.get(`${API_BASE}/map-embed`);
export const updateMapEmbed = (data) => axios.post(`${API_BASE}/map-embed`, data);