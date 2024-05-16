import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import "../index.css";

export default function AuthLayout() {
  return (
    <Layout
      style={{
        backgroundColor: "#fff",
      }}
      className="w-full "
    >
      <Outlet />
      <Footer />
    </Layout>
  );
}
