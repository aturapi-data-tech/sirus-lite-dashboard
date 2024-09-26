

import { Sidebar } from "flowbite-react";
import { Link } from "@inertiajs/react";
import { HiChartPie, HiShoppingBag } from "react-icons/hi";

export default function SideBar() {
    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href={route('dashboard')} icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href={route('RJ.PasienRawatJalan')} icon={HiShoppingBag}>
                        RJ
                    </Sidebar.Item>
                    <Sidebar.Item href={route('RJ.PasienRawatJalanPoli')} icon={HiShoppingBag}>
                        RJ Poli
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                        <Sidebar.Item href="#">Products</Sidebar.Item>
                        <Sidebar.Item href="#">Sales</Sidebar.Item>
                        <Sidebar.Item href="#">Refunds</Sidebar.Item>
                        <Sidebar.Item href="#">Shipping</Sidebar.Item>
                    </Sidebar.Collapse>

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar >
    );
}
