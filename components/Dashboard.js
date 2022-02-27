import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { testAction } from '../redux/actions/actions'

const Dashboard = ({ session }) => {
    const state = useSelector((state) => state.test)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(testAction())
    }

    return (
        <div className="dashboard">
            <h1>Productos</h1>
            <div>Message: {state.message}</div>
            <Button type="primary" onClick={handleClick}>
                Test
            </Button>
        </div>
    )
}

export default Dashboard
