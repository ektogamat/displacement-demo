import { state } from "./store";

const canvasProps = {
  camera: { position: [0, 0.1, 18], fov: "25", near: 0.01, far: 1000 },
  gl: { antialias: false },
  dpr: 1,
  onPointerDown: () => {
    state.hover = true;
  },
  onPointerUp: () => {
    state.hover = false;
  },
};

export default canvasProps;
