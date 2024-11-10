# routes/user_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models.user import User
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash, check_password_hash

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Invalid credentials"}), 401


from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from app import db

user_routes = Blueprint('user_routes', __name__)

# Ruta para crear un usuario
@user_routes.route('/users', methods=['POST'])
@jwt_required()
def create_user():
    current_user_id = get_jwt_identity()
    # Aquí podríamos verificar que el usuario que crea es un administrador (por ejemplo)
    
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'user')  # Por defecto, los nuevos usuarios no son admin

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, role=role)

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

# Ruta para obtener todos los usuarios
@user_routes.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    users_list = [{"id": user.id, "username": user.username, "role": user.role} for user in users]
    
    return jsonify(users_list), 200

# Ruta para actualizar un usuario
@user_routes.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    username = data.get('username', user.username)
    password = data.get('password')
    role = data.get('role', user.role)

    user.username = username
    if password:
        user.password = generate_password_hash(password)
    user.role = role

    db.session.commit()
    
    return jsonify({"msg": "User updated successfully"}), 200

# Ruta para eliminar un usuario
@user_routes.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"msg": "User deleted successfully"}), 200
