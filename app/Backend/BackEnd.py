import bcrypt
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # SQLite database URI
db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80))
    locations = db.Column(db.JSON)  # JSON field to store locations array
    items = db.Column(db.JSON)  # JSON field to store items array

    def __init__(self, username, password, locations, items):
        self.username = username
        self.password = password
        self.locations = locations
        self.items = items

# Create the database tables
with app.app_context():
    db.create_all()

# Helper Function for login:

def check_credentials(username, password):
    # Find the user in the database
    user = User.query.filter_by(username=username).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
        return user
    else:
        return None

# Define routes for user registration and login
@app.route('/register', methods=['POST'])

def register():
    data = request.json
    username = data['username']
    password = data['password'] 
    locations = data['locations']
    items = data['items']

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'})

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = User(username, hashed_password, locations, items)
    db.session.add(new_user)
    db.session.commit()
    print('getting here')
    return jsonify({'message': 'User registered successfully'})

    
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    user = check_credentials(username, password)

    if user:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid username or password'})
    

@app.route('/items', methods=['GET'])
def get_items():
    # Retrieve the items from the authenticated user
    username = request.args.get('username')
    user = User.query.filter_by(username=username).first()

    if user:
        locations = user.locations
        items = user.items
        
        return jsonify({'items': items, 'locations': locations})
    else:
        return jsonify({'message': 'Invalid username'})
    
@app.route('/update_lists', methods=['POST'])
def updated_list():
    try:
        data = request.get_json()
        username = data['username']
        items = data['items']
        locations = data['locations']
    
        
        # Update the user's locations and items in the database
        user = User.query.filter_by(username=username).first()
        if user:
            user.locations = locations
            user.items = items
            db.session.commit()
            return jsonify({'message': 'Lists updated successfully'})
        else:
            return jsonify({'message': 'Invalid username'})
    except KeyError:
        return jsonify({'message': 'Invalid data format'})
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)})
    

if __name__ == '__main__':
    app.run()

 