import os

from flask import Flask, request, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient

from model import RecipeModel


app = Flask(__name__)
CORS(app)

load_dotenv("../.env", override=True)
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

db = client["coke"]
recipes = db["recipes"]


@app.route("/")
def home():
    return render_template("recipe.html")


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
