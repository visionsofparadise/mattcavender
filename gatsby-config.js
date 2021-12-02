require("dotenv").config();

const siteAddress = new URL("https://www.mattcavender.com");

module.exports = {
  siteMetadata: {
    title: "Matt Cavender",
    siteUrl: siteAddress.href.slice(0, -1),
    description: "Matt Cavender aka xKore aka Sonny Banks aka ZCROSS",
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-prismjs`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
      plugins: [
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            classPrefix: "language-",
            inlineCodeMarker: null,
            aliases: {},
            showLineNumbers: false,
            noInlineHighlight: false,
            languageExtensions: [
              {
                language: "superscript",
                extend: "javascript",
                definition: {
                  superscript_types: /(SuperType)/,
                },
                insertBefore: {
                  function: {
                    superscript_keywords: /(superif|superelse)/,
                  },
                },
              },
            ],
            prompt: {
              user: "root",
              host: "localhost",
              global: false,
            },
            escapeEntities: {},
          },
        },
      ],
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./src/blog/",
      },
      __key: "blog",
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
				{
					site {
						siteMetadata {
							title
							description
							siteUrl
							site_url: siteUrl
						}
					}
				}
				`,
        feeds: [
          {
            title: "Matt Cavender",
            output: "rss.xml",
            query: `
					{
						allMarkdownRemark(sort: {fields: frontmatter___date, order: ASC}) {
							nodes {
								frontmatter {
									title
									date
									description
								}
								html
								slug: gatsbyPath(filePath: "/{MarkdownRemark.frontmatter__title}")
							}
						}
					}
					`,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  url: `${site.siteMetadata.siteUrl}${node.slug}`,
                  guid: `${site.siteMetadata.siteUrl}${node.slug}`,
                });
              });
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.S3_BUCKET_NAME,
        protocol: siteAddress.protocol.slice(0, -1),
        hostname: siteAddress.hostname,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: siteAddress.href.slice(0, -1),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Matt Cavender",
        short_name: "Matt Cavender",
        start_url: "/",
        background_color: "#18191a",
        theme_color: "#fd8c84",
        display: "standalone",
        icon: "src/images/favicon.png",
      },
    },
  ],
};
