import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from "@ant-design/cssinjs";
import { ConfigProvider, App } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import MyApp from "./App";

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
