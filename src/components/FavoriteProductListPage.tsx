"use client";

import GlobalContext from "@/context/GlobalContext";
import React, { useContext, useEffect } from "react";
import FavoriteProductListCard from "./FavoriteProductListCard";

const FavoriteProductListPage = () => {
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
      <FavoriteProductListCard />
    </>
  );
};

export default FavoriteProductListPage;
