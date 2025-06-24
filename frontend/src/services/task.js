// services/task.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/tasks";

const config = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getTasks = () => axios.get(API, config());
export const addTask = (title) => axios.post(API, { title }, config());
export const updateTask = (id, status) => axios.put(`${API}/${id}`, { status }, config());
export const deleteTask = (id) =>
  axios.delete(`${API}/${id}`, config());

export const editTask = (id, title) =>
  axios.put(`${API}/${id}`, { title }, config());

