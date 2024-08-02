import React from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

const Container = styled.div`
  width: 350px;
  height: 350px;
  
`;

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartComponent = ({ transactions }) => {
  const expenseData = transactions
    .filter(txn => txn.type === "EXPENSE")
    .reduce((acc, txn) => acc + txn.amount, 0);
  const incomeData = transactions
    .filter(txn => txn.type === "INCOME")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const data = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        label: "Transactions",
        data: [expenseData, incomeData],
        backgroundColor: ["#FF0000", "#008000"], // Red for Expenses, Blue for Income
        borderColor: ["#FF6384", "#36A2EB"], // Optional: Border colors to match background
        borderWidth: 1, // Optional: Border width
      },
    ],
  };

  return (
    <Container>
      <Pie data={data} />
    </Container>
  );
};

export default PieChartComponent;
