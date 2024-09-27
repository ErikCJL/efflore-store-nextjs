async function EditProductPage({ params }: { params: { id: string } }) {
  console.log(params);
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded"></div>
    </section>
  );
}
export default EditProductPage;
