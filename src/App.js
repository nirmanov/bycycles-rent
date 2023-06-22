import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { SignUp } from './components/SignUp/SignUp';
import { CaseForm } from './components/CaseForm/CaseForm';
import { Main } from './components/Main/Main';
import { OfficerDetail } from './components/OfficerDetail/OfficerDetail';
import { CaseDetail } from './components/CaseDetail/CaseDetail';
import { CaseList } from './components/CaseList/CaseList';
import { AddOfficer } from './components/AddOfficer/AddOfficer';
import { StoreContext } from './context/store';
import { OfficersList } from './components/OfficersList/OfficersList';

function App() {
  const { setIsLoggedIn, authUrl } = useContext(StoreContext);

  const checkAuthUrl = "auth";

  useEffect(() => {
    authUrl
      .get(checkAuthUrl)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        localStorage.clear();
      });
  }, [setIsLoggedIn]);

  return (
    <div className="container">
      <Header />

      <div className="wrapper">
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/caseform' element={<CaseForm />}></Route>
          <Route path='/officers/:itemId' element={<OfficerDetail />}></Route>
          <Route path='/officers' element={<OfficersList />}></Route>
          <Route path='/add-officer' element={<AddOfficer />}></Route>
          <Route path='/cases' element={<CaseList />}></Route>
          <Route path='/cases/:itemId' element={<CaseDetail />}></Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
