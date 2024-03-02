import ProfilePageCard from "@/components/ProfilePageCard";
import { Box, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  return (
    <>
      <ProfilePageCard />
    </>
  );
};

export default ProfilePage;
