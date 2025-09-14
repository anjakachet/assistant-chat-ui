// app/layout.js
export const metadata = {
  title: "Assistant Chat",
  description: "Chat with an AI assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
