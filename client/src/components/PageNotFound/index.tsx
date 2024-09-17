import {FC} from 'react';
import styled from 'styled-components';

const PageNotFound : FC = () => {
  return (
    <Container>
      <ErrorBox>
        <Title>404</Title>
        <Message>Page Not Found</Message>
        <HomeLink href="/">Go Back Home</HomeLink>
      </ErrorBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #00b4db, #0083b0);
`;

const ErrorBox = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

const Title = styled.h1`
  font-size: 6rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #666;
`;

const HomeLink = styled.a`
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  display: inline-block;
`;

export default PageNotFound;
