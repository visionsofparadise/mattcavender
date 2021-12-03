import React from "react";
import ASCII from "react-rainbow-ascii";
import Cosmike from "figlet/importable-fonts/Cosmike";
import Ah from "./ariaHidden";

export default function CosmikeText({ text }) {
  return (
    <>
      <div className="widescreen">
        <Ah>
          <ASCII
            text={text}
            id={text}
            rainbow={false}
            font={Cosmike as figlet.Fonts}
          />
        </Ah>
      </div>
      <div className="thinscreen" style={{ fontSize: 40 + "%" }}>
        <Ah>
          <ASCII
            text={text}
            id={text}
            rainbow={false}
            font={Cosmike as figlet.Fonts}
          />
        </Ah>
      </div>
      <h1 className="sr-only">{text}</h1>
    </>
  );
}
