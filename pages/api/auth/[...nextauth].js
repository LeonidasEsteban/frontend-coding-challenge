import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const BASE_URL = 'https://lamoderna.kimetrics.com'
const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET
const providers = [
    CredentialsProvider({
        name: 'Credentials',
        authorize: async (credentials) => {
            try {
                const API_URL = `${BASE_URL}/api/v1/login/`
                const payload = {
                    password: credentials.password,
                    email: credentials.email,
                    imei: credentials.imei,
                }
                const options = {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
                const response = await axios.post(API_URL, payload, options)

                if (response.status !== 200) {
                    throw new Error('Invalid user and password!')
                }

                // If not error and we have user data, return it
                if (response.data) {
                    return response
                }

                // Return null if user data could not be retrived
                return null
            } catch (error) {
                if (error.response.status >= 400) {
                    throw new Error(JSON.stringify(error.response.data))
                }

                // Redirecting to the login page with error messsage in the URL
                throw new Error(error.message)
            }
        },
    }),
]

const callbacks = {
    async jwt({ token, user }) {
        if (user?.data) {
            token.user = user.data
        }

        return Promise.resolve(token)
    },

    async session({ session, token }) {
        session.user = token.user
        return Promise.resolve(session)
    },
}

const options = {
    debug: process.env.NODE_ENV === 'development',
    session: {
        jwt: false,
        maxAge: 60 * 15, // 15 min
    },
    jwt: {
        secret: AUTH_JWT_SECRET,
    },
    providers,
    callbacks,
    pages: {
        error: '/login', // Changing the error redirect page to our custom login page
    },
}

export default (req, res) => NextAuth(req, res, options)
