from flask import Flask, render_template, request, redirect, url_for, jsonify
from dotenv import load_dotenv
import os
import openai
from pymongo import MongoClient

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# MongoDB Configuration
mongo_client = MongoClient("mongodb://localhost:27017/")
db = mongo_client["drink_recipes_db"]
recipes_collection = db["recipes"]

import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Gemini API Base URL (Update this with the actual Gemini API endpoint)
GEMINI_API_URL = "https://api.gemini.com/v1/endpoint"  # Replace with actual endpoint
GEMINI_API_KEY = "your_gemini_api_key_here"  # Replace with your Gemini API key

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    theme = data.get('theme', '')

    # Request payload for Gemini API
    payload = {
        "prompt": f"Generate a drink recipe that only uses Coca-Cola owned drinks with the theme: {theme}.",
        "other_parameters": "value"  # Add any other required parameters based on Gemini's API
    }

    # Headers for Gemini API
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GEMINI_API_KEY}"  # Or whatever auth method Gemini requires
    }

    try:
        # Send the request to Gemini API
        response = requests.post(GEMINI_API_URL, json=payload, headers=headers)
        response.raise_for_status()  # Raise an error if the request failed

        # Parse the response from Gemini
        gemini_response = response.json()

        # Return the Gemini API response to the frontend
        return jsonify(gemini_response)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)


@app.route('/save_recipe', methods=['POST'])
def save_recipe():
    # Save the recipe to MongoDB
    recipe = request.json  # The frontend sends the recipe data in JSON format
    recipes_collection.insert_one(recipe)
    return jsonify({"status": "success", "message": "Recipe saved successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
