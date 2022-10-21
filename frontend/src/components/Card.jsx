import React, { useEffect, useState } from "react";
import logo from "./../logo192.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

const Container = styled.div`
  --width: calc(100% / 4);
  width: ${(props) => props.type !== "sm" && "calc(var(--width) - 25px)"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "15px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  @media (max-width: 575.98px) {
    --width: calc(100% / 3);
    width: ${(props) => props.type !== "sm" && "calc(var(--width) - 10px)"};
    margin-bottom: 5px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "150px")};
  background-color: #999;
  flex: 1;
  @media (max-width: 575.98px) {
    height: 100px;
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
  @media (max-width: 575.98px) {
    gap: 4px;
    margin-top: 5px;
  }
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
  @media (max-width: 575.98px) {
    width: 20px;
    height: 20px;
  }
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 13px;
  font-weight: 500;
  max-height: 42px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${({ theme }) => theme.text};
  @media (max-width: 768px) {
    font-size: 8px;
    max-height: 20px;
    line-height: 10px;
  }
`;

const ChannelName = styled.h2`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
  @media (max-width: 575.98px) {
    margin: 5px 0px;
    font-size: 8px;
  }
`;

const Info = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.textSoft};
  @media (max-width: 575.98px) {
    font-size: 6px;
  }
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Container type={type}>
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <Image src={video.imgUrl} type={type} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Link>
    </Container>
  );
};

export default Card;
