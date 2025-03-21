import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.scss";
import { GlobalProvider } from "@/context/GlobalContext";

const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Practice",
  description: "Call and response music practice: listen to the melody, then play it back.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body className={`bg-neutral-950 ${font.className}`}>
          <a href="https://github.com/nth-chile/music-practice" target="_blank" aria-label="github" className="text-color absolute top-0 right-0 p-4">
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" version="1.0" viewBox="0 0 240 240"><path d="M97 9.9c-30.5 6.8-55.5 23.7-72.7 49.3C-5.8 104.3.2 164.8 38.6 203.4c11.5 11.6 29 22.8 42.2 27.1 4.9 1.6 5.5 1.6 7.7.1 2.4-1.6 2.5-2 2.5-13.5v-11.8l-8.8.5c-10.3.5-18.3-1.3-23.1-5.4-1.7-1.4-5-6.2-7.3-10.6-3.8-7.4-6.6-10.8-14.4-17.7-2.6-2.3-2.7-2.4-.9-3.7 4.3-3.2 13-.1 18.5 6.5 9.6 11.7 13.3 14.8 18.8 16 4.9 1 9.4.6 16.2-1.4.9-.3 2.1-2.4 2.7-4.8.6-2.3 2.2-5.8 3.5-7.7l2.4-3.5-8.1-1.6c-17-3.5-27.5-9.6-34.4-20-6.4-9.6-8.5-17.9-8.6-33.4 0-14.6 1.6-20.6 7.9-28.8 2.8-3.6 3.1-4.7 2.3-6.8-1.5-3.6-1.1-18.8.5-23.4 1.3-3.4 2-4 4.7-4.3 4.5-.5 12.9 2.4 21.4 7.2l7.3 4.2 6.4-1.5c9.1-2.1 36.4-2 44.6 0l6.2 1.6 5.8-3.5c7.7-4.6 17.5-8.2 22.4-8.2 3.9 0 3.9.1 5.5 5.2 1.7 5.9 2 16.6.5 21.7-.8 3-.6 3.9 1.6 6.8 10.9 14.4 12.1 38.3 2.9 57.9-6.2 12.9-19.3 21.9-36.9 25.2l-8.4 1.6 3.1 5.5 3.2 5.6.3 22.3.4 22.3 2.5 1.6c2.3 1.5 2.8 1.5 7.6-.2 8-2.7 21.7-10.1 29.2-15.8 44.6-33.4 59-93.3 34.3-143.1-14.5-29.3-41.9-51.8-73.3-60.2C135.8 7.8 110 7 97 9.9z" /></svg>
          </a>
          {children}</body>
      </html>
    </GlobalProvider>
  );
}
