import { createContext, useContext } from "react";
import LayoutStore from "./modules/layout";
import MenuStore from "./modules/menu";
import { observer } from "mobx-react-lite";

const rootStore = {
  layoutStore: LayoutStore,
  menuStore: MenuStore,
};

export { observer };
export const useStore = () => useContext(createContext(rootStore));
