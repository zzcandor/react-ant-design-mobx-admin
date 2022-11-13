import { makeAutoObservable } from "mobx";


class LayoutStore {
  systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  userTheme = localStorage.getItem("theme");
  theme = this.userTheme || this.systemTheme;
  collapsed= false;
  constructor() {
    makeAutoObservable(this);
  }

  changeTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", this.theme);
  }

  changeCollapsed() {
    this.collapsed = !this.collapsed;
  }
}

export default new LayoutStore();
