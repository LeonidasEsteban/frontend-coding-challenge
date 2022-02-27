import PropTypes from 'prop-types'

const ProductListItem = ({ product }) => {
    return <div>{product.name}</div>
}

ProductListItem.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ProductListItem
