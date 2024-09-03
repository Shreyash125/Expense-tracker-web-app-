import React, { useState, useEffect } from "react";
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
  grid-template-columns: 90px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100vw;
`;

const MainContent = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  padding: 20px;
  overflow-y: auto;
  transition: opacity 0.5s ease-in-out;
`;

const App = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [transactions, setTransactions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (storedUser && storedUser.transactions) {
        setTransactions(storedUser.transactions);
      }
    }
  }, []);

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  const addTransaction = async (payload) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const newTransaction = await response.json();
      setTransactions([...transactions, newTransaction]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedTransactions = transactions.filter(txn => txn._id !== transactionId);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify({ username, transactions }));
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
