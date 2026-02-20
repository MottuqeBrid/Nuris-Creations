import Products from "../_components/Products";
export const metadata = {
  title: "Blouse Pieces",
  description: "Nuri's Creations",
};

export default function Page() {
  return (
    <div>
      <h1>Nuri&apos;s Design Blouses</h1>
      <Products page="Blouses" />
    </div>
  );
}
