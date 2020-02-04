import React, { memo } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap"

import "./styles.css"

const ProductCard = ({
  size,
  height,
  width,
  href,
  alt,
  low,
  high,
  name,
  messages
}) => (
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
)

ProductCard.propTypes = {
  size: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  href: PropTypes.string,
  alt: PropTypes.string,
  meta: PropTypes.string,
  rel: PropTypes.string,
  low: PropTypes.number,
  high: PropTypes.number,
  name: PropTypes.string,
  messages: PropTypes.string
}

export default memo(ProductCard)
