import { Link, Head } from '@inertiajs/react';

import {
    Navbar,
    NavbarBrand,

    Footer,
    FooterCopyright,
    FooterDivider,
} from "flowbite-react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const snipet = 'siRUS DashBoard Monitoring System';
    return (
        <>
            <Head title="Welcome" />
            <div className='mx-20'>
                <Navbar fluid rounded>
                    <NavbarBrand href={route('login')}>
                        <div className='grid justify-center grid-cols-1'>
                            <img src="/favicon.svg" className="h-16 mr-3 sm:h-16" alt="siRUS Logo" />
                            <span className="self-center text-xl font-semibold text-center text-gray-700 whitespace-nowrap dark:text-white">
                                {snipet}
                            </span>
                        </div>
                    </NavbarBrand>


                    <div class="hidden w-full md:block md:w-auto" id="navbar-default">

                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </Link>

                                {/* <Link
                                    href={route('register')}
                                    className="font-semibold text-gray-600 ms-4 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link> */}
                            </>
                        )}

                    </div>


                </Navbar>

                <section class="w-full h-[calc(100vh-325px)] bg-green-500 px-4 pt-0 rounded-t-lg">

                    <div class="flex justify-between max-w-screen-xl gap-8 px-4 mx-auto">
                        <div class="mr-auto place-self-center">
                            <h1
                                class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl xl:text-6xl dark:text-white">
                                Selamat Datang
                            </h1>
                            <p class="max-w-2xl mb-8 text-xl font-light text-white md:text-lg dark:text-gray-400">
                                <span class="font-bold">SIRus (Sistem Informasi Rumah Sakit dan E-Rekam Medis)</span>
                                <br />
                                <br />
                                Sirus adalah sistem monitoring canggih yang menjaga keamanan dan integritas data rekam medis Anda. Dengan Sirus, Anda dapat memantau setiap aktivitas pada sistem rekam medis Anda secara real-time, sehingga data pasien selalu terlindungi dan dapat diakses kapan saja dibutuhkan.
                            </p>



                        </div>

                        <div class="my-4">
                            {/* <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_Zus25A5BNo.json"
                                background="transparent" speed="1" style="width: 500px; height: 400px;" loop autoplay>
                            </lottie-player> */}

                            <img src="/Logogram black 7_.svg" className="mr-3 h-96" alt="siRUS Logo" />

                        </div>
                    </div>
                </section>

                <Footer container>
                    <div className="w-full text-center">
                        {/* <FooterDivider /> */}
                        <FooterCopyright href="#" by={snipet} year={2024} />
                    </div>
                </Footer>

            </div>

        </>
    );
}
