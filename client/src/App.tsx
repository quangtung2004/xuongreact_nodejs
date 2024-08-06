import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClientLayout from "./layouts/ClientLayout";
import Cart from "./pages/Cart";
import Homepage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/admin/product/Add";
import ListProduct from "./pages/admin/product/List";
import EditProduct from "./pages/admin/product/Edit";
import Orders from "./pages/Orders";


const routeConfig = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "products/list",
        element: <ListProduct />,
      },
      {
        path: "products/add",
        element: <AddProduct />,
      },
      {
        path: "products/edit/:id",
        element: <EditProduct />,
      },
    ],
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
];

function App() {
  const routes = useRoutes(routeConfig);

  return <main>{routes}</main>;
}

export default App;
