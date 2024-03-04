import ProductsFilterByTypeRender from "@/components/products/ProductsFilterByTypeRender";

const InstrumentsPage = ({ params }: { params: { type: string } }) => {
  const paramsName: string = params.type;

  return (
    <>
      <ProductsFilterByTypeRender params={paramsName} />
    </>
  );
};

export default InstrumentsPage;
