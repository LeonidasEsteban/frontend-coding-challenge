import PropTypes from 'prop-types'
import { Avatar, Dropdown, Menu } from 'antd'
import { DownOutlined, LoadingOutlined } from '@ant-design/icons'
import { signOut } from 'next-auth/react'

const UserItem = ({ stores }) => {
    const { data, ui } = stores

    const handleClick = () => {
        signOut({
            callbackUrl: process.env.NEXT_PUBLIC_LOGIN_PATH,
        })
    }

    if (ui.loading) {
        return <LoadingOutlined />
    }

    const menu = (
        <Menu>
            <Menu.Item key="user">
                <div className="text-sm text-slate-900">{data.username}</div>
            </Menu.Item>
            <Menu.Item key="close" danger onClick={handleClick}>
                <div className="text-xs">Cerrar sesión</div>
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={menu} trigger="click">
            <a className="ant-dropdown-link text-white hover:text-yellow-50" type="link">
                <span className="flex items-center">
                    <Avatar src={<img src="https://joeschmoe.io/api/v1/random" className="w-2" />} />
                    <DownOutlined />
                </span>
            </a>
        </Dropdown>
    )
}

UserItem.propTypes = {
    session: PropTypes.object,
}

export default UserItem
