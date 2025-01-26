import os
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from model import RecipeModel

from bson.objectid import ObjectId

import google.generativeai as genai
import re

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:3000", "http://localhost:3000"])

load_dotenv("../.env", override=True)

MONGODB_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGODB_URI, tlsAllowInvalidCertificates=True)
db = client["coke"]
recipes = db["recipes"]

genai.configure(api_key=os.getenv("AIzaSyDcVVO5FGcQzmSec-gWKBRjUpZ8IDjucc4"))
model = genai.GenerativeModel("gemini-1.5-flash")


@app.route("/")
def home():
    return render_template("recipe.html")


def process_output(output):
    recipe_dict = {"ingredients": [], "instructions": [], "favorited": False}
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

    cocacola_products = """
        Sparkling Drinks:
        Coca-Cola
        Diet Coke
        Coca-Cola Zero Sugar
        Sprite
        Fanta
        Barq's
        Fresca
        Mello Yello
        Seagram's Ginger Ale

        Waters and Hydration:
        Dasani
        Smartwater
        Vitaminwater
        Powerade

        Juices, Dairy, and Plant-Based Beverages:
        Minute Maid
        Simply
        Fairlife
        Odwalla
        Honest Kids


        Tea and Coffee:
        Gold Peak Tea
        Honest Tea
        Peace Tea
        Fuze Tea

        Energy Drinks:
        Full Throttle
        NOS

        Alcohol Ready-to-Drink Beverages:
        Topo Chico Hard Seltzer
        Simply Spiked Lemonade
    """

    # gemini prompt
    prompt = f'Generate a drink recipe that only uses brands owned by Coca-Cola with no extra non-Coca-Cola-owned ingredients. I want the name (in the format "Name: [emoji] ___"), ingredients (bulleted), and instructions (numbered) in that order with no extra text. Include an emoji at the beginning of the name (put it after the Name: part). Please give me quantities for the ingredients. It is ok if they are overestimates. Adjust the amounts for something that is suitable to serve one person. Try following this theme: {theme}. Also, if the theme has a color palette, make sure the drink follows that color palette. Make it fun and very random, and make the name something unique. For your reference, here are some of the Coca-Cola products to choose from: {cocacola_products}'

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


@app.patch("/update-favorite")
def update_favorite():

    data = request.get_json()
    print(data)
    item_id = data.get("itemId")
    favorited = data.get("favorited")

    result = recipes.update_one(
        {"_id": ObjectId(item_id)},  # Find the item by ID
        {"$set": {"favorited": favorited}},  # Update the is_favorite field
    )

    if result.matched_count == 0:
        return jsonify({"message": "Item not found"}), 404

    return jsonify({"message": "done"})


if __name__ == "__main__":
    app.run(debug=True)
