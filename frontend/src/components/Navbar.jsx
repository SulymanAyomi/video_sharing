import React, { useState } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Upload from "./Upload";
import Userbox from "./Userbox";
import Account from "./Account";
import logo from "./../logo192.png";
import MenuIcon from "@mui/icons-material/Menu";
import { openSideNav } from "../redux/userSlice";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  @media (max-width: 575.98px) {
    height: 34px;
    font-size: 8px;
  }
  color: ${({ theme }) => theme.text};
`;
const Container2 = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;
  @media (max-width: 575.98px) {
    padding: 0px 18px;
  }
  color: ${({ theme }) => theme.text};
`;
const Search = styled.div`
  width: 40%;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
  @media (max-width: 575.98px) {
    width: 50%;

    padding: 3px;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  @media (max-width: 575.98px) {
    padding: 4px 6px;
    font-size: 8px;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
  @media (max-width: 575.98px) {
    width: 22px;
    height: 22px;
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const Img = styled.img`
  height: 25px;
  @media (max-width: 575.98px) {
    height: 16px;
  }
`;
const Name = styled.div`
  word-break: break-all;
  @media (max-width: 575.98px) {
    display: none;
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [openUserbox, setOpenUserbox] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [q, setQ] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Wrapper>
          <Container2>
            <MenuIcon
              className="icsm"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(openSideNav())}
            />
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Logo>
                <Img src={logo} alt="" />
                OurTube
              </Logo>
            </Link>
          </Container2>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon
              onClick={() => navigate(`/search?q=${q}`)}
              className="icsm"
            />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                className="icsm"
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              />
              <Avatar
                className="icsm"
                src={currentUser.img}
                onClick={() => setOpenNav(!openNav)}
              />
              <Name>{currentUser.name}</Name>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon className="icsm" />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
        {openNav && (
          <Account setOpenUserbox={setOpenUserbox} setOpenNav={setOpenNav} />
        )}
      </Container>
      {open && <Upload setOpen={setOpen} />}

      {openUserbox && <Userbox setOpenUserbox={setOpenUserbox} />}
    </>
  );
}

export default Navbar;
