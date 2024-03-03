"use client";

import GlobalContext from "@/context/GlobalContext";
import React, { useContext, useEffect } from "react";
import FavoriteProductsRender from "./FavoriteProductsRender";

const FavoriteProductsRenderPage = () => {
  const { setFavoriteProductList } = useContext(GlobalContext);

  useEffect(() => {
    const fetchFavoriteProduct = async () => {
      const response = await fetch("/api/user/profile/get-favorite-products");
      const userProductsList = await response.json();
      return setFavoriteProductList(userProductsList);
    };
    fetchFavoriteProduct();
  }, [setFavoriteProductList]);

  return (
    <>
      <FavoriteProductsRender />
    </>
  );
};

export default FavoriteProductsRenderPage;
