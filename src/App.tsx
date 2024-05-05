import router from "./routes.js";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
const queryClient = new QueryClient();

export default function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#0b2447" } }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />{" "}
      </QueryClientProvider>
    </ConfigProvider>
  );
}
