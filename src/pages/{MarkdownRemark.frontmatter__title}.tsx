import React from "react";
import { graphql, Link } from "gatsby";
import chunk from "lodash/chunk";
import Fraktur from "figlet/importable-fonts/Fraktur";
import ASCII from "react-rainbow-ascii";
import Layout from "../components/layout";
import Spacer from "../components/spacer";
import CosmikeText from "../components/cosmikeText";
import Ah from "../components/ariaHidden";
import { renderAst } from "../components/transformations";

export default function BlogPost({ data }) {
  const post = data.markdownRemark;

  return (
    <Layout>
      <main>
        <title>{post.frontmatter.title} | mattcavender.com</title>

        <Link to="../">
          <CosmikeText text="Home" />
        </Link>

        <Spacer />
        <Spacer />

        <div className="widescreen" style={{ fontSize: 50 + "%" }}>
          <Ah>
            {chunk(post.frontmatter.title.split(" "), 3).map((line) => (
              <ASCII
                text={line.join(" ")}
                rainbow={false}
                font={Fraktur as figlet.Fonts}
                id="titleWidescreen"
              />
            ))}
          </Ah>
          <h1 className="sr-only">{post.frontmatter.title}</h1>
        </div>
        <div className="thinscreen" style={{ fontSize: 50 + "%" }}>
          {post.frontmatter.title.split(" ").map((line) => (
            <ASCII
              text={line}
              rainbow={false}
              font={Fraktur as figlet.Fonts}
              id="titleThinscreen"
            />
          ))}
        </div>
        <p>{post.frontmatter.date}</p>

        <p className="muted">
          {post.frontmatter.tags
            .split(",")
            .map((tag) => tag && tag.length > 0 && `#${tag} `)}
        </p>

        <p>
          <a href="/rss.xml" target="__blank" rel="noreferrer">
            RSS
          </a>
        </p>

        <Spacer />

        <div className="postbody">{renderAst(post.htmlAst)}</div>

        <Spacer />
      </main>
    </Layout>
  );
}

export const query = graphql`
  query($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        date
        tags
      }
      htmlAst
      slug: gatsbyPath(filePath: "/{MarkdownRemark.frontmatter__title}")
    }
  }
`;
