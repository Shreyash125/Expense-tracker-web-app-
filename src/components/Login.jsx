import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaLock, FaUser } from "react-icons/fa"; // Icons for user and lock

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e5e7eb; /* Light grey background */
  background-image: url('finance-bg.jpg'); /* Finance-themed background image */
  background-size: cover;
`;

const Form = styled.form`
  display: grid;
  align-self: center;
  max-width: 350px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9); /* White background with slight transparency */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #1e3a8a; /* Dark blue for title */
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 10px;
  color: #1e3a8a; /* Icon color matching the title */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2563eb; /* Blue button */
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8; /* Darker blue on hover */
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const SignUpAnchor = styled.a`
  color: #2563eb;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      onLogin(username);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Title>Finance Management Login</Title>
        <FormGroup>
          <Icon><FaUser /></Icon>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Icon><FaLock /></Icon>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Login</Button>
        <SignUpLink>
          Don't have an account? <SignUpAnchor href="#" onClick={navigateToSignUp}>Sign Up</SignUpAnchor>
        </SignUpLink>
      </Form>
    </Container>
  );
};

export default Login;
