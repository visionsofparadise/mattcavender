import React from "react";
import "./layout.css";
import SmallSpacer from "./smallSpacer";
import Spacer from "./spacer";
import FadeIn from "react-fade-in";

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

      <p>Contact me at...</p>
      <pre className="widescreen">
        <span className="muted">ضؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤ</span>[{" "}
        <a href="mailto:s5t0js8n@anonaddy.me">s5t0js8n@anonaddy.me</a> ]
        <span className="muted">ؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤؤ·</span>
      </pre>
      <pre className="thinscreen">
        <span className="muted">ضؤؤؤ</span>[{" "}
        <a href="mailto:s5t0js8n@anonaddy.me">s5t0js8n@anonaddy.me</a> ]
        <span className="muted">ؤؤؤ·</span>
      </pre>

      <Spacer />

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

      <SmallSpacer />

      <p className="muted" style={{ fontSize: 80 + "%" }}>
        {phrases[Math.floor(Math.random() * phrases.length)]}
      </p>

      <Spacer />
    </FadeIn>
  );
}
