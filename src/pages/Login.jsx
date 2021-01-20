import React from 'react';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';
import { CustomButton } from '../components';
import { signInWithGithub, signInWithGoogle } from '../firebase/firebase.utils';
const Login = () => {
  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="githubUserImage" />
        <h1>Github Profile</h1>
        <CustomButton
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Login with Google{'  '}
          <span>
            <AiOutlineGooglePlus className="icon" fontSize="1.5rem" />
          </span>
        </CustomButton>
        <CustomButton
          github={true}
          onClick={() => {
            signInWithGithub();
          }}
        >
          Login with Github{'  '}
          <span>
            <FaGithub className="icon" fontSize="1.5rem" />
          </span>
        </CustomButton>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }

  .icon {
    margin-bottom: -6px;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
