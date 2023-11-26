import React from "react";
import ReactDOM from "react-dom/client";
import MyApp from "./App";
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { App } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyleProvider
    hashPriority="high"
    transformers={[legacyLogicalPropertiesTransformer]}
  >
    <ConfigProvider>
      <App>
        <MyApp />
      </App>
    </ConfigProvider>

    {/* </React.StrictMode> */}
  </StyleProvider>
);
