import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TransactionItem = styled.div`
  border: 1px solid #e6e8e9;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  background: #f9f9f9;
`;

const TransactionsComponent = ({ transactions }) => {
  return (
    <Container>
      {transactions.map(txn => (
        <TransactionItem key={txn.id}>
          <div>Description: {txn.desc}</div>
          <div>Amount: ${txn.amount}</div>
          <div>Type: {txn.type}</div>
        </TransactionItem>
      ))}
    </Container>
  );
};

export default TransactionsComponent;
