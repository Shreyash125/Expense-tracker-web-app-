import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  width:424px;;
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const TransactionView = ({ addTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description || !date) {
      alert('Please fill all fields');
      return;
    }
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      type,
      date,
    };
    addTransaction(newTransaction);
    setAmount('');
    setDescription('');
    setType('EXPENSE');
    setDate('');
  };

  return (
    <Container>
      <h2>Add Transaction</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
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
        <Button type="submit">Add Transaction</Button>
      </Form>
    </Container>
  );
};

export default TransactionView;
