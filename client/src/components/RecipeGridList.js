import React from "react";
import RecipeBigCard from "./RecipeBigCard";
import RecipeSmallCard from "./RecipeSmallCard";


class RecipeGridList extends React.Component {
  render() {
    function getRecipeList(recipeList, ingredientList, isBigCard, addRecipeShow,) {

      if (isBigCard) {
        return (<div className="row">
          
          {recipeList.map((recipe) => <div className="col-12 d-flex"
                                           style={{paddingBottom: "5px"}}>
            <RecipeBigCard key={recipe.id} recipe={recipe}
                           ingredientList={ingredientList}
                           addRecipeShow={addRecipeShow}/>
          </div>)}
        </div>);

      } else {

        return (<div className="row">
          {recipeList.map((recipe) => <div className="col-12 col-md-6 col-xl-4 col-xxl-3 d-flex"
                                           style={{paddingBottom: "5px"}}>
            <RecipeSmallCard key={recipe.id}
                             recipe={recipe}
                             ingredientList={ingredientList}
                             addRecipeShow={addRecipeShow}/>
          </div>)}
        </div>);
      }
    }
    return getRecipeList(this.props.recipeList, this.props.ingredientList, this.props.isBigCard, this.props.addRecipeShow,);
  }
}
export default RecipeGridList;
