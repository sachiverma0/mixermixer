import os
from flask import Flask, request, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from model import RecipeModel

import google.generativeai as genai
import re

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:3000", "http://localhost:3000"])

load_dotenv("../.env", override=True)

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["coke"]
recipes = db["recipes"]

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")


@app.route("/")
def home():
    return render_template("recipe.html")


def process_output(output):
    recipe_dict = {"ingredients": [], "instructions": []}
    for line in output.split("\n"):
        if line.strip():
            name_pattern = r"^Name: (.+)$"
            name_match = re.match(name_pattern, line)
            print(line)
            if name_match:
                recipe_dict["name"] = name_match.group(1).strip()
                continue
            ingredient_pattern = r"^\* (.*) ([a-z]+) (.*)$"
            ingredient_match = re.match(ingredient_pattern, line)
            if ingredient_match:
                recipe_dict["ingredients"].append(
                    {
                        "name": ingredient_match.group(3).strip(),
                        "amount": ingredient_match.group(1),
                        "unit": ingredient_match.group(2),
                    }
                )
                continue
            instruction_pattern = r"^\d+. .*$"
            instruction_match = re.match(instruction_pattern, line)
            if instruction_match:
                recipe_dict["instructions"].append(line)

    return recipe_dict


@app.route("/generate_recipe", methods=["POST", "GET"])
def generate_recipe():
    # Retrieve the user input from the previous page
    theme = request.get_json().get(
        "theme", "anything"
    )  # Replace 'default theme' with a fallback value if necessary

    # gemini prompt
    prompt = f'Generate a drink recipe that only uses brands owned by Coca-Cola with no extra non-Coca-Cola-owned ingredients. I want the name (in the format "Name: [emoji] ___"), ingredients (bulleted), and instructions (numbered) in that order with no extra text. Include an emoji at the beginning of the name (put it after the Name: part). Please give me quantities for the ingredients. It is ok if they are overestimates. Adjust the amounts for something that is suitable to serve one person. Try following this theme: {theme}. Make it fun and very random, and make the name something unique.'

    response = model.generate_content(prompt)

    return RecipeModel(**process_output(response.text)).to_json()


@app.post("/recipes")
def save_recipe():
    recipe = RecipeModel(**request.json)
    recipes.insert_one(recipe.to_json())
    return recipe.to_json()


@app.get("/recipes")
def get_recipes():
    return [RecipeModel(**doc).to_json() for doc in recipes.find()]


if __name__ == "__main__":
    app.run(debug=True)
