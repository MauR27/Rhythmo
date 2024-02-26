import SearchProducts from "@/components/SearchProducts";
import React from "react";

const SearchProductsPage = ({ params }: { params: { name: string } }) => {
  const paramsName: string = params.name;

  return (
    <>
      <SearchProducts params={paramsName} />
    </>
  );
};

export default SearchProductsPage;
