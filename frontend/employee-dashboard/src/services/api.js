import axios from 'axios';

// Set up base URL for axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api/employees',
});

// Add Employee
export const addEmployee = async (formData) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  try {
    return await api.post('/add', formData, config);
  } catch (error) {
    console.error('Error adding employee:', error.response ? error.response.data : error.message);
    throw error; // Optional: propagate the error
  }
};

// Get all Employees
export const getEmployees = async () => {
  try {
    return await api.get('/list');
  } catch (error) {
    console.error('Error fetching employees:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete Employee
export const deleteEmployee = async (id) => {
  try {
    return await api.delete(`/delete/${id}`);
  } catch (error) {
    console.error('Error deleting employee:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Edit Employee
export const editEmployee = async (id, updatedData) => {
  try {
    return await api.put(`/edit/${id}`, updatedData);
  } catch (error) {
    console.error('Error editing employee:', error.response ? error.response.data : error.message);
    throw error;
  }
};
