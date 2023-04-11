import "./globals.css";

export const metadata = {
  title: "Search Demo App",
  description: "How to use Foundry APIs to create a search feature in your app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
