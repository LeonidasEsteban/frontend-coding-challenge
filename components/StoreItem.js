import { Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const { Option } = Select

const StoreItem = ({ stores: { data, ui } }) => {
    const { stores = [] } = data

    if (ui.loading) {
        return <LoadingOutlined />
    }

    return (
        <div className="text-white">
            <Select loading={ui.loading} defaultValue={stores[0]?.name}>
                {stores.length > 0 &&
                    stores.map((store) => {
                        return (
                            <Option key={store.uuid} value="lucy">
                                {store.name}
                            </Option>
                        )
                    })}
            </Select>
        </div>
    )
}

StoreItem.propTypes = {
    data: PropTypes.object,
    ui: PropTypes.object,
}

export default StoreItem
