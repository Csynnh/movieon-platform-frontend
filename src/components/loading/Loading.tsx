import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { SpinProps } from "antd/lib/spin";
import React from "react";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loading: React.FC<SpinProps> = ({ children, ...restProps }) => (
  <Spin {...restProps} indicator={antIcon}>
    {children}
  </Spin>
);

export default Loading;
