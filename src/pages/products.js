import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'

const netlifyIdentity =
  typeof window !== 'undefined' ? require('netlify-identity-widget') : null

const Products = ({ data: { allContentfulProduct } }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
    if (netlifyIdentity) {
      netlifyIdentity.on('login', user => this.getProducts(user))
      netlifyIdentity.on('logout', () => this.getProducts())
    }
  }, [])
  const getProducts = user => {
    console.log('Current user', user)
    const allProducts = allContentfulProduct.edges
    if (netlifyIdentity && netlifyIdentity.currentUser() !== null)
      setProducts(allProducts)
    setProducts(allProducts.filter(({ node: product }) => !product.privage))
  }
  return (
    <Layout>
      <div>
        {products.map(({ node: product }) => (
          <div key={product.id}>
            <h2>Garb Products</h2>
            <Link
              to={`/products/${product.slug}`}
              style={{ textDecoration: 'none', color: '#551a8b' }}
            >
              <h3>
                {product.name} •{' '}
                <span
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 300,
                    color: '#f60',
                  }}
                >
                  ${product.price}
                </span>
              </h3>
            </Link>
            <Img style={{ maxWidth: 400 }} fluid={product.image.fluid} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          name
          price
          privage
          image {
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default Products
