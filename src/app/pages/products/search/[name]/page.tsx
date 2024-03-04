import ProductsFilterBySearchingRender from "@/components/products/ProductsFilterBySearchingRender";
import React from "react";

const SearchProductsPage = ({ params }: { params: { name: string } }) => {
  const paramsName: string = params.name;

  return (
    <>
      <ProductsFilterBySearchingRender params={paramsName} />
    </>
  );
};

export default SearchProductsPage;
