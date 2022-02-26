import { getSession, useSession, signOut } from 'next-auth/react'

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    if (session == null) {
        return {
            redirect: {
                destination: '/login',
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

    if (session === null) {
        return <div>Acceso denegado</div>
    }

    return (
        <div className="container">
            <div>
                <h3>Welcome</h3>
                <div>user: {session.user.email}</div>
                <div>status: {status}</div>
                <button
                    onClick={() =>
                        signOut({
                            callbackUrl: 'http://localhost:3000/login',
                        })
                    }>
                    Log Out
                </button>
            </div>
        </div>
    )
}
