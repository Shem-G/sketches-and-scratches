import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import InterestingThingsRoll from '../components/InterestingThingsRoll'

export const InterestingThingsPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <div className="container">
      <div className="section">
        <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
          {title}
        </h2>
        <PageContent className="content" content={content} />
        <InterestingThingsRoll />
        </div>
    </div>
  )
}

InterestingThingsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const InterestingThingsPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <InterestingThingsPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />



    </Layout>
  )
}

InterestingThingsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default InterestingThingsPage

export const aboutPageQuery = graphql`
  query InterestingThingsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
