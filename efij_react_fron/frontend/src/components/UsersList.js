import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');  // Obtener el token desde el localStorage

            if (!token) {
                setError('No estás autenticado');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Enviar el token en el header
                    },
                });
                setUsers(response.data);
            } catch (err) {
                // Si el token está expirado o es inválido, mostramos un mensaje y redirigimos
                if (err.response && err.response.status === 401) {
                    alert("El token ha expirado o no es válido. Por favor, inicie sesión nuevamente.");
                    localStorage.removeItem('token');  // Limpiar el token
                    // Redirigir a la página de login
                    window.location.href = '/login';
                } else {
                    setError('No se pudieron cargar los usuarios');
                }
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
