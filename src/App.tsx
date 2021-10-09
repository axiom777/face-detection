import React from "react";
import * as faceapi from "face-api.js";
import styles from "./App.module.css";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type FullFaceDescriptions = faceapi.WithFaceDescriptor<
  faceapi.WithFaceLandmarks<
    {
      detection: faceapi.FaceDetection;
    },
    faceapi.FaceLandmarks68
  >
>[];

async function detectFace(
  image: HTMLImageElement,
  setState: Function
): Promise<FullFaceDescriptions> {
  console.log(process.env.NODE_ENV);
  const MODEL_URL =
    process.env.NODE_ENV === "development"
      ? "/weights"
      : "https://axiom777.github.io/face-detection/weights";

  setState({ detectionStatus: "Load SsdModel" });

  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  setState({ detectionStatus: "Load LandmarkModel" });

  await faceapi.loadFaceLandmarkModel(MODEL_URL);
  setState({ detectionStatus: "Load RecognitionModel" });

  await faceapi.loadFaceRecognitionModel(MODEL_URL);
  setState({ detectionStatus: "Detection" });
  let fullFaceDescriptions = await faceapi
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceDescriptors();
  return fullFaceDescriptions;
}

interface Props {}
interface State {
  fullFaceDescriptions: FullFaceDescriptions | null;
  crop: Partial<Crop>;
  src: string | null;
  croppedImageUrl: any;
  modalVisible: boolean;
  detectionStatus: string;
}

class App extends React.Component<Props, State> {
  private imageAvatarRef: React.RefObject<HTMLImageElement>;
  private canvasAvatarRef: React.RefObject<HTMLCanvasElement>;
  private imageRef: HTMLImageElement | null = null;
  private fileUrl: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      fullFaceDescriptions: null,
      croppedImageUrl: "",
      src: null,
      crop: {
        unit: "%",
        width: 270,
        aspect: 1,
      },
      modalVisible: false,
      detectionStatus: "",
    };

    this.imageAvatarRef = React.createRef<HTMLImageElement>();
    this.canvasAvatarRef = React.createRef<HTMLCanvasElement>();
    this.handleToggleCamera = this.handleToggleCamera.bind(this);
    this.handleDetectFace = this.handleDetectFace.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onCropComplete = this.onCropComplete.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidUpdate(_: Props, prevState: State) {
    let { fullFaceDescriptions } = this.state;
    if (prevState.fullFaceDescriptions !== fullFaceDescriptions) {
      console.log("1");
      console.log(
        this.imageAvatarRef.current!.width,
        this.imageAvatarRef.current!.height
      );

      const dimensions = {
        width: this.imageAvatarRef.current!.clientWidth,
        height: this.imageAvatarRef.current!.clientHeight,
      };
      const resized = faceapi.resizeResults(fullFaceDescriptions, dimensions);
      const canvas = this.canvasAvatarRef.current;
      console.log("2");
      if (canvas !== null && resized !== null) {
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceLandmarks(canvas, resized);
        console.log("3");
      }
    }
  }

  handleToggleCamera() {}

  async handleDetectFace() {
    const image = this.imageAvatarRef.current;
    if (image !== null) {
      const stateCallBack = this.setState.bind(this);
      const result = await detectFace(image, stateCallBack);
      const score = result.length
        ? result.reduce((acc, v, i) => {
            acc += ` Detection ${i} score: ${v.detection.score}`;
            return acc;
          }, "")
        : "Face not found";

      this.setState({
        fullFaceDescriptions: result,
        detectionStatus: score,
      });
    }
  }

  handleOnSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const { result } = reader;
        if (typeof result === "string") {
          this.setState({ src: result, modalVisible: true });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  handleSave() {
    const { croppedImageUrl } = this.state;
    this.setState({
      src: croppedImageUrl,
      modalVisible: false,
    });
  }

  getCroppedImg(image: HTMLImageElement, crop: Crop, fileName: string) {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx!.imageSmoothingQuality = "high";

    ctx!.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
          }
          const newBlob: Blob & { name?: string } = blob;
          newBlob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(newBlob);
          resolve(this.fileUrl);
        },
        "image/jpeg",
        1
      );
    });
  }

  async makeClientCrop(crop: Crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  onImageLoaded = (image: HTMLImageElement) => {
    this.imageRef = image;
  };

  onCropComplete = (crop: Crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (_: Crop, percentCrop: Crop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop: percentCrop });
  };

  render() {
    const {
      src,
      crop,
      croppedImageUrl,
      modalVisible,
      detectionStatus,
    } = this.state;
    return (
      <div>
        <div className={styles.App}>
          <div className={styles.Avatar}>
            {src !== null && (
              <img src={src} alt="Avatar" ref={this.imageAvatarRef} />
            )}
            <canvas ref={this.canvasAvatarRef}></canvas>
            <span>{detectionStatus}</span>
          </div>
          <div className={styles.buttons}>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={this.handleOnSelectFile}
            />
            <button onClick={this.handleToggleCamera}>toggleCamera</button>
            <button onClick={this.handleDetectFace}>DetectFace</button>
          </div>
        </div>
        {src && modalVisible && (
          <div className={styles.modal}>
            <div className={styles.modalContainer}>
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
              <div>
                <img alt="Crop" src={croppedImageUrl} />
                <button onClick={this.handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
