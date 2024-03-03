import ProductsFullViewPage from "@/components/products/ProductsFullViewPage";

const InstrumentPage = ({ params }: { params: { id: string } }) => {
  const paramsId: string = params.id;

  return (
    <>
      <ProductsFullViewPage params={paramsId} />
    </>
  );
};

export default InstrumentPage;
