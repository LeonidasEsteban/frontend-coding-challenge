import { SessionProvider } from 'next-auth/react'

import '../styles/globals.css'
import '../styles/tailwind.css'

import 'antd/dist/antd.css'
import '../styles/antd.theme.css'

import { Provider } from 'react-redux'
import configureStore from '@/redux/store/configureStore'
import AppLayout from '@/components/AppLayout'

const store = configureStore()

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    if (session) {
        return (
            <SessionProvider session={session}>
                <Provider store={store}>
                    <AppLayout session={session}>
                        <Component {...pageProps} />
                    </AppLayout>
                </Provider>
            </SessionProvider>
        )
    }

    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp
