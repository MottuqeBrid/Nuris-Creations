import Products from "../_components/Products";
export const metadata = {
  title: "Frocks",
  description: "Nuri's Creations",
};

export default function Page() {
  return (
    <div>
      <h1>Nuri&apos;s Design Frocks</h1>
      <Products page="frocks" />
    </div>
  );
}
