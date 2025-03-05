import type { Metadata } from "next";
import TanstackProviders from "src/_lib/tanstackProviders";
import 'src/app/globals.css';

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
      <body className={"antialiased"}>
        <TanstackProviders>
          {children}
        </TanstackProviders>
      </body>
    </html>
  );
}
