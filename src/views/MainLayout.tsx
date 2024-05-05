import { AppLayout } from "@hilla/react-components/AppLayout.js";
import Placeholder from "../components/placeholder/Placeholder.js";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.js";
import "../index.css";
import Footer from "../components/footer/Footer";

export default function MainLayout() {
  return (
    <AppLayout primarySection="drawer" className="w-full ">
      <Header hasSearch={true} />
      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
      <Footer />
    </AppLayout>
  );
}
