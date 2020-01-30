import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import {
  Container,
  Row,
  Col,
  Badge,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap"
import BasicSearchBar from "./components/BasicSearchBar"
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
  constructor(props) {
    super(props)

    this.state = { searchValue: "" }
  }
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

  handleSearch = searchValue => this.setState({ searchValue })

  renderProductGroups = groups =>
    groups.map(group => {
      const {
        id,
        name,
        links: { www },
        priceRange: {
          selling: { high, low }
        },
        thumbnail: { size, meta, alt, rel, width, href, height },
        hero,
        images,
        swatches,
        messages,
        flags,
        reviews: { recommendationCount, likelihood, reviewCount, averageRating, type }
      } = group
      return (
        <Col key={id} xs={12} lg={4} className="p-2">
          <BasicModal
            modalTitle={
              <a href={www} target="_blank" style={{ fontSize: 20 }}>
                {name}
              </a>
            }
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
            <div style={{ textAlign: "center" }}>
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
              <Button color="danger" style={{ backgroundColor: "#af1a31" }} className="mt-3">
                Add To Cart
              </Button>
            </div>
          </BasicModal>
        </Col>
      )
    })

  render() {
    const {
      Products: { id, name, categoryType, groups, totalPages, categories }
    } = this.props

    const { searchValue } = this.state

    const filteredGroups = groups.filter(g =>
      JSON.stringify(g)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )

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
              <BasicSearchBar onSubmit={value => this.handleSearch(value)} />
            </Col>
          </Row>
          <Row>{this.renderProductGroups(filteredGroups)}</Row>
        </header>
      </Container>
    )
  }
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(App)
