import { makeAutoObservable } from "mobx";

class MenuStore {
  menuList = [];
  menuData = [];
  tabList = [];
  constructor() {
    makeAutoObservable(this);
    this.resetTab();
  }

  setMenuList(menuList) {
    this.menuList = menuList;
  }

  setMenuData(menuData) {
    this.menuData = menuData;
  }

  getMenuByPath(path) {
    const dfs = (
      menu,
      path
    ) => {
      for (const item of menu) {
        if (item.path === path) {
          return item;
        }
        if (item.children) {
          const res = dfs(item.children, path);
          if (res) {
            return res;
          }
        }
      }
    };
    return dfs(this.menuData, path);
  }

  addTab(pathname) {
    const menu = this.getMenuByPath(pathname);
    this.tabList.push({
      label: menu?.title || pathname,
      path: pathname,
      key: pathname,
    });
  }

  removeTab(tabPath) {
    if (this.tabList.length === 1) return;
    this.tabList = this.tabList.filter((item) => item.path !== tabPath);
  }

  setTbaList(list) {
    this.tabList = list;
  }

  resetTab() {
    this.tabList = [
      { label: "首页", path: "/home", key: "/home", closable: false },
    ];
  }
}

export default new MenuStore();
