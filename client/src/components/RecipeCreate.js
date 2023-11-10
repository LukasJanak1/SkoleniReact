import {Modal, Form, Row, Col, Button, Image} from "react-bootstrap";
import React, {useState} from "react";
import Icon from "@mdi/react";
import {mdiDelete,mdiLoading} from "@mdi/js";


function RecipeCreateModal({ingredientList, show, setAddRecipeShow, onComplete}) {
  const CallState = {
    INACTIVE: 'inactive', PENDING: 'pending', SUCCESS: 'success', ERROR: 'error',
  };
  const data = {
    name: "", description: "", imgUri: "", ingredients: []
  }
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(data);
  const [addRecipeCall, setAddRecipeCall] = useState({
    state: CallState.INACTIVE
  });
  const close = () => {
    setAddRecipeShow(false);
    setValidated(false);
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


  const setIngredientsField = (ingredientId) => {
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
        foundIngredient.amount = parseFloat(amount);
      }
      return newData;
    });
  };


  const submit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData,
    };
    /*if (!form.checkValidity()) {
      setValidated(true);
      return;
    }*/

    setAddRecipeCall({state: CallState.PENDING});
    const res = await fetch(`http://localhost:8000/recipe/create`, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.status >= 400) {
      setAddRecipeCall({state: CallState.ERROR, error: data});
    } else {
      setAddRecipeCall({state: CallState.SUCCESS, data});

      if (typeof onComplete === 'function') {
        onComplete(data);
      }

      close();
    }
  };

  return (<>
    <Modal className={"modal-lg"} show={show} onHide={close}>
      <Form noValidate  onSubmit={(e) => submit(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Vytvořit nový recept</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Název</Form.Label>
            <Form.Control
                required
                maxLength={30}
                type="text"
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Název receptu může mít maximálně 30 znaků!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Popis</Form.Label>
            <Form.Control
                required
                maxLength={1000}
                type="text"
                value={formData.description}
                onChange={(e) => setField("description", e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Popis může mít maximálně 1000 znaků!
            </Form.Control.Feedback>
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
              <option value="" disabled>Vyberte ingredienci k přidání</option>
              {ingredientList.map((ingredient) => <option value={ingredient.id}>{ingredient.name}</option>)}
            </Form.Select>
            <Form.Label>Ingredience</Form.Label>
          {formData?.ingredients && formData.ingredients.map((ingredient) => <Row>
            <Form.Label
                className={"col-lg-3 col-form-label fw-bold"}>{ingredientList.find((savedIngredient) => savedIngredient.id === ingredient.id).name}</Form.Label>
            <Form.Group className="mb-3 col-lg-4">
              <Row>
                <Form.Label className={"col-form-label col-lg-6"}>Množství</Form.Label>
                <div className="col-lg-6">
                  <Form.Control
                      type="number"
                      value={formData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id).amount}
                      placeholder={0}
                      onChange={(e) => setIngredientAmount(ingredient, e.target.value)}
                      min={1}
                      max={100}
                      
                  />
                  <Form.Control.Feedback type="invalid">
                    Zadejte množství v rozsahu 1 - 1000
                  </Form.Control.Feedback>
                </div>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4 ">
              <Row>
                <Form.Label className={"col-form-label col-lg-5"}>Jednotky</Form.Label>
                <div className={"col-lg-7"}>
                  <Form.Select
                      type="text"
                      value={formData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id).unit}
                      onChange={(e) => setIngredientUnit(ingredient, e.target.value)}
                      
                  >
                    <option value="ks">ks</option>
                    <option value="kg">kg</option>
                  </Form.Select>
                </div>
              </Row>
            </Form.Group>

            <Button className={"col-lg-1"} variant="secondary"
                    onClick={() => removeIngredient(ingredient)}>
              <Icon size={1} style={{verticalAlign: "top"}} path={mdiDelete}/>
            </Button>

            </Row>)}

          </Form.Group>
        </Modal.Body>

        
        <Modal.Footer>
        <div className="d-flex flex-row justify-content-between align-items-center w-100">
            <div>
              {addRecipeCall.state === CallState.ERROR &&
                  <div className="text-danger">Error: {addRecipeCall.error.errorMessage}</div>}
            </div>
            <div className="d-flex flex-row gap-2">
              <Button variant="secondary" onClick={close}>
                Zavřít
              </Button>
              <Button variant="primary" type="submit" disabled={addRecipeCall.state === CallState.PENDING}>
                {addRecipeCall.state === CallState.PENDING ? (
                    <Icon size={0.8} path={mdiLoading} spin={true}/>) : ("Vytvořit")}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  </>)
}

export default RecipeCreateModal;