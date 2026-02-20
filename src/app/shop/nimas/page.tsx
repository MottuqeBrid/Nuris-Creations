import Products from "../_components/Products";
export const metadata = {
  title: "Nima Pieces",
  description: "Nuri's Creations",
};

export default function Page() {
  return (
    <div>
      <h1>Nuri&apos;s Design Nimas</h1>
      <Products page="Nimas" />
    </div>
  );
}
