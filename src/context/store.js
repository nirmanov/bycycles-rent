import React, { useState } from "react";
import axios from "axios";

export const StoreContext = React.createContext()
export function StoreContextProvider({ children }) {

  const userToken = localStorage.getItem('token');
  
  const caseStates = [
    { value: 'new', label: 'Новый' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'done', label: 'Завершен' }
  ]

  const bikeTypes = [
    { value: 'general', label: 'Городской' },
    { value: 'sport', label: 'Спортивный' }
  ]

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const apiDomain = 'https://sf-final-project-be.herokuapp.com/api/';
  const authUrl = axios.create({ baseURL: apiDomain, headers: { Authorization: "bearer " + userToken, }, });

  const store = {
    userToken,
    isLoggedIn,
    setIsLoggedIn,
    showAuthForm,
    setShowAuthForm,
    apiDomain,
    caseStates,
    bikeTypes,
    authUrl,
  }

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}