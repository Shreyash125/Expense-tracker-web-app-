import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px; /* Maintains the original width */
  padding: 15px; /* Reduced padding for a more compact look */
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0); /* Light gradient background */
  border: 1px solid #e6e8e9; /* Subtle border for separation */
  border-radius: 8px; /* Rounded corners for a modern touch */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  margin: 10px 0 10px 10px; /* Margin adjusted to keep the component close to the sidebar */
  position: absolute; /* Use absolute positioning */
  left: 100px; /* Adjust to move the report closer to the sidebar */
`;

const Title = styled.h2`
  color: #1e3a8a; /* Dark blue for a professional look */
  margin-bottom: 15px; /* Reduced margin for a tighter look */
  background: linear-gradient(90deg, #1e3a8a, #3b5998); /* Gradient background for the title */
  -webkit-background-clip: text; /* Text gradient effect */
  -webkit-text-fill-color: transparent; /* Hide the text fill color */
  margin: 0; /* Remove default margin */
`;

const Balance = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #4caf50; /* Green color for balance */
  margin-bottom: 15px; /* Space below the balance */
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TransactionItem = styled.div`
  border: 1px solid #e6e8e9;
  padding: 8px; /* Reduced padding for a more compact item */
  border-radius: 4px;
  font-size: 14px;
  background: linear-gradient(135deg, #ffffff, #f0f0f0); /* Light gradient background for items */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f; /* Red background */
  color: white;
  border: none;
  padding: 4px 8px; /* Adjusted padding for a more compact button */
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px; /* Smaller font size for the button */

  &:hover {
    background-color: #e03e3e; /* Darker red on hover */
  }
`;

const ReportsComponent = ({ transactions, onDelete }) => {
  const balance = transactions.reduce((acc, txn) => txn.type === 'INCOME' ? acc + txn.amount : acc - txn.amount, 0);

  return (
    <Container>
      <Title>Transaction Reports</Title>
      <Balance>Balance: ₹{balance}</Balance>
      <TransactionList>
        {transactions.map(txn => (
          <TransactionItem key={txn.id}>
            <div>
              <div>Description: {txn.desc}</div>
              <div>Amount: Rs{txn.amount}</div>
              <div>Type: {txn.type}</div>
              <div>Date:{txn.date}</div>
            </div>
            <DeleteButton onClick={() => onDelete(txn.id)}>Delete</DeleteButton>
          </TransactionItem>
        ))}
      </TransactionList>
    </Container>
  );
};

export default ReportsComponent;
