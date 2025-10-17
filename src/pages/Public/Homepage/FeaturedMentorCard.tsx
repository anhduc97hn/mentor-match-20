import { Avatar, Box, Link as MUILink, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { UserProfile } from "@/src/types/user";


// Define the type for the component's props.
interface Props {
  userProfile: UserProfile;
}

const FeaturedMentorCard: React.FC<Props> = ({ userProfile }) => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        src={userProfile.avatarUrl as string}
        alt={userProfile.name}
        sx={{ width: "80px", height: "80px" }}
      />
      <MUILink
        variant="subtitle1"
        color="text.primary"
        component={Link}
        sx={{ fontWeight: 600, mt: 1, textAlign: "center" }} // Added margin-top and text-align for better spacing
        href={`/mentors/${userProfile._id}`}
      >
        {userProfile.name}
      </MUILink>
      <Typography
        variant="body2" // Using body2 for smaller text might be more suitable
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        {userProfile.currentPosition} at {userProfile.currentCompany}
      </Typography>
    </Box>
  );
}

export default FeaturedMentorCard;