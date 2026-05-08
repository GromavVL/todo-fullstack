import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getTodo = () => httpClient.get('/todo');
export const createTodo = data => httpClient.post('/todo', data);
export const deleteTodo = id => httpClient.delete(`/todo/${id}`);
export const updateTodo = (id, data) => httpClient.patch(`/todo/${id}`, data);
