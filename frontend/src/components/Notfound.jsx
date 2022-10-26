import { Link } from "react-router-dom";
import styled from "styled-components";

const No = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text};
`;
export default function NotFound() {
  return (
    <No>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
    </No>
  );
}
