import PageLayout from '@/Layouts/PageLayout';
import { Button } from "flowbite-react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import MyCard from './MyCard';
export default function ApiBpjsWSChecking(props) {
    const { auth, signature, refPoliklinik, pesertaNik } = props;
    console.log(pesertaNik);


    return (
        <PageLayout user={auth.user} >
            <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>

                <div className='h-[calc(100vh-100px)] overflow-auto'>

                    <div>{ }</div>

                    {/* <div className='flex justify-center my-2 '>
                        <Button color="blue" onClick={() => { handleButtonGetUrl('Get Antrian') }}>Check Connection </Button>
                    </div> */}

                    <div className='grid grid-cols-2 gap-2'>

                        <MyCard cardName='Get Poliklinik' data={refPoliklinik}>
                            {/* <Button color="info" onClick={() => { handleButtonGetUrl(data.handler, data.url, signature) }}>
                                Check Connection
                                <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button> */}
                        </MyCard>

                        <MyCard cardName='Get Peserta' data={pesertaNik}>
                            {/* <Button color="info" onClick={() => { handleButtonGetUrl(data.handler, data.url, signature) }}>
                                Check Connection
                                <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button> */}
                        </MyCard>

                        <MyCard cardName='Get Poliklinik' data={refPoliklinik}>
                            {/* <Button color="info" onClick={() => { handleButtonGetUrl(data.handler, data.url, signature) }}>
                                Check Connection
                                <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button> */}
                        </MyCard>

                        <MyCard cardName='Get Peserta' data={pesertaNik}>
                            {/* <Button color="info" onClick={() => { handleButtonGetUrl(data.handler, data.url, signature) }}>
                                Check Connection
                                <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button> */}
                        </MyCard>

                        <MyCard cardName='Get Poliklinik' data={refPoliklinik}>
                            {/* <Button color="info" onClick={() => { handleButtonGetUrl(data.handler, data.url, signature) }}>
                                Check Connection
                                <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button> */}
                        </MyCard>

                        <MyCard cardName='Get Peserta' data={pesertaNik}>
                            {/* <Button color="info" onClick={() => { handleButtonGetUrl(data.handler, data.url, signature) }}>
                                Check Connection
                                <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button> */}
                        </MyCard>



                    </div>

                </div>
            </div>

        </PageLayout >

    );
}
