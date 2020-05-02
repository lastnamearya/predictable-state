// Reducer function.
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo]);
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id);
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.id ? Object.assign({}, todo, { completed: !todo.complete }) : todo
      );
    default:
      return state;
  }
};

const createStore = (reducer) => {
  /*  The store have four parts
   *  1. state
   *  2. function to get the state
   *  3. function ~ listen to changes on the state
   *  4. function ~ Update the state
   */

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    /*
     * call todos
     * loop over listeners and invoke them
     */
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

// ********************************** //

const store = createStore(todos);

const unsubscribe = store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    completed: false,
  },
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Learn pure functions',
    completed: true,
  },
});

store.dispatch({
  type: 'REMOVE_TODO',
  id: 1,
});

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0,
});
