import Head from 'next/head'
import { getSession, useSession } from 'next-auth/react'
import Dashboard from '@/components/Dashboard'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../redux/actions/actions'

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    if (session == null) {
        return {
            redirect: {
                destination: process.env.NEXT_PUBLIC_LOGIN_PATH,
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}

export default function Welcome() {
    const { data: session, status } = useSession()
    const dispatch = useDispatch()

    if (session === null) {
        return <div>Acceso denegado, status: {status}</div>
    }

    useEffect(() => {
        dispatch(setAuthData(session.user))
    }, [session])

    return (
        <div className="container">
            <Head>
                <title>Dashboard</title>
            </Head>
            <Dashboard session={session} />
        </div>
    )
}
