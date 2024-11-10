import React, { useState, useEffect } from 'react';
import UserService from './UserService';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');  // "admin" o "user"
    const [editUserId, setEditUserId] = useState(null);
    const [error, setError] = useState('');
    
    useEffect(() => {
        // Cargar la lista de usuarios al cargar la página
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        try {
            const usersList = await UserService.getUsers();
            setUsers(usersList);
        } catch (error) {
            setError('Error al obtener usuarios');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userData = {
            username,
            password,
            role,
        };
        
        if (editUserId) {
            // Actualizar usuario existente
            try {
                await UserService.updateUser(editUserId, userData);
                fetchUsers();  // Volver a cargar la lista de usuarios
                resetForm();
            } catch (error) {
                setError('Error al actualizar usuario');
            }
        } else {
            // Crear nuevo usuario
            try {
                await UserService.createUser(userData);
                fetchUsers();  // Volver a cargar la lista de usuarios
                resetForm();
            } catch (error) {
                setError('Error al crear usuario');
            }
        }
    };
    
    const handleEdit = (user) => {
        setUsername(user.username);
        setPassword('');  // No mostrar la contraseña
        setRole(user.role);
        setEditUserId(user.id);  // Guardar el ID del usuario a editar
    };
    
    const handleDelete = async (userId) => {
        try {
            await UserService.deleteUser(userId);
            fetchUsers();  // Volver a cargar la lista de usuarios
        } catch (error) {
            setError('Error al eliminar usuario');
        }
    };
    
    const resetForm = () => {
        setUsername('');
        setPassword('');
        setRole('user');
        setEditUserId(null);
    };
    
    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            
            {/* Formulario de creación o edición */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">{editUserId ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
            </form>
            
            {/* Mostrar mensaje de error */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {/* Lista de usuarios */}
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Editar</button>
                                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
