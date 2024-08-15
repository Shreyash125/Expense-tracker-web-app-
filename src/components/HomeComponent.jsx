import React, { useState } from "react";
import styled from "styled-components";
import OverViewComponent from "./OverViewComponent";
import AddTransactionView from "./AddTransactionView"; // Updated import

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
`;

const HomeComponent = ({ transactions, addTransaction }) => {
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.forEach(({ type, amount }) =>
      type === "EXPENSE" ? (exp += amount) : (inc += amount),
    );
    updateExpense(exp);
    updateIncome(inc);
  };

  React.useEffect(() => calculateBalance(), [transactions]);

  return (
    <Container>
      <OverViewComponent
        expense={expense}
        income={income}
        addTransaction={addTransaction}
      />
      {transactions.length ? (
        <AddTransactionView transactions={transactions} />
      ) : null}
    </Container>
  );
};

export default HomeComponent;
