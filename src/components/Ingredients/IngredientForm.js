import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  const inputState = useState({title: '', amount: ''});

  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            {/* Any time you want to change the state, you need to update any properties/fields/keys within a state object (`inputState` object in our example).
             This is because when the old state gets overwritten by the new state, no old state is remembered. 
             So if you update one field (e.g. `title`) but not any others (e.g. `amount`), only the specified field will have a value. 
             The previous values for any other fields will be lost. */}
            <input type="text" id="title" value={inputState[0].title} onChange={e => inputState[1]({title: e.target.value, amount: inputState[0].amount})} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputState[0].amount} onChange={e => inputState[1]({title: inputState[0].title, amount: e.target.value})}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
