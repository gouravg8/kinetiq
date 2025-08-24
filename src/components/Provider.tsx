"use client";

import themeAtom from "@/Jotai/themeAtom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { Provider, useAtomValue } from "jotai";
import React from "react";
import { Toaster } from "sonner";
import Header from "./ui/Header";

const Providers = ({ children }: { children: React.ReactNode }) => {
	const isDark = useAtomValue(themeAtom);
	const algorithm = isDark === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm;
	const tokens = theme.getDesignToken({ algorithm });

	const queryClient = new QueryClient();
	return <Provider>
		<ConfigProvider theme={{
			token: {
				...tokens,
				colorPrimary: "#efb100",
				colorTextLightSolid: "black"
			},
			algorithm: theme.darkAlgorithm
		}}>
			<QueryClientProvider client={queryClient}>
				<Header />
				{children}
				<Toaster position="top-center" richColors />
			</QueryClientProvider>
		</ConfigProvider>
	</Provider>;
};

export default Providers;
