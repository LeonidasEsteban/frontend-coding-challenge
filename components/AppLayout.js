import { Layout, Menu } from 'antd'
import AuthUser from '@/components/AuthUser'

const { Header, Content, Footer } = Layout

const AppLayout = ({ session, children }) => {
    return (
        <Layout>
            <Layout>
                <Header className="header flex justify-between items-center bg-red-parrot-500">
                    <a className="p4 logo--white">
                        <img className="logo" src="/logo.svg" width={100} />
                    </a>
                    <div className="w-auto flex">
                        <Menu mode="horizontal">
                            <Menu.Item key="products">Productos</Menu.Item>
                        </Menu>
                        <div>
                            <AuthUser session={session} />
                        </div>
                    </div>
                </Header>
                <Content className="p4">
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Parrot ©2022</Footer>
            </Layout>
        </Layout>
    )
}

export default AppLayout
