import FooterPage from "@/_components/Footer/FooterPage";
import HomeNavbar from "@/_components/HomeNavbar/HomeNavbar";

export const metadata = {
  title: "Home",
  description: "Nuri's Creations",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <HomeNavbar />
      <main className="max-w-7xl mx-auto min-h-screen">{children}</main>
      <FooterPage />
    </section>
  );
}
