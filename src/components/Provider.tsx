"use client";

import { ConfigProvider, theme } from "antd";
import { Provider } from "jotai";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <Provider>
		<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
			{children}
		</ConfigProvider>
	</Provider>;
};

export default Providers;
