"use client";

import { Box, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    <Box>
      <Text>{user?.name}</Text>
    </Box>
  );
};

export default ProfilePage;
