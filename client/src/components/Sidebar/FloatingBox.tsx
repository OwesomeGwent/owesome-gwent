import styled from 'styled-components';

const FloatingBox = styled.div`
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 100px);
  font-weight: 600;
  overflow-y: auto;
  padding-right: 20px;
`;

export default FloatingBox;
