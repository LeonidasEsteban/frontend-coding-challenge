import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from 'antd'
import UserItem from '@/components/UserItem'
import StoreItem from '@/components/StoreItem'
import { getMyStores } from '@/redux/actions/actions'

const { Header, Content, Footer } = Layout

const AppLayout = ({ session, children }) => {
    const dispatch = useDispatch()
    const stores = useSelector((state) => state.stores)

    useEffect(() => {
        dispatch(getMyStores())
    }, [session])

    return (
        <Layout>
            <Header className="header flex justify-between items-center bg-red-parrot-500">
                <div className="w-auto flex items-center">
                    <a className="p4 logo--white mr-8">
                        <img className="logo" src="/logo.svg" width={100} />
                    </a>
                    <StoreItem stores={stores} />
                </div>
                <UserItem session={session} stores={stores} />
            </Header>
            <Content className="site-layout-background">{children}</Content>
            <Footer style={{ textAlign: 'center' }}>Parrot ©2022</Footer>
        </Layout>
    )
}

export default AppLayout
