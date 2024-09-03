import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width:400px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  margin-bottom: 10px;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 12px;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const HomeComponent = ({ transactions, addTransaction }) => {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('INCOME');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/transactions',
        { desc, amount, type, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addTransaction(response.data);
      setDesc('');
      setAmount('');
      setType('INCOME');
      setDate('');
      navigate("/"); // Redirect to the home page or desired route
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Add a New Transaction</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="INCOME"
              checked={type === 'INCOME'}
              onChange={() => setType('INCOME')}
            />
            Income
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="EXPENSE"
              checked={type === 'EXPENSE'}
              onChange={() => setType('EXPENSE')}
            />
            Expense
          </label>
        </div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Button type="submit">Add Transaction</Button>
      </Form>
    </Container>
  );
};

export default HomeComponent;
