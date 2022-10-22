import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UploadIcon from "@mui/icons-material/Upload";
import CircularProgress from "@mui/material/CircularProgress";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  @media (max-width: 768px) {
    width: fit-content;
    height: fit-content;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
  @media (max-width: 575.98px) {
    font-size: 14px;
  }
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  @media (max-width: 578.98px) {
    font-size: 8px;
  }
`;

const ImageInput = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  display: none;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  position: relative;
`;
const Label = styled.label`
  font-size: 14px;
  @media (max-width: 575.98px) {
    font-size: 10px;
  }
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  @media (max-width: 575.98px) {
    font-size: 8px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Userbox = ({ setOpenUserbox }) => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [img, setImg] = useState(undefined);
  const [defaultImage, setDefaultImage] = useState(currentUser.img);
  const [imgPerc, setImgPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [err, setErr] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, ["img"]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    if (img) {
      setDefaultImage(URL.createObjectURL(img));
      uploadFile(img);
    }
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axiosInstance.put(`users/${currentUser._id}`, {
        ...inputs,
      });
      dispatch(loginSuccess(res.data));
      setOpenUserbox(false);
    } catch (err) {
      dispatch(loginFailure());
      setErr(err.response.data.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpenUserbox(false)}>X</Close>
        <Title>User</Title>
        <ImageWrapper>
          <Img src={defaultImage} />
          <Label htmlFor={"file"}>
            Image: <UploadIcon className="icsm" />
          </Label>

          {imgPerc > 0 ? (
            "Uploading:" + imgPerc + "%"
          ) : (
            <ImageInput
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
        </ImageWrapper>

        <Label>Name:</Label>
        <Input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <Error>{error && err}</Error>

        <Button onClick={handleUpload}>
          Update
          {loading && (
            <CircularProgress
              size={30}
              sx={{
                position: "absolute",
                top: 3,
                right: 200,
                zIndex: 1,
                color: "inherit",
              }}
            />
          )}
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Userbox;
