import SingleProduct from "../../_components/SingleProduct";

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const { params } = await props;
  const { id } = await params;
  return (
    <div>
      <SingleProduct id={id} />
    </div>
  );
}
