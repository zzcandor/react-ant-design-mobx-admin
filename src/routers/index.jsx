import { Navigate,  useRoutes } from "react-router-dom";

// * 动态导入router
const modules = import.meta.glob("./modules/*.jsx", { eager: true });

// * 将所有路由存放到数组里
export const routerArray = [];
Object.keys(modules).forEach((item) => {
  routerArray.push(...modules[item]["default"]);
});

export const rootRouter = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  ...routerArray,
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];

export default function Router() {
  return useRoutes(rootRouter);
}
