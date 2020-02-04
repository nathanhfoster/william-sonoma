import React, { useState, useEffect, memo } from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import { Container, Row, Col, Button } from "reactstrap"
import BasicSearchBar from "./components/BasicSearchBar"
import BasicModal from "./components/BasicModal"
import BasicCarousel from "./components/BasicCarousel"
import ProductCard from "./components/ProductCard"
import { FetchAllProducts } from "./actions/Products"
import "./App.css"

const mapStateToProps = ({ Products }) => ({ Products })

const mapDispatchToProps = { FetchAllProducts }

const PRODUCT_GROUP_IMAGE_PROPS = PropTypes.shape({
  size: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  rel: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired
})

const App = ({
  Products: { id, name, categoryType, groups, totalPages, categories },
  FetchAllProducts
}) => {
  useEffect(() => {
    FetchAllProducts()
  }, [])

  const [searchValue, setSearch] = useState("")

  const filteredGroups = groups.filter(g =>
    JSON.stringify(g)
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  )

  const handleSearch = searchValue => setSearch(searchValue)

  const renderProductGroups = groups =>
    groups.map(group => {
      const {
        id,
        name,
        links: { www },
        priceRange: { selling },
        thumbnail,
        hero,
        images,
        swatches,
        messages,
        flags,
        reviews: {
          recommendationCount,
          likelihood,
          reviewCount,
          averageRating,
          type
        }
      } = group
      return (
        <Col key={id} xs={12} lg={4} className="p-2">
          <BasicModal
            title={
              <a href={www} target="_blank" style={{ fontSize: 20 }}>
                {name}
              </a>
            }
            button={
              <div>
                <ProductCard
                  {...hero}
                  {...selling}
                  name={name}
                  messages={messages}
                />
              </div>
            }
          >
            <div style={{ textAlign: "center" }}>
              <BasicCarousel
                images={[
                  {
                    src: hero.href,
                    altText: hero.alt,
                    height: hero.height,
                    width: hero.width
                  }
                ].concat(
                  images.map(image => ({
                    src: image.href,
                    altText: image.alt,
                    height: image.height,
                    width: image.width
                  }))
                )}
              />
              <Button
                color="danger"
                style={{ backgroundColor: "#af1a31" }}
                className="mt-3"
              >
                Add To Cart
              </Button>
            </div>
          </BasicModal>
        </Col>
      )
    })

  return (
    <Container className="App mt-4 mb-4">
      <header className="AppHeader">
        <Row>
          <Col tag="h3" xs={12} className="AppTitle p-2">
            WILLIAMS SONOMA
            <hr style={{ backgroundColor: "#f6e58d" }} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="p-2">
            <BasicSearchBar
              placeholder="Search products..."
              onSubmit={handleSearch}
            />
          </Col>
        </Row>
        <Row>{renderProductGroups(filteredGroups)}</Row>
      </header>
    </Container>
  )
}

App.propTypes = {
  FetchAllProducts: PropTypes.func.isRequired,
  Products: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    categoryType: PropTypes.string,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        links: PropTypes.shape({ www: PropTypes.string }),
        priceRange: PropTypes.shape({
          selling: PropTypes.shape({
            high: PropTypes.number,
            low: PropTypes.number
          })
        }),
        thumbnail: PRODUCT_GROUP_IMAGE_PROPS,
        hero: PRODUCT_GROUP_IMAGE_PROPS,
        images: PropTypes.arrayOf(PRODUCT_GROUP_IMAGE_PROPS),
        swatches: PropTypes.array,
        messages: PropTypes.array,
        flags: PropTypes.arrayOf(
          PropTypes.shape({
            bopisSuppress: PropTypes.bool,
            rank: PropTypes.number,
            id: PropTypes.string
          })
        ),
        reviews: PropTypes.shape({
          recommendationCount: PropTypes.number,
          likelihood: PropTypes.number,
          reviewCount: PropTypes.number,
          averageRating: PropTypes.number,
          id: PropTypes.string,
          type: PropTypes.string
        })
      })
    ).isRequired,
    totalPages: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired
  }).isRequired
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(memo(App))
