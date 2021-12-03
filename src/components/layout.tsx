import React from "react";
import SmallSpacer from "./smallSpacer";
import Spacer from "./spacer";
import FadeIn from "react-fade-in";
import Ah from "./ariaHidden";
import ASCII from "react-rainbow-ascii";
import Fraktur from "figlet/importable-fonts/Fraktur";
import CosmikeText from "../components/cosmikeText";

export default function Layout({ children }) {
  const phrases = [
    "The last free outpost",
    "A real original fake masterpiece",
    "Another maiden voyage",
    "Who the fuck is John Africa",
    "It really hurts",
    "Present day present time",
    "Will and existance the rest is data",
    "I put you on my vision board",
    "Fulfill the prophecy",
  ];

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          bottom: 0,
          fontSize: 100 + "%",
          color: "#000",
          zIndex: -1,
        }}
      >
        <Ah>
          <div className="widescreen">
            <ASCII
              text="MBC"
              rainbow={false}
              font={Fraktur as figlet.Fonts}
              id="MBC"
            />
          </div>
          <div className="thinscreen">
            <ASCII
              text="MC"
              rainbow={false}
              font={Fraktur as figlet.Fonts}
              id="MC"
            />
          </div>
        </Ah>
      </div>

      <FadeIn>
        <Spacer />

        {children}

        <Spacer />

        <p>
          Contact me at<Ah>...</Ah>
        </p>
        <pre className="widescreen">
          <span className="muted">
            <Ah>ضؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤ</Ah>
          </span>
          [ <a href="mailto:s5t0js8n@anonaddy.me">s5t0js8n@anonaddy.me</a> ]
          <span className="muted">
            <Ah>ؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤ·</Ah>
          </span>
        </pre>
        <pre className="thinscreen">
          [ <a href="mailto:s5t0js8n@anonaddy.me">s5t0js8n@anonaddy.me</a> ]
        </pre>

        <Spacer />

        <div className="muted" style={{ fontSize: 50 + "%" }}>
          {phrases[Math.floor(Math.random() * phrases.length)]
            .split(" ")
            .map((word) => (
              <div style={{ padding: 10 + "px" }}>
                <CosmikeText text={word} key={Math.random()} />
              </div>
            ))}
        </div>

        <Spacer />
      </FadeIn>
    </>
  );
}
