// src/App.jsx
import  { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SideMenuComponent from "./components/SideMenuComponent";
import HomeComponent from "./components/HomeComponent";
import PieChartComponent from "./components/PieChartComponent";
import ReportsComponent from "./components/ReportsComponent";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr; /* Sidebar width and content area */
  grid-template-rows: auto 1fr; /* Content area */
  height: 100vh;
  width: 100vw;
;`

const MainContent = styled.div`
  grid-column: 2 / 3; /* Main content occupies the second column */
  grid-row: 2 / 3; /* Main content occupies the second row */
  padding: 20px;
  overflow-y: auto;
  transition: opacity 0.5s ease-in-out; /* Smooth transition */
;`

const App = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [transactions, setTransactions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const storedUser = JSON.parse(localStorage.getItem(currentUser));
      if (storedUser && storedUser.transactions) {
        setTransactions(storedUser.transactions);
      }
    }
  }, [isAuthenticated, currentUser]);

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  const addTransaction = (payload) => {
    const updatedTransactions = [...transactions, payload];
    setTransactions(updatedTransactions);
    localStorage.setItem(currentUser, JSON.stringify({ ...JSON.parse(localStorage.getItem(currentUser)), transactions: updatedTransactions }));
  };

  const handleDeleteTransaction = (transactionId) => {
    const updatedTransactions = transactions.filter((txn) => txn.id !== transactionId);
    setTransactions(updatedTransactions);
    localStorage.setItem(currentUser, JSON.stringify({ ...JSON.parse(localStorage.getItem(currentUser)), transactions: updatedTransactions }));
  };

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={isAuthenticated ? (
          <Container>
            <SideMenuComponent selectedTab={selectedTab} changeTab={changeTab} />
            <TransitionGroup>
              <CSSTransition key={selectedTab} timeout={500} classNames="fade">
                <MainContent>
                  {selectedTab === "home" && <HomeComponent transactions={transactions} addTransaction={addTransaction} />}
                  {selectedTab === "Charts" && <PieChartComponent transactions={transactions} />}
                  {selectedTab === "reports" && (
                    <ReportsComponent 
                      transactions={transactions} 
                      onDelete={handleDeleteTransaction} 
                    />
                  )}
                </MainContent>
              </CSSTransition>
            </TransitionGroup>
          </Container>
        ) : (
          <Navigate to="/login" />
        )} />
      </Routes>
    </Router>
  );
};

export default App;
