import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Spacer from "../components/spacer";
import CosmikeText from "../components/cosmikeText";
import SmallSpacer from "../components/smallSpacer";
import Ah from "../components/ariaHidden";
import Fraktur from "figlet/importable-fonts/Fraktur";
import ASCII from "react-rainbow-ascii";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <main>
        <title>Matt Cavender</title>

        <div>
          <Link to="/">
            <div style={{ fontSize: 50 + "%" }}>
              <Ah>
                <ASCII
                  text="Matt"
                  rainbow={false}
                  font={Fraktur as figlet.Fonts}
                  id="Matt"
                />
                <ASCII
                  text="Cavender"
                  rainbow={false}
                  font={Fraktur as figlet.Fonts}
                  id="Cavender"
                />
              </Ah>
              <h1 className="sr-only">Matt Cavender</h1>
            </div>
          </Link>

          <SmallSpacer />

          <p>
            Electronic music/podcast producer and coder (Node/Typescript,
            React).
          </p>
        </div>

        <Spacer />

        <p>
          <Ah>� </Ah>Blog<Ah> �</Ah>
        </p>

        <p>
          <a href="/rss.xml" target="__blank" rel="noreferrer">
            RSS
          </a>
        </p>

        <SmallSpacer />

        <ul style={{ listStyleType: "tibetan", paddingLeft: 20 + "px" }}>
          {data.allMarkdownRemark.nodes.map((post) => (
            <li key={post.frontmatter.title}>
              <span className="widescreen">
                <div style={{ float: "left" }}>
                  <Link to={post.slug}>{post.frontmatter.title}</Link>
                </div>
                <div style={{ float: "right" }}>
                  <span style={{ color: "#555555" }}>
                    {post.frontmatter.tags
                      .split(",")
                      .map((tag) => tag && tag.length > 0 && `#${tag} `)}{" "}
                    - {post.frontmatter.date.slice(0, -5)}
                  </span>
                </div>
              </span>
              <span className="thinscreen" style={{ textAlign: "left" }}>
                <Link to={post.slug}>{post.frontmatter.title}</Link>
                <br />
                <span style={{ color: "#555555" }}>
                  {post.frontmatter.tags
                    .split(",")
                    .map((tag) => tag && tag.length > 0 && `#${tag} `)}{" "}
                  - {post.frontmatter.date.slice(0, -5)}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <Spacer />

        <p>
          <Ah>� </Ah>AKA<Ah> �</Ah>
        </p>

        <SmallSpacer />

        <div>
          <CosmikeText text="xKore" />
          <p>dubstep and drum & bass music (est. 2008)</p>
          <p>
            <a
              href="https://soundcloud.com/xkore"
              rel="noreferrer"
              target="__blank"
            >
              soundcloud
            </a>
            <Ah>{" њ "}</Ah>
            <a
              href="https://open.spotify.com/artist/5cfALf5vLhWIo7VeIh4fQX?si=XttWpM81TCi7qVMpH3uKYQ"
              rel="noreferrer"
              target="__blank"
            >
              spotify
            </a>
            <Ah>{" њ "}</Ah>
            <a
              href="https://www.youtube.com/user/xKoreHD"
              rel="noreferrer"
              target="__blank"
            >
              youtube
            </a>
          </p>

          <Spacer />

          <div className="widescreen">
            <CosmikeText text="Sonny Banks" />
          </div>
          <div className="thinscreen">
            <CosmikeText text="Sonny" />
            <CosmikeText text="Banks" />
          </div>
          <p>bass house music (est. 2014)</p>
          <p>
            <a
              href="https://soundcloud.com/sonnybanksmusic"
              rel="noreferrer"
              target="__blank"
            >
              soundcloud
            </a>
            <Ah>{" њ "}</Ah>
            <a
              href="https://open.spotify.com/artist/6ib0DdCLBUPWNaHztQhrSL"
              rel="noreferrer"
              target="__blank"
            >
              spotify
            </a>
            <Ah>{" њ "}</Ah>
            <a
              href="https://www.youtube.com/user/sonnybanksmusic"
              rel="noreferrer"
              target="__blank"
            >
              youtube
            </a>
          </p>

          <Spacer />

          <CosmikeText text="ZCROSS" />
          <p>podcast production and editing (est. 2020)</p>
          <p>
            <a href="https://zcross.media" rel="noreferrer" target="__blank">
              website
            </a>
          </p>
        </div>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          title
          date
          tags
        }
        slug: gatsbyPath(filePath: "/{MarkdownRemark.frontmatter__title}")
      }
    }
  }
`;

export default IndexPage;
