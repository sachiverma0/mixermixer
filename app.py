import os

from flask import Flask, request, render_template
from dotenv import load_dotenv
from pymongo import MongoClient

from model import RecipeModel


app = Flask(__name__)

load_dotenv(override=True)
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

db = client["coke"]
recipes = db["recipes"]


@app.route("/")
def home():
    return "Hello, World!"


@app.post("/recipes")
def save_recipe():
    output = request.args.get("output")
    recipe = RecipeModel(
        **{
            "name": "yummy drink",
            "ingredients": [
                {"name": "sprite", "amount": 2, "unit": "oz"},
                {"name": "gold peak iced tea or smth idk", "amount": 1, "unit": "oz"},
            ],
            "instructions": [],
        }
    )  # RecipeModel(**{"name": prompt})
    insert_result = recipes.insert_one(recipe)
    recipe["_id"] = str(insert_result.inserted_id)
    return recipe.to_json()


@app.route("/recipes")
def get_recipes():
    return [RecipeModel(**doc).to_json() for doc in recipes.find()]


if __name__ == "__main__":
    app.run(debug=True)
