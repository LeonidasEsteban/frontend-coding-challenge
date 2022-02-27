import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, getCsrfToken, getSession } from 'next-auth/react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (session !== null) {
        return {
            redirect: {
                destination: process.env.NEXT_PUBLIC_DASHBOARD_PATH,
                permanent: false,
            },
        }
    }

    const csrfToken = await getCsrfToken(context)

    return {
        props: {
            csrfToken: csrfToken || null,
        },
    }
}

const validationSchema = Yup.object({
    email: Yup.string()
        .max(30, 'Debe tener 30 caracteres o menos')
        .email('Introduzca una dirección de correo electrónico válida')
        .required('Por favor ingresa tu nombre de usuario'),
    password: Yup.string().required('Por favor ingresa tu contraseña'),
})

export const ErrorMessages = ({ errors }) => {
    if (typeof errors === 'string') {
        return <div className="text-red-400 text-xs text-center rounded p-2 mb-3">Datos incorrectos. {errors}</div>
    }

    if (errors) {
        return Object.entries(errors).map(([_, values]) => {
            return (
                <div key={_} className="text-red-400 text-xs text-center rounded p-2 mb-3">
                    Datos incorrectos. {values[0]}
                </div>
            )
        })
    }

    return <div className="p-2 mb-3" />
}

export default function Login({ csrfToken }) {
    const router = useRouter()
    const [errors, setErrors] = useState(null)

    const handleSubmit = async (values) => {
        const response = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            imei: values.imei,
            callbackUrl: `${window.location.origin}/dashboard`,
        })

        if (response?.error) {
            setErrors(response.error)
        } else {
            setErrors(null)
        }

        if (response.url) {
            router.push(response.url)
        }
    }

    return (
        <div className="login">
            <Head>
                <title>Login</title>
            </Head>
            <main className="main">
                <Formik
                    initialValues={{ email: 'desarrollo@kimetrics.com', password: 'KiDdjEe40', imei: 'kimetrics-web' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="bg-red-parrot-500 flex flex-col items-center justify-center min-h-screen shadow-lg h-max py-2">
                                        <div className="bg-white shadow-md rounded px-16 py-24 mb-4 max-w-sm">
                                            <div className="logo mb-12 bg-white w-auto">
                                                <img src="/parrot.svg" alt="Parrot connet" />
                                                <p className="text-xs text-slate-900 px-0">
                                                    El software para los restaurantes de hoy
                                                </p>
                                            </div>

                                            <div className="text-center text-2xl text-slate-900">Iniciar Sesión</div>

                                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                                            <div className="w-xs max-w-xs">
                                                <ErrorMessages errors={errors} />
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    htmlFor="email"
                                                    className="uppercase text-sm text-gray-600 font-bold"
                                                >
                                                    Usuario
                                                    <Field
                                                        name="email"
                                                        aria-label="Introduce tu nombre de usuario"
                                                        aria-required="true"
                                                        type="text"
                                                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                                    />
                                                </label>

                                                <div className="text-red-600 text-xs">
                                                    <ErrorMessage name="email" />
                                                </div>
                                            </div>
                                            <div className="mb-6">
                                                <label
                                                    htmlFor="password"
                                                    className="uppercase text-sm text-gray-600 font-bold"
                                                >
                                                    Contraseña
                                                    <Field
                                                        name="password"
                                                        aria-label="Introduce tu contraseña"
                                                        aria-required="true"
                                                        type="password"
                                                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                                    />
                                                </label>

                                                <div className="text-red-600 text-xs">
                                                    <ErrorMessage name="password" />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <button
                                                    type="submit"
                                                    className="uppercase text-sm font-bold tracking-wide bg-slate-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
                                                >
                                                    {formik.isSubmitting ? 'Por favor espere...' : 'Iniciar sesión'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </>
                        )
                    }}
                </Formik>
            </main>
        </div>
    )
}
