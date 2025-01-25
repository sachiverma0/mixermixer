from model import RecipeModel, IngredientsModel

def test_recipe_model():
    recipe = RecipeModel(
        name="Tropical Drink",
        ingredients=[
            {"name": "Sprite", "amount": 1, "unit": "cup"},
            {"name": "Fanta Pineapple", "amount": 1, "unit": "cup"}
        ],
        instructions=["Mix ingredients", "Serve chilled"]
    )
    assert recipe.name == "Tropical Drink"
    assert len(recipe.ingredients) == 2
    assert recipe.instructions[0] == "Mix ingredients"
