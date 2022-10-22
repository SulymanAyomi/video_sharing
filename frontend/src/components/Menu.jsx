import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.aside`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 13px;
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  @media (max-width: 575.98px) {
    font-size: 8px;
  }
`;
const Wrapper = styled.div`
  transistion: all 3s ease;
  padding: 18px 0px;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 18px;
  right: 0;
  width: 147px;
  overflow-y: scroll;

  @media (max-width: 575.98px) {
    padding: 18px 0px;
    top: 11px;
    bottom: 0;
    left: 0px;
    padding-left: 19px;
    right: 0;
    width: 105px;
    height: 100vh;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.bg};
  }
`;
const Wrapper1 = styled.div`
  transistion: all 3s ease;
  padding: 18px 0px;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 33px;
  right: 0;
  @media (max-width: 575.98px) {
    left: 27px;
    top: 27px;
  }
`;

const Scroller = styled.div``;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  text-transform: ;
  @media (max-width: 575.98px) {
    font-size: 10px;
  }
`;

const Item1 = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: column;
  margin-bottom: 37px;
  cursor: pointer;
  font-size: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
  @media (max-width: 575.98px) {
    font-size: 8px;
    padding: 0px;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 7.5px 0px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
  @media (max-width: 575.98px) {
    margin: 10px 0px;
  }
`;
const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

function Menu({ darkMode, setDarkMode, sideNav }) {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Container>
      {sideNav ? (
        <Scroller>
          <Wrapper>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Item>
                <HomeIcon className="icsm" />
                Home
              </Item>
            </Link>
            <Link
              to="/trends"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <ExploreOutlinedIcon className="icsm" />
                Explore
              </Item>
            </Link>
            <Link
              to="/subscriptions"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <SubscriptionsOutlinedIcon className="icsm" />
                Subscriptions
              </Item>
            </Link>
            <Hr></Hr>
            <Item>
              <VideoLibraryOutlinedIcon className="icsm" />
              Library
            </Item>
            <Item>
              <HistoryOutlinedIcon className="icsm" />
              History
            </Item>
            <Hr />
            {!currentUser && (
              <>
                <Login>
                  Sign in to like videos, comment, and subscribe.
                  <Link to="signin" style={{ textDecoration: "none" }}>
                    <Button>
                      <AccountCircleOutlinedIcon className="icsm" />
                      SIGN IN
                    </Button>
                  </Link>
                </Login>
                <Hr />
              </>
            )}
            <Title>Best of Messi</Title>
            <Item
              onClick={() =>
                navigate(`/tags?tags=${"music,musicvideo,hiphop"}`)
              }
            >
              <LibraryMusicOutlinedIcon className="icsm" />
              Music
            </Item>
            <Link
              to="/tags?tags=sports,football,basketball,tennis"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <SportsBasketballOutlinedIcon className="icsm" />
                Sports
              </Item>
            </Link>
            <Link
              to="/tags?tags=gaming,pes,fifa,"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <SportsEsportsOutlinedIcon className="icsm" />
                Gaming
              </Item>
            </Link>
            <Link
              to="/tags?tags=movies,trailer,hollywood,nollywood"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <MovieOutlinedIcon className="icsm" />
                Movies
              </Item>
            </Link>
            <Link
              to="/tags?tags=news"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <ArticleOutlinedIcon className="icsm" />
                News
              </Item>
            </Link>
            <Link
              to="/tags?tags=live,"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <LiveTvOutlinedIcon className="icsm" />
                Live
              </Item>
            </Link>
            <Hr />
            <Item>
              <SettingsOutlinedIcon className="icsm" />
              Settings
            </Item>
            <Item>
              <FlagOutlinedIcon className="icsm" />
              Report
            </Item>
            <Item>
              <HelpOutlineOutlinedIcon className="icsm" />
              Help
            </Item>
            <Item onClick={() => setDarkMode(!darkMode)}>
              <SettingsBrightnessOutlinedIcon className="icsm" />
              {darkMode ? "Light" : "Dark"} Mode
            </Item>
          </Wrapper>
        </Scroller>
      ) : (
        <Scroller>
          <Wrapper1>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Item1>
                <HomeIcon className="icsm" />
                Home
              </Item1>
            </Link>
            <Link
              to="/trends"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item1>
                <ExploreOutlinedIcon className="icsm" />
                Explore
              </Item1>
            </Link>
            <Link
              to="/subscriptions"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item1>
                <SubscriptionsOutlinedIcon className="icsm" />
                Subscriptions
              </Item1>
            </Link>
            <Item1>
              <VideoLibraryOutlinedIcon className="icsm" />
              Library
            </Item1>
            <Item1>
              <HistoryOutlinedIcon className="icsm" />
              History
            </Item1>
          </Wrapper1>
        </Scroller>
      )}
    </Container>
  );
}

export default Menu;
