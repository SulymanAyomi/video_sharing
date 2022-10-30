import { Link } from "react-router-dom";
import styled from "styled-components";

const No = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text};
`;
const H1 = styled.h1`
  font-size: 20px;
  margin: 15px 0;
`;
export default function NotFound() {
  return (
    <No>
      <H1>Oops! You seem to be lost.</H1>
      <p style={{margin: "15px 0"}}>Here are some helpful links:</p>
      <Link to="/">Home</Link>
    </No>
  );
}
