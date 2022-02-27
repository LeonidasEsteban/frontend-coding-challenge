import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { signOut } from 'next-auth/react'

const AuthUser = ({ session }) => {
    const { user } = session

    const handleClick = () => {
        signOut({
            callbackUrl: process.env.NEXT_PUBLIC_LOGIN_PATH,
        })
    }

    const menu = (
        <Menu>
            <Menu.Item key="user">
                <div className="text-sm text-slate-900">
                    {user.first_name} ({user.email})
                </div>
            </Menu.Item>
            <Menu.Item key="close" danger onClick={handleClick}>
                <div className="text-xs">Cerrar sesión</div>
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={menu} trigger="click">
            <Button className="ant-dropdown-link text-white hover:text-yellow-50" type="link">
                <span className="flex items-center">
                    <Avatar src={<img src="https://joeschmoe.io/api/v1/random" className="w-2" />} />
                    <DownOutlined />
                </span>
            </Button>
        </Dropdown>
    )
}

AuthUser.propTypes = {
    session: PropTypes.object,
}

export default AuthUser
