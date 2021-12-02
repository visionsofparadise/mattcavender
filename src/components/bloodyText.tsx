import React from "react";
import ASCII from "react-rainbow-ascii";
import Bloody from "figlet/importable-fonts/Bloody";
import Ah from "./ariaHidden";

export default function BloodyText({ text }) {
  return (
    <>
      <div className="widescreen" style={{ fontSize: 50 + "%" }}>
        <Ah>
          <ASCII
            text={text.toUpperCase()}
            id={text}
            rainbow={false}
            font={Bloody as figlet.Fonts}
          />
        </Ah>
      </div>
      <div
        className="thinscreen"
        style={{ fontSize: 30 + "%", lineHeight: 80 + "%" }}
      >
        <Ah>
          <ASCII
            text={text.toUpperCase()}
            id={text}
            rainbow={false}
            font={Bloody as figlet.Fonts}
          />
        </Ah>
      </div>
      <h1 className="sr-only">{text}</h1>
    </>
  );
}
