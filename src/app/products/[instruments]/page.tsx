import ProductsByType from "@/components/ProductsByType";

const InstrumentsPage = ({ params }: { params: { instruments: string } }) => {
  const paramsName: string = params.instruments;

  return (
    <>
      <ProductsByType params={paramsName} />
    </>
  );
};

export default InstrumentsPage;
