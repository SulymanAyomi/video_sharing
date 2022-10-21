import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const Text = styled.span`
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);
  return (
    <Container>
      <Avatar src={channel.img}></Avatar>
      <Details>
        <Name>
          {channel.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
