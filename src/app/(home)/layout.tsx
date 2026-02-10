import HomeNavbar from "@/components/HomeNavbar/HomeNavbar";

export const metadata = {
  title: "Home",
  description: "Nuri's Creations",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <HomeNavbar />
      <main className="max-w-7xl mx-auto min-h-screen">{children}</main>
    </section>
  );
}
