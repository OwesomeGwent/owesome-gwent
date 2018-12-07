import styled from 'styled-components';
import { media } from '../../helpers/media';
const FloatingBox = styled.div`
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 100px);
  font-weight: 600;
  overflow-y: auto;
  padding-right: 20px;

  @media (max-width: ${media.phone}px) {
    width: 100%;
  }
`;

export default FloatingBox;
