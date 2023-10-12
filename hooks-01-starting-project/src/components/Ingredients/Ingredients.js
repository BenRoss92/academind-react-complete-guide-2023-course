import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {

  // Create a state variable for storing the list of ingredients
  const [ingredientsState, setIngredientsState] = useState([]);

  // Create a function for updating the list of ingredients that you can then pass to the form
  function addIngredient(ingredient) {
    // Add the new ingredient to the backend (Firebase NoSQL Realtime Database)
    fetch("https://academind-react-ingredie-2ed3a-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ingredient)
    })
    // Wait for that request to resolve
    // Parse the request body as JSON
    .then(response => response.json())
    .then((json) => {
      // Update the local ingredients list React state with the new ingredient
      // Pass in an updater function as an argument to setState to calculate the next state based on the previous state
      setIngredientsState(prevIngredients => {
        return [...prevIngredients, {id: json.name, ...ingredient}]
      });
    });
  }

  function removeIngredientHandler(ingredientId) {
    setIngredientsState(prevIngredients => {
      return prevIngredients.filter(ingredient => ingredient.id !== ingredientId);
    });
  }

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient}/>

      <section>
        <Search />
        <IngredientList ingredients={ingredientsState} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
