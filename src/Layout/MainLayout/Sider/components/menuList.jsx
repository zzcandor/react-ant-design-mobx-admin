import React, { useCallback, useEffect, useState } from "react";
import { Menu, message, Spin } from "antd";
import * as Icons from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { request } from "@/utils/request";
import { useStore, observer } from "@/store";

const menuStyles = { height: "100%", borderRight: 0 };

// 定义侧边类型
function getItem(
  label,
  key,
  icon,
  children,
  type
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function MenuList() {
  const { menuStore } = useStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const { isLoading, isError } = useQuery(
    "menuList",
    () => request.get("/menu/list").then((res) => res.data.data),
    {
      onSuccess: (data) => {
        menuStore.setMenuData(data);
        menuStore.setMenuList(deepLoopFloat(data));
      },
      onError: () => {
        window.localStorage.removeItem("auth-token");
        message.error("获取菜单列表失败！");
      },
    }
  );

  // 动态渲染 Icon 图标
  const customIcons = Icons;
  const addIcon = (name) => {
    return React.createElement(customIcons[name]);
  };

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = useCallback(
    (menuList, newArr = []) => {
      menuList.forEach((item) => {
        if (!item.children?.length) {
          return newArr.push(
            getItem(item.title, item.path, addIcon(item.icon))
          );
        }
        newArr.push(
          getItem(
            item.title,
            item.path,
            addIcon(item.icon),
            deepLoopFloat(item.children)
          )
        );
      });
      return newArr;
    },
    []
  );

  // const getMenuItem = async () => {
  //   setLoading(true);
  //   try {
  //     const data: { code: number; data } = await getMenuList();
  //     if (data.code === 401) {
  //       message.error("登录信息失效，请重新登录！");
  //       navigate("/login");
  //     } else if (data.code !== 200) {
  //       message.error("获取菜单列表失败！");
  //       return;
  //     }
  //     menuStore.setMenuData(data.data);
  //     menuStore.setMenuList(deepLoopFloat(data.data));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onClick= useCallback(
    ({ key }) => {
      navigate(key);
    },
    []
  );

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <Menu
        theme="light"
        onClick={onClick}
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={["/home"]}
        style={menuStyles}
        items={menuStore.menuList}
        className="menu"
      />
    </Spin>
  );
}

export default observer(MenuList);
