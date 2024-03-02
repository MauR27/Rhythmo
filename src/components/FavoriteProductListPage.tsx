"use client";

import GlobalContext from "@/context/GlobalContext";
import React, { useContext, useEffect } from "react";
import FavoriteProductListCard from "./FavoriteProductListCard";

const FavoriteProductListPage = () => {
  const { setFavoriteProductList } = useContext(GlobalContext);

  useEffect(() => {
    const fetchFavoriteProduct = async () => {
      const response = await fetch("/api/get-user-favorite-product");
      const userProductsList = await response.json();
      return setFavoriteProductList(userProductsList);
    };
    fetchFavoriteProduct();
  }, [setFavoriteProductList]);

  return (
    <>
      <FavoriteProductListCard />
    </>
  );
};

export default FavoriteProductListPage;
