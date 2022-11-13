import { lazy } from "react";
import lazyLoad from "@/routers/utils/lazyLoad";

import LoginIndex from "@/Layout/Login";

// 注册模块
const registerRouter = [
  {
    element: <LoginIndex />,
    children: [
      {
        path: "/register",
        element: lazyLoad(lazy(() => import("@/pages/register"))),
      },
    ],
  },
];

export default registerRouter;
