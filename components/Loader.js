import PropTypes from 'prop-types'
import Image from 'next/image'

const Loader = ({ size = 80, label = 'Cargando...' }) => (
    <div className="loader h-full">
        <div className="grid place-content-center w-full h-48">
            <Image src="/loader.svg" alt="loading" title="Cargando" width={size} height={size} />
            <div className="text-gray-500 text-xs text-center mt-4">{label}</div>
        </div>
    </div>
)

Loader.propTypes = {
    size: PropTypes.number,
    label: PropTypes.string,
}

export default Loader
