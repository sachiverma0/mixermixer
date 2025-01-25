from pydantic import BaseModel, BeforeValidator, Field
from typing import Optional, List, Annotated
from fastapi.encoders import jsonable_encoder

PyObjectId = Annotated[str, BeforeValidator(str)]


class IngredientsModel(BaseModel):
    name: Optional[str] = ""
    amount: Optional[str]
    unit: Optional[str]


class RecipeModel(BaseModel):
    id: Optional[PyObjectId] = Field(None, alias="_id")
    name: str = ""
    ingredients: List[IngredientsModel] = []
    instructions: List[str] = []

    def to_json(self):
        return jsonable_encoder(self, exclude_none=True)
