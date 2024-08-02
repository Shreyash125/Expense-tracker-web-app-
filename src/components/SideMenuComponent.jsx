import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 90px;
  padding-top: 20px; /* Adjust padding as needed */
  background-color: #f4f4f4; /* Example background color */
  box-shadow: 0 3px 6px 0 #555;
  grid-row: 1 / 3; /* Sidebar spans across both rows */
`;

const MenuImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const MenuContainer = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 24px;
  margin: 8px 0;
  justify-content: center;
  cursor: pointer;
  ${(props) =>
    props.isSelected
      ? css`
          opacity: 1;
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
        isSelected={selectedTab === "categories"}
        onClick={() => handleMenuClick("categories")}
      >
        <MenuImage src="/images/pie-chart.png" alt="Categories" />
      </MenuContainer>
      <MenuContainer
        isSelected={selectedTab === "reports"}
        onClick={() => handleMenuClick("reports")}
      >
        <MenuImage src="/images/tag.png" alt="Reports" />
      </MenuContainer>
    </Container>
  );
};

export default SideMenuComponent;
