import PropTypes from 'prop-types'
import { Collapse } from 'antd'
import * as R from 'ramda'
import axios from 'axios'
import { useQuery } from 'react-query'
import { stringify } from 'query-string'
import ProductListItem from './ProductListItem'
import CategoryName from './CategoryName'
import Loader from './Loader'

export const processResults = (results) => {
    const fn = R.groupBy((product) => {
        return product.category.name
    })

    return fn(results)
}

export const fetchProducts = async (access, store) => {
    const SERVICE_URL = process.env.NEXT_PUBLIC_SERVICE_URL
    const endpoint = `${SERVICE_URL}/api/v1/products/`

    return axios
        .get(endpoint, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
            params: { store },
            paramsSerializer: (params) => stringify(params, { arrayFormat: 'none' }),
        })
        .then(({ data }) => {
            return processResults(data.results)
        })
}

export const useFetchProducts = ({ access, store }) => {
    return useQuery(['products', store], () => fetchProducts(access, store))
}

const { Panel } = Collapse

const ProductsList = ({ user, selectedStore }) => {
    const { data: categories, status } = useFetchProducts({
        access: user.access,
        store: selectedStore,
    })

    if (status === 'loading') {
        return <Loader />
    }

    return (
        <div className="products-list" key="products">
            {Object.keys(categories).map((category, index) => {
                return (
                    <Collapse
                        accordion={true}
                        key={index}
                        className="rounded-md mb-3"
                        accordion
                        expandIconPosition="right"
                    >
                        <Panel
                            key={index}
                            header={<CategoryName name={category} count={categories[category].length} />}
                        >
                            {categories[category].map((product) => (
                                <div key={product.uuid} className="mb-5">
                                    <ProductListItem product={product} />
                                </div>
                            ))}
                        </Panel>
                    </Collapse>
                )
            })}
        </div>
    )
}

ProductsList.propTypes = {
    user: PropTypes.object.isRequired,
    store: PropTypes.string,
}

export default ProductsList
