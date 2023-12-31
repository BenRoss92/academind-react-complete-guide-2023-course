import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  const [titleState, setTitleState] = useState('');
  const [amountState, setAmountState] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.addIngredient({title: titleState, amount: amountState});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            {/* Comments below only apply if you absolutely need to manage multiple states together inside of an object (not recommended and what we were doing in earlier commits), rather than managing states separately (what we're now doing in current and later commits): */}
                {/* Any time you want to change the state, you need to update any properties/fields/keys within a state object (`inputState` object in our example).
                This is because when the old state gets overwritten by the new state, no old state is remembered. 
                So if you update one field (e.g. `title`) but not any others (e.g. `amount`), only the specified field will have a value. 
                The previous values for any other fields will be lost. */}
                {/* When trying to reference a value for updating the state (with `setState`): Accessing the current input state using `amountState` inside of `setState` isn't guaranteed to give you the latest value/state. 
                Sometimes React defers committing the latest state changes if a page has a lot going on at once. 
                To ensure you always get the latest state, you can pass a function as an argument to the setState function. 
                In this function argument, React will give us the most up-do-date input state, even if it hasn't been committed to React's render cycle. 
                This function will always use the value that we are setting ourselves in our 'updater function', regardless of whether React has committed the state change or not. 
                i.e. Instead of doing: `onChange{e => setInputState(amount: inputState.amount)}` 
                you can instead do: `onChange={e => setInputState((prevInputState) => ({amount: prevInputState.amount}))}` */}
                {/* An error is displayed in the browser console, caused by us trying to reuse the same React event object (`e`) that React gives us (is a synthetic React-DOM event that has different behaviour from a real DOM event). 
                We can end up referencing old/stale events due to the way that React processes events. 
                This problem occurs due to using a closure function defined as an argument of `inputState`. 
                The event value (`e`) gets locked into this closure function, 
                so when this function is re-run on subsequent times, it will use the old event object value.
                To solve this problem, we can create a new variable that this closure function references, to ensure that the newest event object is always used,
                instead of an old event object. 
                */}
            <input type="text" id="title" value={titleState} onChange={e => setTitleState(e.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amountState} onChange={e => setAmountState(e.target.value)} />
          </div>
          <div className="ingredient-form__actions">
            {/* The `type="submit"` attribute in <button/> causes the `onSubmit` <form> attribute to be called */}
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
