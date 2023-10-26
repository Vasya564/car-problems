import { createContext, useReducer } from 'react';

// Create the context
export const AppContext = createContext();

// Define the initial state and reducer function
const initialState = {
  make: '',
  model: '',
  year: '',
  category: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_MAKE':
      return { ...state, make: action.payload };
    case 'UPDATE_MODEL':
      return { ...state, model: action.payload };
    case 'UPDATE_YEAR':
      return { ...state, year: action.payload };
    case 'UPDATE_CATEGORY':
      return { ...state, category: action.payload};
    default:
      return state;
  }
};

// Create a provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};