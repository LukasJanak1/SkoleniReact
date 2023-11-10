import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Routes from "./routes/Routes";

const State = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
};
function App() {

  const [ingredientListCall, setIngredientListCall] = useState({
    state: State.PENDING,
  });
  const [recipeCall, setRecipeCall] = useState({
    state: State.PENDING,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeCall({state: State.ERROR, error: responseJson});
      } else {
        setRecipeCall({state: State.SUCCESS, data: responseJson});
      }
    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/ingredient/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setIngredientListCall({state: State.ERROR, error: responseJson});
      } else {
        setIngredientListCall({state: State.SUCCESS, data: responseJson});
      }
    });
  }, []);
  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar fixed="top" expand={"sm"}  style={{backgroundColor: "purple"}}>
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            <h1>Kuchařka</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
          <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
          <h1>Kuchařka</h1>
          </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link>
                <button className="btn btn-primary" type="button" onClick={() => navigate(Routes.RECIPE_LIST)}>Recepty</button>
              </Nav.Link>
              <Nav.Link>
                <button className="btn btn-primary" type="button" onClick={() => navigate(Routes.INGREDIENT_LIST)}>Ingredience</button>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
      </div>
  );
}

export default App;
