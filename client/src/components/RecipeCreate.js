import {Modal, Form, Row, Col, Button, Image} from "react-bootstrap";
import React, {useState} from "react";
import Icon from "@mdi/react";
import {mdiDelete} from "@mdi/js";


function RecipeCreateModal({ingredientList, show, setAddRecipeShow}) {

  const data = {
    name: "", description: "", imgUri: "", ingredients: []
  }

  const [formData, setFormData] = useState({
    name: "", description: "", imgUri: "", ingredients: []
  });


  const close = () => {
    setAddRecipeShow(false);
    setFormData(data);
  }

  function removeIngredient(ingredient) {
    return setFormData((formData) => {
      const newData = {...formData};
      const index = newData.ingredients.findIndex((savedIngredient)=>savedIngredient.id === ingredient.id);
      if (index > -1) {
        newData.ingredients.splice(index, 1);
      }
      return newData;
    });
  }


  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = JSON.parse(JSON.stringify(formData));
      newData[name] = val;
      return newData;
    });
  };


  const setIngredientsField = ( ingredientId) => {
    return setFormData((formData) => {
      const newData = JSON.parse(JSON.stringify(formData));
      const index = newData.ingredients.findIndex((savedIngredient)=>savedIngredient.id === ingredientId);
      if (index <= -1) {
        newData.ingredients.push({id:ingredientId, amount:0, unit:"ks"})
      }

      return newData;
    });
  };


  const setIngredientUnit = (ingredient, unit) => {
    return setFormData((formData) => {
      const newData = JSON.parse(JSON.stringify(formData));
      const foundIngredient = newData.ingredients.find((savedIngredient)=>savedIngredient.id === ingredient.id);
      if (foundIngredient) {
        foundIngredient.unit = unit;
      }
      return newData;
    });
  };


  const setIngredientAmount = (ingredient, amount) => {
    return setFormData((formData) => {
      const newData = {...formData};
      const foundIngredient = newData.ingredients.find((savedIngredient)=>savedIngredient.id === ingredient.id);
      if (foundIngredient) {
        foundIngredient.amount = amount;
      }
      return newData;
    });
  };


  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData,
    };

    console.log(payload);
  };

  return (<>
    <Modal show={show} onHide={close}>
      <Form onSubmit={(e) => submit(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Vytvořit nový recept</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Název</Form.Label>
            <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Popis</Form.Label>
            <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) => setField("description", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Obrázek</Form.Label>
            <Form.Control
                type="text"
                value={formData.imgUri}
                onChange={(e) => setField("imgUri", e.target.value)}
            />
            {formData.imgUri && <Image className="img-fluid rounded mx-auto d-block m-3" alt={formData.name}
                                       src={formData.imgUri}/>}
          </Form.Group>


          <Form.Group as={Col} className="mb-3">
            <Form.Label>Přidat Ingredience</Form.Label>
            <Form.Select
                value={""}
                onChange={(e) => setIngredientsField(e.target.value)}
            >
              <option value="" selected disabled>Vyber ingredienci k přidání</option>
              {ingredientList.map((ingredient) => <option value={ingredient.id}>{ingredient.name}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ingredience</Form.Label>
            {formData?.ingredients && formData.ingredients.map((ingredient) => <Row>
              <Form.Label
                  className={"col-sm-2 col-form-label"}>{ingredientList.find((savedIngredient) => savedIngredient.id === ingredient.id).name}</Form.Label>
              <Form.Label className={"col-sm-2 col-form-label"}>Množství</Form.Label>
              <div className="col-sm-2">
                <Form.Control
                    type="number"
                    value={formData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id).amount}
                    placeholder={0}
                    onChange={(e) => setIngredientAmount(ingredient, e.target.value)}
                />
              </div>
              <Form.Label className={"col-sm-2 col-form-label"}>Jednotky</Form.Label>
              <div className={"col-sm-3"}>
                <Form.Select
                    type="text"
                    value={formData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id).unit}
                    onChange={(e) => setIngredientUnit(ingredient, e.target.value)}
                >
                  <option value="ks" selected>ks</option>
                  <option value="kg" >kg</option>
                </Form.Select>
              </div>
              <Button className={"col-sm-1"} variant="secondary"
                      onClick={() => removeIngredient(ingredient)}>
                <Icon size={1} style={{verticalAlign: "top"}} path={mdiDelete}/>
              </Button>

            </Row>)}

          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-row gap-2">
            <Button variant="secondary" onClick={close}>
              Zavřít
            </Button>
            <Button variant="primary" type="submit">
              Vytvořit
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  </>)
}

export default RecipeCreateModal;