// components/PieChartComponent.jsx
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

const Container = styled.div`
  width: 350px;
  max-width: 400px; 
  height: 450px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  border-radius: 8px; 
  background-color: #fff; 
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
        backgroundColor: ['#FF0000', '#008000'], 
        borderColor: ['#FF6384', '#36A2EB'], 
        borderWidth: 1, 
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
