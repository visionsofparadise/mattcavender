import React from "react";
import SmallSpacer from "./smallSpacer";
import Spacer from "./spacer";
import FadeIn from "react-fade-in";
import Ah from "./ariaHidden";

export default function Layout({ children }) {
  const phrases = [
    "The last free outpost",
    "A real original fake masterpiece",
    "Another maiden voyage",
    "Who the fuck is John Africa?",
    "It really hurts :)",
    "Present day, present time",
    "Will and existance, the rest is data",
    "I put you on my vision board",
    "Fulfill the prophecy!",
  ];

  return (
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

      <Ah>
        <pre className="muted" style={{ fontSize: 80 + "%" }}>
          {`л
л
л
л
л
л
л
ѓ№ђ
В
В`}
        </pre>
      </Ah>

      <SmallSpacer />

      <p className="muted" style={{ fontSize: 80 + "%" }}>
        {phrases[Math.floor(Math.random() * phrases.length)]}
      </p>

      <Spacer />
    </FadeIn>
  );
}
