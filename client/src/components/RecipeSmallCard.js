import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";
import {shorter} from "../helpers/common";

class RecipeSmallCard extends React.Component {

  render() {


    return (
        <div className={styles.smallRecipe}>
          <Card className={styles.smallRecipeCard}>
            <Card.Body className={styles.smallRecipeBody}>
              <div>
                <h2 className={styles.smallRecipeName}>
                  {this.props.recipe.name}
                </h2>
                <img alt={this.props.recipe.name} src={this.props.recipe.imgUri} className={styles.smallRecipeImage}/>
                <div className={styles.recipeDescription}>
                  <div className={styles.smallRecipeDescriptionIcon}>
                  </div>
                  <div className={styles.smallRecipeDescriptionText}>
                    {shorter(this.props.recipe.description, 70)}
                    <ul className={styles.ingredientsList}>
                      {this.props.recipe.ingredients.slice(0, 5).map((ingredient) =>{
                            const foundIngredient = this.props.ingredientList.find((ingredientInList)=>ingredientInList.id === ingredient.id);
                            return <li key={foundIngredient.id}>{foundIngredient.name}</li>;
                          }
                      )}
                      {this.props.recipe.ingredients.length > 5 && <li>...</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
    );
  }
}

export default RecipeSmallCard;
