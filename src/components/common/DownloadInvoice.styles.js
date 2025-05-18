import styled from 'styled-components';

const InvoiceButton = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  background-color: orange;
  color: white;
  align-self: flex-end;
  cursor: pointer;
  font-size: 1rem;

  @media (max-width: 600px) {
    padding: 10px 0px 10px 10px;
    width: 100%;
    text-align: center;
  }

  &:hover {
    background-color: darkorange;
  }

  &:active {
    transform: scale(0.98);
  }
`;
export {
  InvoiceButton,
};
