from flask import Flask, render_template, request, redirect, url_for, jsonify
from dotenv import load_dotenv
import os
import openai
from pymongo import MongoClient

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Get the OpenAI API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

# MongoDB Configuration
mongo_client = MongoClient("mongodb://localhost:27017/")
db = mongo_client["drink_recipes_db"]
recipes_collection = db["recipes"]

@app.route('/generate_recipe', methods=['POST', 'GET'])
def generate_recipe():
    # Retrieve the user input from the previous page
    theme = request.args.get('theme', 'default theme')  # Replace 'default theme' with a fallback value if necessary
    
    # Prompt to be sent to OpenAI
    prompt = f"Generate a drink recipe that only uses coca cola owned drinks that follows this theme: {theme}"
    
    # Call OpenAI's ChatGPT API
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                {"role": "user", "content": prompt}
            ]
        )
        recipe_json = response.choices[0].message['content']
        recipe = eval(recipe_json)  # Parse the JSON response

    except Exception as e:
        recipe = {
            "name": "Error Generating Recipe",
            "ingredients": [],
            "instructions": [f"Error: {str(e)}"]
        }
    
    # Render the recipe on the page
    return render_template('recipe.html', recipe=recipe, theme=theme)

@app.route('/save_recipe', methods=['POST'])
def save_recipe():
    # Save the recipe to MongoDB
    recipe = request.json  # The frontend sends the recipe data in JSON format
    recipes_collection.insert_one(recipe)
    return jsonify({"status": "success", "message": "Recipe saved successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
