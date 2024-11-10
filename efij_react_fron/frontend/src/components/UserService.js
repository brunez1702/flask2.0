import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/users';  // Ajusta a tu ruta real

const getToken = () => {
    return localStorage.getItem('token');
};

const getUsers = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};

const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }
};

const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        await axios.delete(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
    } catch (error) {
        console.error('Error deleting user', error);
        throw error;
    }
};

export default {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
