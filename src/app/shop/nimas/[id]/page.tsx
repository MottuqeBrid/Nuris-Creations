import SingleProduct from "../../_components/SingleProduct";
export const metadata = {
  title: "Nima Details",
  description: "Nuri's Creations",
};

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const { params } = await props;
  const { id } = await params;
  return (
    <div>
      <SingleProduct id={id} />
    </div>
  );
}
