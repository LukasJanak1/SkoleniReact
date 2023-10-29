import React from "react";
import RecipeBigCard from "./RecipeBigCard";
import RecipeSmallCard from "./RecipeSmallCard";


class RecipeGridList extends React.Component {
  render() {
    function getRecipeList(recipeList, ingredientList, isBigCard,) {
      return recipeList.map((recipe) => {
        if (isBigCard) {
          return <RecipeBigCard key={recipe.id} recipe={recipe} ingredientList={ingredientList}/>;
        } else {
          return <RecipeSmallCard key={recipe.id} recipe={recipe} ingredientList={ingredientList}/>;
        }
      });
    }

    return getRecipeList(this.props.recipeList, this.props.ingredientList, this.props.isBigCard);
  }
}

export default RecipeGridList;
