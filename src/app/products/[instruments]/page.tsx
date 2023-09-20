"use client";
import { Box } from "@chakra-ui/react";

const page = ({ params }: { params: { instruments: string } }) => {
  return <Box>{params.instruments}</Box>;
};

export default page;
