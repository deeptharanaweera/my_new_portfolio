import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PortfolioLayout from "@/components/PortfolioLayout";
import "./globals.css";

export const metadata = {
  title: "Deeptha Ranaweera | Software Engineerra",
  description: "Modern portfolio website showcasing full stack engineering, AI integrations, projects, and case studies",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <PortfolioLayout>
              {children}
            </PortfolioLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
