import React from 'react';
import styled from 'styled-components';

const CustomButton = ({ children, github, ...otherProps }) => (
  <Wrapper className={`${github ? 'github' : ''}`} {...otherProps}>
    {children}
  </Wrapper>
);

const Wrapper = styled.button`
  min-width: 150px;
  letter-spacing: var(--spacing);
  border: 2px solid transparent;
  margin: 0.5rem 1rem;
  padding: 0.55rem 1.25rem 0.55rem 1.25rem;
  font-size: 1rem;
  background: var(--clr-primary-5);
  transition: var(--transition);
  border-radius: var(--radius);
  color: var(--clr-primary-10);
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
  justify-content: center;

  &:hover {
    background: var(--clr-primary-8);
    color: var(--clr-primary-1);
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  }

  &.github {
    background-color: var(--clr-grey-5);
    color: var(--clr-white);

    &:hover {
      background-color: var(--clr-grey-8);
      color: var(--clr-grey-2);
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    }
  }
`;

export default CustomButton;
