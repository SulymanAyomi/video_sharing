import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

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

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get(`videos/${type}` + tags);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
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
