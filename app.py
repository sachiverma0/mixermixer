import os

import bson.json_util
from flask import Flask, request, render_template, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient

import bson


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
    prompt = request.args.get("prompt")
    cocktail = {"prompt": prompt}
    print(cocktail)
    insert_result = recipes.insert_one(cocktail)
    cocktail["_id"] = str(insert_result.inserted_id)
    return cocktail


@app.route("/recipes")
def get_recipes():
    recipe_docs = recipes.find()
    recipe_list = []
    for recipe in recipe_docs:
        recipe["_id"] = str(recipe["_id"])
        recipe_list.append(recipe)
    return recipe_list


if __name__ == "__main__":
    app.run(debug=True)
