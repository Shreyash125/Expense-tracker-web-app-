import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TransactionItem = styled.div`
  border: 1px solid #e6e8e9;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  background: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f; /* Red background */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #e03e3e; /* Darker red on hover */
  }
`;

const ReportsComponent = ({ transactions, onDelete }) => {
  return (
    <Container>
      <h2>Transaction Reports</h2>
      <TransactionList>
        {transactions.map(txn => (
          <TransactionItem key={txn.id}>
            <div>
              <div>Description: {txn.desc}</div>
              <div>Amount: ${txn.amount}</div>
              <div>Type: {txn.type}</div>
            </div>
            <DeleteButton onClick={() => onDelete(txn.id)}>Delete</DeleteButton>
          </TransactionItem>
        ))}
      </TransactionList>
    </Container>
  );
};

export default ReportsComponent;
