import styled from 'styled-components';
import { media } from '../../helpers/media';
const FloatingBox = styled.div`
  width: 300px;
  margin-top: 1.5rem;
  font-weight: 600;

  @media (max-width: ${media.phone}px) {
    width: 100%;
    margin: auto;
  }
`;

export default FloatingBox;
