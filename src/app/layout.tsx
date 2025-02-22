import type { Metadata } from "next";
import { Provider } from "jotai";
export const metadata: Metadata = {
  title: "모아용",
  description: "많이 모아용",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={"antialiased"}>{children}</body>
      </Provider>
    </html>
  );
}
