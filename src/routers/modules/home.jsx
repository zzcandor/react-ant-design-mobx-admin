import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";

import LayoutIndex from "@/Layout/MainLayout";

// 首页模块
const homeRouter = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/home",
        element: lazyLoad(lazy(() => import("@/pages/home"))),
      },
    ],
  },
];

export default homeRouter;
