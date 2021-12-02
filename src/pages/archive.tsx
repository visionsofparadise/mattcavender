import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Spacer from "../components/spacer";
import CosmikeText from "../components/cosmikeText";
import SmallSpacer from "../components/smallSpacer";
import Ah from "../components/ariaHidden";

const ArchivePage = ({ data }) => {
  return (
    <Layout>
      <main>
        <title>Archives | mattcavender.com</title>

        <Link to="/">
          <CosmikeText text="Back" />
        </Link>

        <Spacer />

        <p>
          <Ah>� </Ah>Archive<Ah> �</Ah>
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

export default ArchivePage;
