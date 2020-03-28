// Reducer function.
const todos = (state = [], action) => {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo]);
  }

  return state;
};

const createStore = reducer => {
  /*  The store have four parts
   *  1. state
   *  2. function to get the state
   *  3. function ~ listen to changes on the state
   *  4. function ~ Update the state
   */

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const dispatch = action => {
    /*
     * call todos
     * loop over listeners and invoke them
     */
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

const store = createStore();

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  },
});
