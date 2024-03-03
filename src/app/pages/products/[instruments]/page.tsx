import ProductsFilterByTypeRender from "@/components/products/ProductsFilterByTypeRender";

const InstrumentsPage = ({ params }: { params: { instruments: string } }) => {
  const paramsName: string = params.instruments;

  return (
    <>
      <ProductsFilterByTypeRender params={paramsName} />
    </>
  );
};

export default InstrumentsPage;
