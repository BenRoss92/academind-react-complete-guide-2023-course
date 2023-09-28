import React from 'react';

import './IngredientList.css';

const IngredientList = props => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          // Why do we use `bind` here?
          // When a function (in this case, onRemoveItem) is used as an event handler,
          // the `this` keyword inside of that function definition is bound 
          // to the DOM element which we're placing this onClick listener onto (the `li` DOM element).
          // Also, like with regular functions, the `this` value inside of (class) methods 
          // is given its value based on how/where it was called, not on how/where it was defined.
          // When we try to use a class method as a DOM event handler, 
          // the value of `this` will by default be replaced by the DOM element of the event listener.
          // `this` inside of the method will no longer point to the (instance of the) class that it's defined in.
          // To override this behaviour and set `this` to always point to the class instead, one option is to use
          // the `bind` JavaScript method. This method creates a new function which has a `this` value that's bound
          // to whatever object is being passed in as an argument - in this case, the class' `this` value.
          // This is a limitation of JavaScript and nothing to do with React.
          // You can achieve the same thing but using an arrow function. Arrow functions don't have their own
          // `this` value. The `this` value that they use is always bound to the `this` value from the closest non-arrow
          // parent function. So it achieves the same result as using `bind`. We just happen to have chosen to use
          // `bind` here instead.
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
