

import { Sidebar } from "flowbite-react";
import { Link } from "@inertiajs/react";
import { HiChartPie, HiShoppingBag } from "react-icons/hi";

export default function SideBar() {
    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={HiChartPie}>
                        <Link href="/dashboard">Dashboard</Link>
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiShoppingBag}>
                        <Link href="/RJ/PasienRawatJalan">RJ</Link>
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
