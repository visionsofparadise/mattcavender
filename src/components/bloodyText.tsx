import React from "react";
import ASCII from "react-rainbow-ascii";
import Bloody from "figlet/importable-fonts/Bloody";

export default function BloodyText({ text }) {
  return (
    <div style={{ fontSize: 50 + "%" }}>
      <ASCII
        text={text.toUpperCase()}
        id={text}
        rainbow={false}
        font={Bloody as figlet.Fonts}
      />
    </div>
  );
}
