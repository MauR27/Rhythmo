"use client";

import GlobalContext from "@/context/GlobalContext";
import React, { useContext, useEffect } from "react";
import FavoriteProductListCard from "./FavoriteProductListCard";

const FavoriteProductListPage = () => {
  const { setFavoriteProductList } = useContext(GlobalContext);

  useEffect(() => {
    const fetchUserCart = async () => {
      const response = await fetch(
        "http://localhost:3000/api/get-user-favorite-product"
      );
      const userProductsList = await response.json();
      return setFavoriteProductList(userProductsList);
    };
    fetchUserCart();
  }, [setFavoriteProductList]);

  return (
    <>
      <FavoriteProductListCard />
    </>
  );
};

export default FavoriteProductListPage;
