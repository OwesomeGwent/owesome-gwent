import styled from 'styled-components';
import { media } from '../../helpers/media';
const FloatingBox = styled.div`
  position: sticky;
  width: 300px;
  top: 100px;
  font-weight: 600;

  @media (max-width: ${media.phone}px) {
    width: 100%;
    margin: auto;
  }
`;

export default FloatingBox;
