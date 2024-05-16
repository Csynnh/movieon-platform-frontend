import { Layout } from "antd";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header.js";
import "../index.css";

export default function MainLayout() {
  return (
    <Layout className="w-full ">
      <Header hasSearch={true} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </Layout>
  );
}
