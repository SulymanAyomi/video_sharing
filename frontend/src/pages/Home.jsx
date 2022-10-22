import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import axios from "axios";
import { use, useLocation, useSearchParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  @media (max-width: 576.98px) {
    gap: 13px;
  }
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const tags = useLocation().search;
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(`videos/${type}` + tags);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type, tags]);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
