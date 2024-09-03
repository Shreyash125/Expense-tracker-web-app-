import React, { useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e5e7eb;
  background-image: url('finance-bg.jpg'); /* Adjust the path as needed */
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
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #1e3a8a;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0f2b5e;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const LoginAnchor = styled.a`
  color: #1e3a8a;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/Signup', {
        username,
        email,
        password,
      });

      console.log('Sign-up successful');
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      console.error('Sign-up error:', errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <Title>Create Your Financial Account</Title>
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
        <FormGroup>
          <Icon><FaLock /></Icon>
          <Input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Sign Up</Button>
        <LoginLink>
          Already have an account? <LoginAnchor href="/login">Log In</LoginAnchor>
        </LoginLink>
      </Form>
    </Container>
  );
};

export default SignUp;
