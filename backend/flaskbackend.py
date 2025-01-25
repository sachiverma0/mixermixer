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

@app.route('/generate', methods=['POST'])
def generate_drink():
    # Get the theme entered by the user
    theme = request.form.get('theme')

    # Construct the prompt
    prompt = f"Generate a drink recipe that only uses Coca-Cola owned drinks that follows this theme: {theme}"

    try:
        # Call the OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Choose the desired OpenAI model
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                {"role": "user", "content": prompt}
            ]
        )

        # Extract the JSON content from the response
        recipe_json = response.choices[0].message['content']
        recipe = eval(recipe_json)  # Parse the JSON response (use `json.loads` if preferred)

    except Exception as e:
        # Handle errors gracefully
        recipe = {
            "name": "Error Generating Recipe",
            "ingredients": [],
            "instructions": [f"Error: {str(e)}"]
        }

    # Render the recipe in the `generated_recipe.html` page
    return render_template('generated_recipe.html', recipe=recipe, theme=theme)


@app.route('/save_recipe', methods=['POST'])
def save_recipe():
    # Save the recipe to MongoDB
    recipe = request.json  # The frontend sends the recipe data in JSON format
    recipes_collection.insert_one(recipe)
    return jsonify({"status": "success", "message": "Recipe saved successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
