import React from "react";
import * as faceapi from "face-api.js";
import styles from "./App.module.css";
import face from "./face.jpg";

type FullFaceDescriptions = faceapi.WithFaceDescriptor<
  faceapi.WithFaceLandmarks<
    {
      detection: faceapi.FaceDetection;
    },
    faceapi.FaceLandmarks68
  >
>[];

async function detectFace(
  image: HTMLImageElement
): Promise<FullFaceDescriptions> {
  const MODEL_URL = "/weights";

  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  await faceapi.loadFaceLandmarkModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
  let fullFaceDescriptions = await faceapi
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceDescriptors();
  return fullFaceDescriptions;
}

interface Props {}
interface State {
  fullFaceDescriptions: FullFaceDescriptions | null;
}

class App extends React.Component<Props, State> {
  private imageRef: React.RefObject<HTMLImageElement>;
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      fullFaceDescriptions: null,
    };

    this.imageRef = React.createRef<HTMLImageElement>();
    this.canvasRef = React.createRef<HTMLCanvasElement>();
    this.handleToggleCamera = this.handleToggleCamera.bind(this);
    this.handleDetectFace = this.handleDetectFace.bind(this);
  }

  componentDidUpdate(_: Props, prevState: State) {
    let { fullFaceDescriptions } = this.state;
    if (prevState.fullFaceDescriptions !== fullFaceDescriptions) {
      console.log("1");
      console.log(this.imageRef.current!.width, this.imageRef.current!.height);

      const dimensions = {
        width: this.imageRef.current!.clientWidth,
        height: this.imageRef.current!.clientHeight,
      };
      const resized = faceapi.resizeResults(fullFaceDescriptions, dimensions);
      const canvas = this.canvasRef.current;
      console.log("2");
      if (canvas !== null && resized !== null) {
        faceapi.draw.drawDetections(canvas, resized);
        console.log("3");
      }
    }
  }

  handleToggleCamera() {}

  async handleDetectFace() {
    const image = this.imageRef.current;
    if (image !== null) {
      const result = await detectFace(image);
      this.setState({ fullFaceDescriptions: result });
    }
  }

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.Avatar}>
          <img src={face} alt="Avatar" ref={this.imageRef} />
          <canvas ref={this.canvasRef}></canvas>
        </div>
        <div className={styles.buttons}>
          <button onClick={this.handleToggleCamera}>toggleCamera</button>
          <button onClick={this.handleDetectFace}>DetectFace</button>
        </div>
      </div>
    );
  }
}

export default App;
