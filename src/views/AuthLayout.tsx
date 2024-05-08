import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header.js";
import "../index.css";

export default function AuthLayout() {
  return (
    <Layout
      style={{
        backgroundColor: "#fff",
      }}
      className="w-full "
    >
      <Header hasSearch={false} />
      <Outlet />
      <Footer />
    </Layout>
  );
}
