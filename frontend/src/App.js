import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import NotFound from "./components/Notfound";
import Search from "./pages/Search";
import { createBrowserHistory } from "history";

const Container = styled.div``;
const Footer = styled.footer`
  font-size: 12px;
  text-align: center;
  font-weight: bold;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 10px 0px;

  @media (max-width: 768px) {
    font-size: 8px;
  }
`;
const Ayomi = styled.a`
  color: #c1a82e;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 19px;
  padding-left: ${({ sideNav }) => (sideNav ? "210px" : "20px")};
  height: 100%;
  min-height: calc(100vh - 56px);
  @media (max-width: 768px) {
    padding-left: 70px !important;
    padding: 14px 5px;
    height: 100%;
    min-height: calc(100vh - 34px);
  }
`;

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { sideNav } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme} sideNav={sideNav}>
      <BrowserRouter basename="/ourtube">
        <Container>
          <Menu
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            sideNav={sideNav}
          />
          <Main>
            <Navbar />
            <Wrapper
              theme={sideNav}
              style={{ paddingLeft: sideNav ? "210px" : "110px" }}
            >
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="tags" element={<Home type="tags" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Wrapper>
          </Main>
          <Footer>
            &COPY; Copyright 2022{" "}
            <Ayomi href="https://sulymanayomi.github.io/Ayomi/">
              Sulyman Ayomi
            </Ayomi>
          </Footer>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
