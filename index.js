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

// ************************************** //

// action type references

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// 1st reducer function
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? Object.assign({}, todo, { completed: !todo.complete }) : todo
      );
    default:
      return state;
  }
};

// 2nd reducer function
const goals = (state = [], action) => {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
};

// root reducer
const app = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
};

// ********************************** //

const store = createStore(app);

const unsubscribe = store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Learn Redux',
    completed: false,
  },
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Learn pure functions',
    completed: true,
  },
});

store.dispatch({
  type: TOGGLE_TODO,
  id: 0,
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    goal: 'Work till morning',
  },
});

store.dispatch({
  type: REMOVE_TODO,
  id: 1,
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    goal: 'NO Procrastination',
  },
});

store.dispatch({
  type: REMOVE_GOAL,
  id: 1,
});
