import React from "react";
import Recipe from "./Recipe";
import Card from "react-bootstrap/Card";


function RecipeGridList(props) {
    const cardStyle = {
        border: '2px solid',
        borderRadius: '10px',
        width: '10%',
        height: '30rem',
        margin: '1rem',
        textAlign: 'center',
        color: 'white'
    };
    return props.recipeList.map((recipe) => {
        <div style={{display:'flex', justifyContent: 'center'}}>
            <Card style={cardStyle}>
                 return <Recipe key={recipe.name} recipe={recipe} />;
            </Card>
        </div>
  });

  

}

export default RecipeGridList;