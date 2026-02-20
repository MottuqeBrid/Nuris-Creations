import Products from "../_components/Products";
export const metadata = {
  title: "Others",
  description: "Nuri's Creations",
};

export default function Page() {
  return (
    <div>
      <h1>Nuri&apos;s Design Others</h1>
      <Products page="Others" />
    </div>
  );
}
