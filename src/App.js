import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import BasicModal from "./components/BasicModal"
import BasicCarousel from "./components/BasicCarousel"
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

class App extends PureComponent {
  static propTypes = {
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
            selling: PropTypes.shape({ high: PropTypes.number, low: PropTypes.number })
          }),
          thumbnail: PRODUCT_GROUP_IMAGE_PROPS,
          hero: PRODUCT_GROUP_IMAGE_PROPS,
          images: PropTypes.arrayOf(PRODUCT_GROUP_IMAGE_PROPS),
          swatches: PropTypes.array,
          messages: PropTypes.array,
          flags: PropTypes.arrayOf(
            PropTypes.shape({ bopisSuppress: PropTypes.bool, rank: PropTypes.number, id: PropTypes.string })
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

  static defaultProps = {}

  componentDidMount() {
    const { FetchAllProducts } = this.props
    FetchAllProducts()
  }

  renderProductGroups = groups =>
    groups.map(group => {
      const {
        id,
        name,
        links,
        priceRange: {
          selling: { high, low }
        },
        thumbnail: { size, meta, alt, rel, width, href, height },
        hero,
        images,
        swatches,
        messages,
        flags,
        reviews
      } = group
      return (
        <Col key={id} xs={12} lg={4} className="p-2">
          <BasicModal
            modalTitle={name}
            ModalButton={
              <Card className="ProductGroupContainer">
                <div className="ProductGroupImageContainer">
                  <CardImg
                    top
                    size={size}
                    height={height}
                    width={width}
                    src={href}
                    alt={alt}
                    className="ProductGroupImage"
                  />
                </div>

                <CardBody>
                  <CardTitle className="ProductGroupTitle">{name}</CardTitle>
                  <CardSubtitle>{`$${low} – $${high}`}</CardSubtitle>
                  <CardText>{messages}</CardText>
                </CardBody>
              </Card>
            }
          >
            <BasicCarousel
              images={[{ src: href, altText: alt, height, width }].concat(
                images.map(image => ({
                  src: image.href,
                  altText: image.alt,
                  height: image.height,
                  width: image.width
                }))
              )}
            />
          </BasicModal>
        </Col>
      )
    })

  render() {
    const {
      Products: { id, name, categoryType, groups, totalPages, categories }
    } = this.props
    return (
      <Container className="App mt-4 mb-4">
        <Row tag="header" className="AppHeader">
          <Col tag="h3" xs={12} className="AppTitle">
            WILLIAMS SONOMA
          </Col>
          {this.renderProductGroups(groups)}
        </Row>
      </Container>
    )
  }
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(App)
