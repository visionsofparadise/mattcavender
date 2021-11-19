import React from "react";
import { graphql, Link } from "gatsby";
import chunk from "lodash/chunk";
import StrongerThanAll from "figlet/importable-fonts/Stronger Than All";
import ASCII from "react-rainbow-ascii";
import Layout from "../components/layout";
import Spacer from "../components/spacer";
import BloodyText from "../components/bloodyText";

export default function BlogPost({ data }) {
  const post = data.markdownRemark;

  return (
    <Layout>
      <main>
        <title>{post.frontmatter.title} | mattcavender.com</title>

        <Link to="../archive" style={{ fontSize: 50 + "%", textAlign: "left" }}>
          <BloodyText text="Back" />
        </Link>

        <Spacer />

        <Link to={post.slug}>
          <div className="widescreen" style={{ fontSize: 50 + "%" }}>
            {chunk(post.frontmatter.title.split(" "), 3).map((line) => (
              <ASCII
                text={line.join(" ").toUpperCase()}
                rainbow={false}
                font={StrongerThanAll as figlet.Fonts}
                id="titleWidescreen"
              />
            ))}
          </div>
          <div className="thinscreen" style={{ fontSize: 50 + "%" }}>
            {post.frontmatter.title.split(" ").map((line) => (
              <ASCII
                text={line.toUpperCase()}
                rainbow={false}
                font={StrongerThanAll as figlet.Fonts}
                id="titleThinscreen"
              />
            ))}
          </div>
        </Link>
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

        <div
          className="postbody"
          dangerouslySetInnerHTML={{
            __html: post.html,
          }}
        />

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
      html
      slug: gatsbyPath(filePath: "/{MarkdownRemark.frontmatter__title}")
    }
  }
`;
