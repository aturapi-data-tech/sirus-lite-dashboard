

import { Sidebar } from "flowbite-react";
import { Link } from "@inertiajs/react";
import { HiChartPie, HiShoppingBag } from "react-icons/hi";

export default function SideBar() {
    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {/* <Sidebar.Item icon={HiChartPie}> */}
                    <Sidebar.Item icon={HiChartPie} href={route('dashboard')}>RJ All</Sidebar.Item>
                    {/* </Sidebar.Item> */}

                    {/* <Sidebar.Item icon={HiChartPie}> */}
                    <Sidebar.Item icon={HiChartPie} href={route('RJ.PasienRawatJalanPoli')}>Kunjungan Poli</Sidebar.Item>
                    {/* </Sidebar.Item> */}

                    {/* <Sidebar.Item icon={HiChartPie}> */}
                    <Sidebar.Item icon={HiChartPie} href={route('RJ.PasienEMRRawatJalan')}>EMR RJ Harian</Sidebar.Item>
                    {/* </Sidebar.Item> */}

                    {/* <Sidebar.Item icon={HiChartPie}> */}
                    <Sidebar.Item icon={HiChartPie} href={route('RJ.PasienEMRUGD')}>EMR UGD Harian</Sidebar.Item>
                    {/* </Sidebar.Item> */}

                    {/* <Sidebar.Item href={route('RJ.PasienRawatJalan')} icon={HiShoppingBag}>
                        Progress. . .
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                        <Sidebar.Item href="#">Products</Sidebar.Item>
                        <Sidebar.Item href="#">Sales</Sidebar.Item>
                        <Sidebar.Item href="#">Refunds</Sidebar.Item>
                        <Sidebar.Item href="#">Shipping</Sidebar.Item>
                    </Sidebar.Collapse> */}

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar >
    );
}
