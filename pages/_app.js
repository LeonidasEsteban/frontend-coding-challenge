import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import configureStore from '@/redux/store/configureStore'
import AppLayout from '@/components/AppLayout'

import 'antd/dist/antd.css'

import '../styles/globals.css'
import '../styles/tailwind.css'
import '../styles/antd.theme.css'

const store = configureStore()

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 0, // 5 * 60 * 1000
        },
    },
})

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    if (session) {
        return (
            <SessionProvider session={session}>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <AppLayout session={session}>
                            <Component {...pageProps} />
                        </AppLayout>
                    </QueryClientProvider>
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
