import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the app context
const initialState = {
  theme: 'light',
  notifications: [],
  user: null,
  settings: {},
};

// Action types
const ActionTypes = {
  SET_THEME: 'SET_THEME',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_USER: 'SET_USER',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    case ActionTypes.ADD_NOTIFICATION:
      return { ...state, notifications: [...state.notifications, action.payload] };
    case ActionTypes.REMOVE_NOTIFICATION:
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.UPDATE_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch, ActionTypes }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 