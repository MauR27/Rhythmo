import ProductsByTypeCard from "@/components/ProductsByTypeCard";

const InstrumentsPage = ({ params }: { params: { instruments: string } }) => {
  const paramsName: string = params.instruments;

  return (
    <>
      <ProductsByTypeCard params={paramsName} />
    </>
  );
};

export default InstrumentsPage;
