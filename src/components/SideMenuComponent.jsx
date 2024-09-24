import React from "react";
import styled, { css } from "styled-components";
import LogoutButton from "./LogoutButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 90px;
  padding-top: 20px;
  background-color: ${props => props.theme.sidebarBackground || '#f4f4f4'};
  box-shadow: 0 3px 6px 0 #555;
  grid-row: 1 / 3;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MenuImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
`;

const MenuContainer = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px 16px;
  margin: 8px 0;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${(props) =>
    props.isSelected
      ? css`
          opacity: 1;
          transform: scale(1.1);
        `
      : css`
          opacity: 0.5;
        `}
`;

const SideMenuComponent = ({ selectedTab, changeTab }) => {
  const handleMenuClick = (activeMenu) => {
    changeTab(activeMenu);
  };

  return (
    <Container>
      <MenuContainer
        isSelected={selectedTab === "home"}
        onClick={() => handleMenuClick("home")}
      >
        <MenuImage src="/images/wallet.png" alt="Home" />
      </MenuContainer>
      <MenuContainer
        isSelected={selectedTab === "Charts"}
        onClick={() => handleMenuClick("Charts")}
      >
        <MenuImage src="/images/pie-chart.png" alt="Charts" />
      </MenuContainer>
      <MenuContainer
        isSelected={selectedTab === "reports"}
        onClick={() => handleMenuClick("reports")}
      >
        <MenuImage src="/images/tag.png" alt="Reports" />
      </MenuContainer>
      <LogoutButton />
    </Container>
  );
};

export default SideMenuComponent;
