from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from flask_cors import CORS  # Importar CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Define tu clave secreta aquí
jwt = JWTManager(app)
CORS(app)

# Endpoint de login para autenticar al admin
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # Verificación ficticia de las credenciales (esto lo harías con la base de datos)
    if username == 'admin' and password == '1234':
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

# Endpoint para obtener la lista de usuarios (requiere autenticación)
@app.route('/users', methods=['GET'])
@jwt_required()  # Este decorador protege el endpoint
def get_users():
    # Lista de ejemplo de usuarios
    users = [{"id": 1, "username": "user1", "email": "user1@example.com", "role": "admin"}]
    return jsonify(users), 200

# Endpoint para crear un usuario (requiere autenticación)
@app.route('/users', methods=['POST'])
@jwt_required()
def create_user():
    username = request.json.get('username')
    email = request.json.get('email')
    password = generate_password_hash(request.json.get('password'))  # Encriptar la contraseña

    # Lógica para crear un usuario (esto va a la base de datos)
    return jsonify({"msg": "Usuario creado"}), 201

# Agrega aquí otros endpoints para editar y eliminar usuarios con el decorador @jwt_required()

if __name__ == '__main__':
    app.run(debug=True)
