import React from 'react'
import Layout from '../components/layout'
import { Link, graphql, useStaticQuery } from 'gatsby'

const getImageData = graphql`
  {
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      edges {
        node {
          relativePath
          size
          extension
          birthTime
        }
      }
    }
  }
`

const ThirdPage = () => {
  const data = useStaticQuery(getImageData)
  return (
    <Layout>
      <h1>Hello from page 3</h1>
      <h3>Image file data</h3>
      <table>
        <thead>
          <tr>
            <th>Relative Path</th>
            <th>Size of Image</th>
            <th>Extension</th>
            <th>Birth time</th>
          </tr>
        </thead>
        <tbody>
          {data.allFile.edges.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.relativePath}</td>
              <td>{node.size}</td>
              <td>{node.extension}</td>
              <td>{node.birthTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/page-2/">Go to page 2</Link> <br />
    </Layout>
  )
}

export default ThirdPage
