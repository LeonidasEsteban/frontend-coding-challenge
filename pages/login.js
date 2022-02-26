import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, getCsrfToken } from 'next-auth/react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}

const validationSchema = Yup.object({
    email: Yup.string()
        .max(30, 'Debe tener 30 caracteres o menos')
        .email('Respuesta de nombre de usuario inválido')
        .required('Por favor ingresa tu nombre de usuario'),
    password: Yup.string().required('Por favor ingresa tu contraseña'),
})

export default function Login({ csrfToken }) {
    const router = useRouter()
    const [error, setError] = useState(null)

    const handleSubmit = async (values, { setSubmitting }) => {
        const response = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            imei: values.imei,
            callbackUrl: `${window.location.origin}/welcome`,
        })
        console.log(response)
        if (response?.error) {
            setError(response.error)
        } else {
            setError(null)
        }

        if (response.url) {
            router.push(response.url)
        }

        setSubmitting(false)
    }

    return (
        <div className="login">
            <Head>
                <title>App | Login</title>
            </Head>
            <main className="main">
                <Formik
                    initialValues={{ email: 'desarrollo@kimetrics.com', password: 'KiDdjEe40', imei: 'kimetrics-web' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit}>
                            <div className="bg-red-400 flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
                                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                                    <div className="text-red-400 text-md text-center rounded p-2">{error}</div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="uppercase text-sm text-gray-600 font-bold">
                                            Usuario
                                            <Field
                                                name="email"
                                                aria-label="Introduce tu nombre de usuario"
                                                aria-required="true"
                                                type="text"
                                                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                            />
                                        </label>

                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="email" />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="password" className="uppercase text-sm text-gray-600 font-bold">
                                            Contraseña
                                            <Field
                                                name="password"
                                                aria-label="Introduce tu contraseña"
                                                aria-required="true"
                                                type="password"
                                                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                            />
                                        </label>

                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="password" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <button
                                            type="submit"
                                            className="uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150">
                                            {formik.isSubmitting ? 'Por favor espere...' : 'Iniciar sesión'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </main>
        </div>
    )
}
