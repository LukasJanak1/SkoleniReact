import React from "react";
import Table from "react-bootstrap/Table";
import {shorter} from "../helpers/common";

function RecipeTableList(props) {
  return (
      <Table>
        <thead>
        <tr>
          <th>Název receptu</th>
          <th>Popis receptu</th>
        </tr>
        </thead>
        <tbody>
        {props.recipeList.map((recipe) => {
          return (
              <tr key={recipe.id}>
                <td>{recipe.name}</td>
                <td>{shorter(recipe.description,400)}</td>
              </tr>
          );
        })}
        </tbody>
      </Table>
  );
}

export default RecipeTableList;
