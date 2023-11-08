import RecipeList from "./../components/RecipeList";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";

const State = {
    SUCCESS: 'success',
    ERROR: 'error',
    PENDING: 'pending',
};

function Cookbook() {
  const [recipeListCall, setRecipeListCall] = useState({
    state: State.PENDING,
  });
  const [ingredientListCall, setIngredientListCall] = useState({
    state: State.PENDING,
  });

  useEffect(() => {
    fetch(`http://localhost:8000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeListCall({state: State.ERROR, error: responseJson});
      } else {
        setRecipeListCall({state: State.SUCCESS, data: responseJson});
      }
    }).catch((exception) =>
        setIngredientListCall({state: State.ERROR, error: exception})
    );
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/ingredient/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setIngredientListCall({state: State.ERROR, error: responseJson});
      } else {
        setIngredientListCall({state: State.SUCCESS, data: responseJson});
      }
    }).catch((exception) =>
        setIngredientListCall({state: State.ERROR, error: exception})
    );
  }, []);

  function getChild() {
    if (recipeListCall.state === State.SUCCESS && ingredientListCall.state === State.SUCCESS) {
      return (
          <div className="container">
            <RecipeList recipeList={recipeListCall.data} ingredientList = {ingredientListCall.data}/>
          </div>
      );
    } else if (recipeListCall.state === State.ERROR || ingredientListCall.state === State.ERROR) {
      return (
          <div className="alert alert-danger" role="alert">
            <p>
              Nepodařilo se načíst recepty nebo ingredience.
              <br/>
              {JSON.stringify(recipeListCall.error + " " + ingredientListCall.error, null, 2)}
            </p>
          </div>
      );
    } else {
      return (
          <div className="vw-100  vh-100 d-flex  justify-content-center  align-items-center">
            <Icon size={2} path={mdiLoading} spin={true}/>
          </div>
      );
    }
  }

  return (
      <div className="RecipeList">
        {getChild()}
      </div>
  );
}

export default Cookbook;