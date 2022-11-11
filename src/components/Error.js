import React from 'react';
import styled from 'styled-components/native';

const ErrorContainer = styled.View`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;

const ErrorTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #ff3333;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: #ff3333;
`;

const ErrorButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  height: 50px;
  width: 80%;
  background-color: gold;
  margin-top: 10px;
`;

const ErrorButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const Error = ({ onPress }) => {
  return (
    <ErrorContainer>
      <ErrorTitle>Oops!</ErrorTitle>
      <ErrorText>Something is wrong, please try again.</ErrorText>
      <ErrorButton onPress={onPress}>
        <ErrorButtonText>Retry</ErrorButtonText>
      </ErrorButton>
    </ErrorContainer>
  );
};

export default Error;
