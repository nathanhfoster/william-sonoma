import { Component } from 'react'
import PropTypes from 'prop-types'

class UseDebounce extends Component {
  constructor(props) {
    super(props)
    this.debounce = null
  }

  static propTypes = {
    onChangeCallback: PropTypes.func.isRequired,
    value: PropTypes.any,
    delay: PropTypes.number
  }

  static defaultProps = {
    delay: 400
  }

  shouldComponentUpdate(nextProps) {
    const previousValue = this.props.value
    const nextValue = nextProps.value
    const valueChanged = previousValue !== nextValue
    return valueChanged
  }

  getSnapshotBeforeUpdate() {
    clearTimeout(this.debounce)
    return null
  }

  componentDidUpdate() {
    const { onChangeCallback, value, delay } = this.props

    this.debounce = setTimeout(() => onChangeCallback(value), delay)
  }

  render() {
    return null
  }
}
export default UseDebounce
