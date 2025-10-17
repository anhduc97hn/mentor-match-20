import { Grid } from '@mui/material';
import React from 'react';
import FeaturedMentorCard from "./FeaturedMentorCard";

interface Props {
  userProfiles: any;
}

const FeaturedMentorList: React.FC<Props> = ({ userProfiles}) => {

  return (
    <>
      <Grid container spacing={3.5}>
        {/* The 'userProfile' variable inside map is now strongly typed as UserProfile */}
        {userProfiles.map((userProfile: any) => (
          // <Grid key={userProfile._id} size={lg={4} md={4} xs={6}}>
          <Grid key={userProfile._id} size={{lg: 4, md: 4, xs: 6}}>
            <FeaturedMentorCard
              userProfile={userProfile}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FeaturedMentorList;