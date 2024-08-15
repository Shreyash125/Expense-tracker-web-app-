// components/LogoutButton.jsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase'; // Ensure correct path
import styled from 'styled-components';
import { FaSignOutAlt } from 'react-icons/fa';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 10px;
  background-color: #d9534f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #c9302c;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      window.location.href = '/login'; // Redirect to login page after logout
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <StyledButton onClick={handleLogout}>
      <FaSignOutAlt style={{ marginRight: '8px' }} />
      Logout
    </StyledButton>
  );
};

export default LogoutButton;
