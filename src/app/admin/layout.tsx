import AdminNavbar from "./_components/AdminNavbar";

export const metadata = {
  title: "Home",
  description: "Nuri's Creations",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <AdminNavbar />
      <main className="max-w-7xl mx-auto min-h-screen">{children}</main>
    </section>
  );
}
