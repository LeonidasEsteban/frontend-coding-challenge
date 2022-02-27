import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { testAction } from '../redux/actions/actions'

const Dashboard = () => {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(testAction())
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div>Access: {auth.access}</div>
            <Button type="primary" onClick={handleClick}>
                Test
            </Button>
        </div>
    )
}

export default Dashboard
