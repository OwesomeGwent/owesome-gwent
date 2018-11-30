import styled from 'styled-components';

const FloatingBox = styled.div`
  position: sticky;
  top: 70px;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
`;

export default FloatingBox;
