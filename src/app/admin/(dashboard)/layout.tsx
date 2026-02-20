import AdminSubNavbar from "../_components/AdminSubNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <AdminSubNavbar />
      <main className="max-w-7xl mx-auto min-h-screen">{children}</main>
    </section>
  );
}
