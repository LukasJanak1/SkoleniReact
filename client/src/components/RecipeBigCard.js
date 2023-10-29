import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";

class RecipeBigCard extends React.Component {
  render() {
    return (
        <div className={styles.bigRecipe}>
          <Card>
            <Card.Body className={styles.bigRecipeBody}>
              <div>
                <h2 className={styles.bigRecipeName}>
                  {this.props.recipe.name}
                </h2>
                <div className={styles.recipeDescription}>
                  <div className={styles.bigRecipeDescriptionIcon}>
                  </div>
                  <div className={styles.bigRecipeDescriptionText}>
                    {this.props.recipe.description}
                  </div>
                </div>
              </div>
              <img alt={this.props.recipe.name} src={this.props.recipe.imgUri} className={styles.bigRecipeImage}/>
            </Card.Body>
          </Card>
        </div>
    );
  }
}

export default RecipeBigCard;
