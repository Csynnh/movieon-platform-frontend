import { Layout } from "antd";
import Placeholder from "../components/placeholder/Placeholder.js";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.js";
import "../index.css";
import Footer from "../components/footer/Footer";

export default function MainLayout() {
  return (
    <Layout
      className="w-full "
      style={{
        background: "#fff",
      }}
    >
      <Header hasSearch={true} />
      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
      <Footer />
    </Layout>
  );
}
