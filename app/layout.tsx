import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "@/components/Header";
import { Box } from "@mui/material";
import { GlobalProvider } from "./context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To-Do App - Manage Your Tasks & Projects Efficiently",
  description:
    "Create and manage tasks effortlessly with our Jira-inspired to-do app. Stay organized, track progress, and boost productivity with powerful project management features. Try it now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalProvider>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            <Header />
            <Box paddingTop={"65px"}>{children}</Box>
          </ThemeProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
