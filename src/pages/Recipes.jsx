import React from "react";

function Recipes({ recipes }) {
  return (
    <div>
      Rezepte:
      <ul>{recipes && recipes.map(recipe => <ul>{recipe.name}</ul>)}</ul>
    </div>
  );
}

export default Recipes;
