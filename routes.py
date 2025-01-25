from flask import Blueprint, render_template, request, jsonify
from flaskbackend import generate_recipe_logic  # Import your custom backend logic

# Create a Blueprint for the routes
routes = Blueprint('routes', __name__)

# Define a route for generating a recipe
@routes.route('/generate_recipe', methods=['GET'])
def generate_recipe():
    theme = request.args.get('theme', 'default theme')
    recipe = generate_recipe_logic(theme)  # Call your backend function
    return render_template('recipe.html', recipe=recipe, theme=theme)

# Define a route for saving a recipe
@routes.route('/save_recipe', methods=['POST'])
def save_recipe():
    recipe = request.json  # The frontend sends the recipe data in JSON format
    # Save to MongoDB logic here
    return jsonify({"status": "success", "message": "Recipe saved successfully!"}), 200
