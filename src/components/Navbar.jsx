import React from 'react';
import { auth } from '../firebase/firebase.utils';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  const history = useHistory();
  let displayName = null,
    photoUrl = null;
  if (auth.currentUser) {
    displayName = auth.currentUser.displayName;
    photoUrl = auth.currentUser.photoURL;
  }
  return (
    <Wrapper>
      {auth.currentUser && photoUrl && <img src={photoUrl} alt={displayName} />}
      {auth.currentUser && displayName && (
        <h4>
          Welcome, <strong>{displayName.toUpperCase()}</strong>
        </h4>
      )}
      <button
        onClick={() => {
          auth.signOut();
          history.go(0);
        }}
      >
        logout
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
