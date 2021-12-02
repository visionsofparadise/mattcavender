import React from "react";
import rehypeReact from "rehype-react";
import Ah from "./ariaHidden";
import SmallSpacer from "./smallSpacer";
import Spacer from "./spacer";

function CustomHeading({ children, number }) {
  let iconsString = "";

  for (let i = 0; i < number; i++) iconsString += "�";

  return (
    <>
      <SmallSpacer />
      <p style={{ textAlign: "center" }}>
        <Ah>{iconsString} </Ah>
        {children}
        <Ah> {iconsString}</Ah>
      </p>
      <SmallSpacer />
    </>
  );
}

function CustomH1({ children }) {
  return <CustomHeading number={1}>{children}</CustomHeading>;
}

function CustomH2({ children }) {
  return <CustomHeading number={2}>{children}</CustomHeading>;
}

function CustomH3({ children }) {
  return <CustomHeading number={3}>{children}</CustomHeading>;
}

function CustomH4({ children }) {
  return <CustomHeading number={4}>{children}</CustomHeading>;
}

function CustomH5({ children }) {
  return <CustomHeading number={5}>{children}</CustomHeading>;
}

function CustomH6({ children }) {
  return <CustomHeading number={6}>{children}</CustomHeading>;
}

function ExternalLink({ children, href }) {
  return (
    <a href={href} target="__blank" rel="noreferrer">
      {children} ↪
    </a>
  );
}

export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: CustomH1,
    h2: CustomH2,
    h3: CustomH3,
    h4: CustomH4,
    h5: CustomH5,
    h6: CustomH6,
    a: ExternalLink,
    hr: Spacer,
  },
}).Compiler;
