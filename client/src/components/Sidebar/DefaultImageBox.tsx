import styled from 'styled-components';
import { BASE_IMAGE_PATH } from '../../apis/defs';

interface IImageBoxProps {
  backgroundCard: string;
}

// prettier-ignore
const Box = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 10px #000000;
  background-image: url(${({ backgroundCard }: IImageBoxProps) => `${BASE_IMAGE_PATH}/${backgroundCard}0000.png`});
  background-size: 312px;
  background-position: 30% 5%;
`;

export default Box;
