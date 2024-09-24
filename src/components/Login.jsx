import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e5e7eb;
  background-image: url('finance-bg.jpg');
  background-size: cover;
`;

const Form = styled.form`
  display: grid;
  align-self: center;
  max-width: 400px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #1e3a8a;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 10px;
  color: #1e3a8a;
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
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token
        navigate("/"); // Redirect to home page
      } else {
        alert("Login failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.error("Login error response:", error.response.data);
        alert("Login error: " + (error.response.data.message || "Unknown error"));
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Login error request:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request
        console.error("Login error setup:", error.message);
        alert("Error in login setup: " + error.message);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Title> Login to your Account</Title>
        <FormGroup>
          <Icon><FaEnvelope /></Icon>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Don't have an account? <SignUpAnchor href="/signup">Sign Up</SignUpAnchor>
        </SignUpLink>
      </Form>
    </Container>
  );
};

export default Login;
