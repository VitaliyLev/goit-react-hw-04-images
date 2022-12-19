import styled from 'styled-components';

export const Btn = styled.button`
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 3px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  background-color: #303f9f;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  :hover {
    background-color: blue;
  }

  margin-left: auto;
  margin-right: auto;
`;
