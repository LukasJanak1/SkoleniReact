import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";
import {shorter} from "../helpers/common";

class RecipeSmallCard extends React.Component {

  render() {


    return (<Card>
      <Card.Img className="card-img-top" alt={this.props.recipe.name} src={this.props.recipe.imgUri}/>

      <Card.Body >
        <Card.Title>
          <div className="row no-gutters px-3">
            <div className="col-2 p-1">
            </div>
            <div className="col-10 p-1">
              {this.props.recipe.name}
            </div>
          </div>
        </Card.Title>

        <Card.Text >
          <div className="row no-gutters px-3">
            <div className="col-2 p-1">
            </div>
            <div className="col-10 p-1">
              {shorter(this.props.recipe.description, 50)}
            </div>
          </div>
        </Card.Text>

        <ul className="list-group">
          {this.props.recipe.ingredients.slice(0, 5).map((ingredient) => {
            const foundIngredient = this.props.ingredientList.find((ingredientInList) => ingredientInList.id === ingredient.id);
            return <li className="list-group-item" key={foundIngredient.id}>{foundIngredient.name}</li>;
          })}
          {this.props.recipe.ingredients.length > 5 && <li className="list-group-item">...</li>}
        </ul>
      </Card.Body>
    </Card>);
  }
}

export default RecipeSmallCard;
