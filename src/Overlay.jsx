import "./styles.css";
import { useContext } from "react";
import DotRing from "./components/DotRing/DotRing";
import { MouseContext } from "./context/mouse-context";

export default function Overlay() {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  return (
    <>
      <div className="container">
        <DotRing />

        <div className="brand">
          <a
            onPointerEnter={() => {
              cursorChangeHandler("hovered");
            }}
            onPointerLeave={() => {
              cursorChangeHandler("");
            }}
            href="https://andersonmancini.dev/"
            target="_blank"
            rel="noreferrer"
          >
            THREE.JS DISPLACEMENT MAP
            <br />
            <small>BY ANDERSON MANCINI</small>
          </a>
        </div>
        <button
          className="top-button"
          onPointerEnter={() => {
            cursorChangeHandler("hovered");
          }}
          onPointerLeave={() => {
            cursorChangeHandler("");
          }}
          onClick={() => {
            window.open(
              "https://github.com/ektogamat/displacement-demo",
              "_blank"
            );
          }}
        >
          DOWNLOAD SOURCE CODE
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 14.38L1.68229 16L10 8L1.68229 -2.38419e-07L0 1.62L6.63021 8L0 14.38Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
