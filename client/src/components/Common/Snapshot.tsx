import html2canvas from 'html2canvas';
import React, { createRef } from 'react';
import { Status } from '../../types/status';

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
        scale: 2, // quality
      };
      return html2canvas(this.container.current as HTMLElement, option);
    }
  };
  public getImage = async () => {
    const canvas = await this.snapshot();
    if (canvas) {
      const src = canvas.toDataURL();
      return (
        <div style={{}}>
          <h2 style={{ color: 'white', textAlign: 'center' }}>
            You can copy to share!
          </h2>
          <img width={380} src={src} alt="deck image" />
        </div>
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
