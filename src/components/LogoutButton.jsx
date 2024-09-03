// src/components/LogoutButton.jsx
import React from "react";
import styled from "styled-components";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 10px;
  background-color: #dc2626;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #b91c1c;
  }
`;

const Icon = styled.span`
  margin-right: 5px;
`;

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <Button onClick={handleLogout}>
      <Icon><FaSignOutAlt /></Icon>
      Logout
    </Button>
  );
};

export default LogoutButton;
