// components/PieChartComponent.jsx
import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Styled container for the pie chart
const Container = styled.div`
  width: 350px;
  max-width: 400px; /* Maximum width for larger screens */
  height: 450px; /* Allow height to adjust based on width */
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  border-radius: 8px; /* Rounded corners for the container */
  background-color: #fff; /* White background for the container */
`;

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartComponent = ({ transactions }) => {
  const expenseData = transactions
    .filter(txn => txn.type === 'EXPENSE')
    .reduce((acc, txn) => acc + txn.amount, 0);

  const incomeData = transactions
    .filter(txn => txn.type === 'INCOME')
    .reduce((acc, txn) => acc + txn.amount, 0);

  const data = {
    labels: ['Expenses', 'Income'],
    datasets: [
      {
        label: 'Transactions',
        data: [expenseData, incomeData],
        backgroundColor: ['#FF0000', '#008000'], // Red for Expenses, Green for Income
        borderColor: ['#FF6384', '#36A2EB'], // Optional: Border colors
        borderWidth: 1, // Optional: Border width
      },
    ],
  };

  return (
    <Container>
      <h2>Financial Overview</h2>
      <Pie data={data} />
    </Container>
  );
};

export default PieChartComponent;
