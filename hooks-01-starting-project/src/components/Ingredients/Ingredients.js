import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {

  // Create a state variable for storing the list of ingredients
  const [ingredientsState, setIngredientsState] = useState([]);

  // Fetch the list of ingredients from the backend after the rest of the Ingredients front-end component renders.
  // Only fetch the ingredients list from the backend for first time that the component renders.
    // Don't need to re-fetch the data unless the page changes,
    // in which case the component will be rendered for the first time.
  // We don't want to update the list of ingredients React state outside of a React hook (in the render function),
    // otherwise we'll get an infinite loop of fetches. 
    // This would be caused by the component rendering, doing the fetch and updating the state, 
    // which would cause the component to re-render due to a state change, which would then
    // do another fetch and update the state again, and so on - would repeat infinitely.
  // useEffect - do a side effect; in this case, do a network request that could take a while to resolve.
  // useEffect hook gets run after the render function.
  // useEffect with an empty dependency array - this means that useEffect will only get run once (after the initial render).
    // Providing no dependency array argument would mean that useEffect would be run after every render - we don't want this.
  // Why the useEffect dependency array should be empty (and not include `ingredientsState`): 
    // We don't need to fetch the list of ingredients if the ingredients list React state changes. 
    // We already update the ingredients list React state when we add an ingredient to the list. 
    // We already have the rest of the ingredients list locally, so we don't need to fetch it each time 
    // whenever we add a new ingredient to the list.
  useEffect(() => {
    // Fetch the list of ingredients
      // Use a GET request to ingredients.json to get the list of ingredients stored on the backend
      fetch("https://academind-react-ingredie-2ed3a-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json")
      .then(response => response.json())
      .then((ingredients) => {
        // This is an object not an array - need to change to be an array with the right format
        const ingredientsArray = [];

        for (const ingredientId in ingredients) {
          ingredientsArray.push({
            id: ingredientId,
            amount: ingredients[ingredientId].amount,
            title: ingredients[ingredientId].title,
          });
        }

        // Set the ingredients list in the local React state to match whatever ingredients we have stored in the backend
        setIngredientsState(ingredientsArray);
      });
  }, []);

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
