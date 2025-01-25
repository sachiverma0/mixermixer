import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GeneratedRecipe from "./GeneratedRecipe";
import MainPage from "./MainPage";
import RecipeList from "./RecipeList";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/generated-recipe" element={<GeneratedRecipe />} />
        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </Router>)
}

export default App;
