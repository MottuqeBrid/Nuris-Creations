import SingleFrock from "../_components/SingleFrock";

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const { params } = await props;
  const { id } = await params;
  return (
    <div>
      <SingleFrock id={id} />
    </div>
  );
}
