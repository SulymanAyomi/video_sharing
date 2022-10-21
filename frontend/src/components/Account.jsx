import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  font-size: 13px;
  color: ${({ theme }) => theme.text};
  position: fixed;
  width: max-content;
  top: 56px;
  right: 0px;
  @media (max-width: 575.98px) {
    top: 34px;
    right: 21px;
    font-size: 8px;
  }
`;

const Title = styled.div`
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
  padding: 7.5px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  @media (max-width: 575.98px) {
    padding: 4px 10px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
  @media (max-width: 575.98px) {
    margin: 5px 0px;
  }
`;

const Account = ({ setOpenUserbox, setOpenNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setOpenUserbox(false);
    setOpenNav(false);
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Title onClick={() => setOpenUserbox(true)}>
          <AccountCircleIcon className="icsm" /> Account
        </Title>
        <Hr />
        <Title onClick={() => handleLogout()}>
          <LogoutIcon className="icsm" /> Logout
        </Title>
      </Wrapper>
    </Container>
  );
};

export default Account;
