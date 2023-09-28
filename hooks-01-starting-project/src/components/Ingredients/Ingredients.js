import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {

  // Create a state variable for storing the list of ingredients
  const [ingredientsState, setIngredientsState] = useState([]);

  // Create a function for updating the list of ingredients that you can then pass to the form
  function addIngredient(ingredient) {
    // Pass in an updater function as an argument to setState to calculate the next state based on the previous state
    setIngredientsState(prevIngredients => {
      return [...prevIngredients, {id: Math.random().toString(), ...ingredient}]
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
