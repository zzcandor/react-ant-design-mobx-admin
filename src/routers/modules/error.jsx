import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";


// 错误页面模块
const errorRouter = [
  {
    path: "/403",
    element: lazyLoad(lazy(() => import("@/components/ErrorPages/403"))),
  },
  {
    path: "/404",
    element: lazyLoad(lazy(() => import("@/components/ErrorPages/404"))),
  },
  {
    path: "/500",
    element: lazyLoad(lazy(() => import("@/components/ErrorPages/500"))),
  },
];

export default errorRouter;
