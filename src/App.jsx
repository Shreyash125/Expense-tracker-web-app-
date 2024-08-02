import React, { useState } from "react";
import styled from "styled-components";
import SideMenuComponent from "./components/SideMenuComponent"; // Adjust the path if needed
import HomeComponent from "./components/HomeComponent"; // Adjust the path if needed
import PieChartComponent from "./components/PieChartComponent"; // Adjust the path if needed
import ReportsComponent from "./components/ReportsComponent"; // Adjust the path if needed

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr; /* Sidebar width and content area */
  grid-template-rows: auto 1fr; /* Content area */
  height: 100vh;
  width: 100vw;
`;

const MainContent = styled.div`
  grid-column: 2 / 3; /* Main content occupies the second column */
  grid-row: 2 / 3; /* Main content occupies the second row */
  padding: 20px;
  overflow-y: auto;
`;

const App = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [transactions, setTransactions] = useState([]);
  
  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  const addTransaction = (payload) => {
    setTransactions([...transactions, payload]);
  };

  return (
    <Container>
      <SideMenuComponent selectedTab={selectedTab} changeTab={changeTab} />
      <MainContent>
        {selectedTab === "home" && <HomeComponent transactions={transactions} addTransaction={addTransaction} />}
        {selectedTab === "categories" && <PieChartComponent transactions={transactions} />}
        {selectedTab === "reports" && <ReportsComponent transactions={transactions} />}
      </MainContent>
    </Container>
  );
};

export default App;
