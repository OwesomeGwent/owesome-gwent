import html2canvas from 'html2canvas';
import React, { createRef } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  min-width: 350px;
  text-align: center;
  background-color: #24282a;
  border-radius: 10px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
`;
const Text = styled.div`
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 20px;
`;
interface IRenderProps {
  downloadSnapshot: (filename: string) => void;
  getImage: () => Promise<React.ReactNode>;
  wrapper: (node: React.ReactNode) => React.ReactNode;
}
export interface ISnapshotProps {
  children: (props: IRenderProps) => React.ReactNode;
}
class Snapshot extends React.Component<ISnapshotProps> {
  public container = createRef<HTMLDivElement>();
  public snapshot = () => {
    if (this.container.current) {
      const option = {
        backgroundColor: '#121315', // transparent
        useCORS: true, // cloudinary 이미지
        logging: false,
        width: 300,
        scale: 1,
      };
      return html2canvas(this.container.current as HTMLElement, option);
    }
  };
  public getImage = async () => {
    const canvas = await this.snapshot();
    if (canvas) {
      const src = canvas.toDataURL();
      return (
        <ImageContainer>
          <Text>📸</Text>
          <Text>Copy below image to share!</Text>
          <img width={300} src={src} alt="deck image" />
        </ImageContainer>
      );
    }
    return <div>Fail to convert to image.</div>;
  };
  public downloadSnapshot = (filename: string) => {
    const snapshot = this.snapshot();
    if (snapshot) {
      snapshot.then(canvas => {
        const src = canvas.toDataURL();
        const a = document.createElement('a');

        a.style.display = 'none';
        a.href = src;
        a.download = `${filename}.png`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  };
  public render() {
    const wrapper = (node: React.ReactNode) => (
      <div ref={this.container}>{node}</div>
    );
    return (
      <>
        {this.props.children({
          downloadSnapshot: this.downloadSnapshot,
          getImage: this.getImage,
          wrapper,
        })}
      </>
    );
  }
}

export default Snapshot;
