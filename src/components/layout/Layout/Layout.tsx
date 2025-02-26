import { ReactNode } from "react"
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

interface LayoutProps {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};