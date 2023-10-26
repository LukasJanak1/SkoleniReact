import React, {useState, useMemo} from "react";
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";

import {mdiTable, mdiViewGridOutline, mdiMagnify} from "@mdi/js";

const ViewState = {
  bigGrid: 'bigGrid',
  smallGrid: 'smallGrid',
  table: 'table',
};

function RecipeList(props) {
  const [viewType, setViewType] = useState(ViewState.bigGrid);
  const [searchBy, setSearchBy] = useState("");

  const filteredRecipeList = useMemo(() => {
    return props.recipeList.filter((item) => {
      return (
          item.name
              .toLocaleLowerCase()
              .includes(searchBy.toLocaleLowerCase()) ||
          item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [props.recipeList, searchBy]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchFieldDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  function switchView(viewType) {
    switch (viewType) {
      case ViewState.bigGrid:
        return <RecipeGridList recipeList={filteredRecipeList}/>;
      case ViewState.smallGrid:
        return <RecipeGridList recipeList={filteredRecipeList}/>;
      case ViewState.table:
        return <RecipeTableList recipeList={filteredRecipeList}/>;
      default:
        return <RecipeGridList recipeList={filteredRecipeList}/>;
    }
  }

  function chooseIcon(viewType) {
    switch (viewType) {
      case ViewState.bigGrid:
        return mdiViewGridOutline;
      case ViewState.smallGrid:
        return mdiViewGridOutline;
      case ViewState.table:
        return mdiTable;
      default:
        return mdiViewGridOutline;
    }
  }

  function switchViewType(viewType) {
    switch (viewType) {
      case ViewState.bigGrid:
        return ViewState.smallGrid;
      case ViewState.smallGrid:
        return ViewState.table;
      case ViewState.table:
        return ViewState.bigGrid;
      default:
        return ViewState.bigGrid;
    }
  }

  function chooseText(viewType) {
    switch (viewType) {
      case ViewState.bigGrid:
        return "Velké dlaždice";
      case ViewState.smallGrid:
        return "Malé dlaždice";
      case ViewState.table:
        return "Tabulka";
      default:
        return mdiViewGridOutline;
    }
  }

  return (
      <div>
        <Navbar>
          <div className="container-fluid">
            <Navbar.Brand>Seznam receptů</Navbar.Brand>
            <div>
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                    id={"searchInput"}
                    style={{maxWidth: "150px"}}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchFieldDelete}
                />
                <Button
                    style={{marginRight: "8px"}}
                    variant="outline-success"
                    type="submit"
                >
                  <Icon size={1} path={mdiMagnify}/>
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() =>
                        setViewType((currentState) => {
                          return switchViewType(currentState);
                        })
                    }
                >
                  <Icon size={1} path={chooseIcon(viewType)}/>{" "}
                  {chooseText(viewType)}
                </Button>
              </Form>
            </div>
          </div>
        </Navbar>
        <div>
          {switchView(viewType)}
        </div>
      </div>
  );
}

export default RecipeList;