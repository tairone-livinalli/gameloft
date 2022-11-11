import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  );
};

export default Loading;
