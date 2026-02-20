import SingleFrock from "../_components/SingleFrock";

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const { params } = await props;
  const { id } = params;
  return (
    <div>
      <h1>Single Frock {id}</h1>
      <SingleFrock />
    </div>
  );
}
