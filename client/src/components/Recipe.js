import React from "react";
import Card from "react-bootstrap/Card";
import Icon from '@mdi/react';
import { mdiBook } from '@mdi/js';

function Recipe(props){
    return (
        <Card className="card">
            <Card.Body > 
                <div>
                    <h2><Icon path={mdiBook} size={1} color="black" / > {props.recipe.name}</h2>
                </div>
                <div>
                    <img src={props.recipe.imgUri} alt="RecipeImage"></img>
                </div>
                <div>
                    <p>
                       <Card.Text>{props.recipe.description}</Card.Text>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
}
export default Recipe;