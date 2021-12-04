import React from "react";
import Spacer from "./spacer";
import FadeIn from "react-fade-in";
import Ah from "./ariaHidden";
import ASCII from "react-rainbow-ascii";
import Fraktur from "figlet/importable-fonts/Fraktur";
import CosmikeText from "../components/cosmikeText";
import { Link } from "gatsby";

export default function Layout({ children }) {
  const phrases = [
    "The last free outpost",
    "A real original fake masterpiece",
    "Another maiden voyage",
    "It really hurts",
    "Present day present time",
    "Will and existance the rest is data",
    "I put you on my vision board",
    "Fulfill the prophecy",
  ];

  const bottomDecoration = `ẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌ
²Û²±°°  °°±²Û²±°°  °°±²Û²±°°  °°±²Û²±°°  °°±²Û²±°°  °°±²Û²±°°  °°±²Û²
ÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛ
°°°°±±±±±°²²±²²±±²±±±²²²²²±±²±±±²²²±±±±±±±±±±±±±±±±±²±±±±±±±±±±±±±±±²
°°°°°°±±±±²±±²°±²²°°°°°±±°±°°²±±²²±²±±±±±±±°±±±±±±±±²±±±±±±±±±±±±±±±²
°°°°±±±²±±²²°²°°±²°±±±°±±°°±±±±±²²²²±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±²
  ±°°°±±°°°±±°²°°±±±²±²°±±°±°±²±±±±²±±±±±±±±±±±±±±±±±²±±±±±±±±±±±±±±±²
°°°°±±±±±±²±°²°°°°±²°°°±±°±²°±±±²²²±±±±±±±±±±±±±±±±±²±±±±±±±±±±±±±±±²
  °°° ± ± ±²²²²²²±²²±²±²±±±±±±±±±²²²²±±±±±±±±±±±±±±±±²±±±±±±±±±±±±±±±²
  ° ° ± ± ± ²² ²²Û ²Û²Û² ÛÛÛÛÛÛ Û²²²² ±±±±±± ±±±±±± ±²Û ÛÛÛÛÛÛ  ÛÛÛÛ ²
  °   ±   ±  ² ² Û ²Û Û² ÛÛ ÛÛ  Û² ²² ± ±±±± ± ± ±± ±²Û Û ÛÛÛÛ  Û ÛÛ ²
  °   ±   ±    ² Û  Û Û²  Û Û   Û  ²² ± ±  ± ± ±  ± ±²Û Û  Û Û  Û  Û  
  °            ² Û  Û           Û  ²² ± ±  ± ± ±    ±²Û Û  Û    Û     
              ²    Û              ²² ± ±  ± ±       ²  Û             
                    Û               ²   ±    ±       ²  Û             
                                    ²        ±       ²                `;

  const bottomDecorationSmall = `ẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌẌ
Û²±°°  °°±²Û²±°°  °²
ÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛ
²±±±±±±±±±±±±±±±±±²²
±²±±±±±±±°±±±±±±±±²²
²²±±±±±±±±±±±±±±±±±²
²±±±±±±±±±±±±±±±±±²²
²±±±±±±±±±±±±±±±±±²²
²²±±±±±±±±±±±±±±±±²²
²² ±±±±±± ±±±±±± ±²²
²² ± ±±±± ± ± ±± ±²²
²² ± ±  ± ± ±  ± ±² 
²² ± ±  ± ± ±    ±² 
²² ± ±  ± ±       ² 
  ²   ±    ±       ² 
  ²        ±       ² `;

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

        <div
          style={{
            width: 530 + "px",
            overflow: "hidden",
            textAlign: "left",
            margin: "auto",
            color: "#000",
          }}
        >
          <Ah>
            <pre className="widescreen">{bottomDecoration}</pre>
          </Ah>
        </div>

        <div
          style={{
            width: 160 + "px",
            overflow: "hidden",
            textAlign: "left",
            margin: "auto",
            color: "#000",
          }}
        >
          <Ah>
            <pre className="thinscreen">{bottomDecorationSmall}</pre>
          </Ah>
        </div>

        <Link to="../">
          <div
            style={{
              fontSize: 50 + "%",
              position: "relative",
              top: -250 + "px",
            }}
          >
            {phrases[Math.floor(Math.random() * phrases.length)]
              .split(" ")
              .map((word) => (
                <div style={{ height: 20 + "px", padding: 10 + "px" }}>
                  <CosmikeText text={word} key={Math.random()} />
                </div>
              ))}
          </div>
        </Link>
      </FadeIn>
    </>
  );
}
