import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div``;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.soft};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 7px 12px;
    font-size: 8px;
  }
  &:disabled {
    cursor: default;
    background-color: transparent;
  }
`;

const Button1 = styled.button`
  background-color: transparent;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 7px 12px;
    font-size: 8px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/comments/`, {
        videoId: videoId,
        desc: newComment,
      });
      const data = res.data;
      setComments((prev) => {
        return [data, ...prev];
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    newComment ? setAllowSubmit(false) : setAllowSubmit(true);
  }, [newComment]);

  return (
    <Container>
      <CommentBox>
        {currentUser && (
          <>
            <NewComment>
              <Avatar src={currentUser.img} />
              {!showInput && (
                <Input
                  placeholder="Add a comment..."
                  onClick={() => setShowInput(true)}
                />
              )}
            </NewComment>
            {showInput && (
              <>
                <Input
                  placeholder="Commenting publicly as {currentUser.name}"
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Buttons>
                  <Button1 onClick={() => setShowInput(false)}>Cancle</Button1>{" "}
                  <Button disabled={allowSubmit} onClick={handleSubmit}>
                    Submit
                  </Button>
                </Buttons>
              </>
            )}
          </>
        )}
      </CommentBox>

      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
