import ItemById from "@/components/ItemById";

const InstrumentPage = ({ params }: { params: { id: string } }) => {
  const paramsId: string = params.id;

  return (
    <>
      <ItemById params={paramsId} />
    </>
  );
};

export default InstrumentPage;
