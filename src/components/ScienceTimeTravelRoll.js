import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class ScienceTimeTravelRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="section blog-list box">
        <h2 className="title is-size-3 has-text-weight-bold is-bold-light">Latest articles:</h2>
          {posts &&
            posts.map(({ node: post }) => (
              <p className="blog-listing">
                <Link
                  className=""
                  to={post.fields.slug}
                >
                  {post.frontmatter.title}
                </Link>
              </p>

            ))}
      </div>
  )
}
}

ScienceTimeTravelRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
    query ScienceTimeTravelRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { tags: { eq: "science" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ScienceTimeTravelRoll data={data} count={count} />}
  />
)
