import HomeNavbar from "@/_components/HomeNavbar/HomeNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HomeNavbar />
      <main className="mx-auto max-w-7xl min-h-dvh">{children}</main>
    </div>
  );
}
