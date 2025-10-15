'use client'

import { Avatar, Box, Button, Card, Container, Divider, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link as RouterLink, useParams } from 'react-router-dom';
import MentorBioProfile from './MentorBioProfile';
import MentorBioEducation from './MentorBioEducation';
import MentorBioExperience from './MentorBioExperience';
import MentorBioCertificate from './MentorBioCertificate';
import MentorBioReviews from './MentorBioReviews';
import StarIcon from '@mui/icons-material/Star';
import './MentorPage.css';
import { getSingleUserProfile } from '../../../slices/userProfileSlice';
import LoadingScreen from '../../../components/LoadingScreen';
import NotFoundPage from '../NotFoundPage';
import { fData } from '../../../utils/numberFormat';
import { fDateToMonthYear } from '../../../utils/formatTime';
import useAuth from '../../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { UserProfile, IMentorProfile } from '@/src/types/user';
import Link from 'next/link';

// Route Parameter type
// interface MentorRouteParams {
//   params: {
//     mentorId: string;
//   };
// }

// Tab definition type
interface MentorTab {
  value: string;
  component: React.ReactNode;
  icon?: React.ReactElement;
}

interface MentorPageProps {
mentorProfile: IMentorProfile,
mentorId: string 
}
// --- Component ---

const MentorPage: React.FC<MentorPageProps> = ({ mentorProfile, mentorId }) => {
  const { userProfile } = useAuth();
  const currentUserProfileId = userProfile?._id;

  // const params = useParams();
  // const userProfileId = params.mentorId;

  const dispatch = useAppDispatch();
  const { selectedUser, isLoading } = useAppSelector(state => state.userProfile);

  const [currentTab, setCurrentTab] = useState<string>('Profile');
 // const mentorProfile = selectedUser as IMentorProfile;


  // Type the tab configuration array
  const MENTOR_TABS: MentorTab[] = [
    {
      value: 'Profile',
      component: <MentorBioProfile selectedUser={mentorProfile} />,
    },
    {
      value: 'Education',
      component: <MentorBioEducation selectedUser={mentorProfile} />,
    },
    {
      value: 'Experience',
      component: <MentorBioExperience selectedUser={mentorProfile} />,
    },
    {
      value: 'Certificate',
      component: <MentorBioCertificate selectedUser={mentorProfile} />,
    },
    {
      value: `Reviews (${mentorProfile?.reviewCount || 0})`,
      component: <MentorBioReviews selectedUser={mentorProfile} />,
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  // useEffect(() => {
  //   if (mentorId) {
  //     dispatch(getSingleUserProfile(mentorId));
  //   }
  // }, [dispatch, mentorId]);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  // if (!mentorProfile) {
  //   // Render NotFoundPage only after loading is complete and user is still not found
  //   return <NotFoundPage />;
  // }

  // Moved formatting logic inside the return statement to ensure selectedUser is not null
  // const formattedCreatedAt = fDateToMonthYear(mentorProfile.createdAt);
  // const formattedReviewAverageRating = mentorProfile.reviewAverageRating ? fData(mentorProfile.reviewAverageRating) : 'N/A';

  return (
     <>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" sx={{ width: '100%', maxWidth: '50vw', my: 2 }} spacing={2}>
            <Button 
                variant="contained" 
                component={Link} 
                href={`/mentors/${mentorId}/session`} 
                disabled={currentUserProfileId === mentorId} // Check for current user ID
                sx={{ width: { xs: '100%', md: 'auto' } }}
            >
                Request a Call
            </Button>
            <Stack direction="row" spacing={1}>
                <IconButton component="a" href={mentorProfile.linkedinLink} target="_blank" color="primary">
                    <LinkedInIcon />
                </IconButton>
                <IconButton component="a" href={mentorProfile.twitterLink} target="_blank" color="primary">
                    <TwitterIcon />
                </IconButton>
                <IconButton component="a" href={mentorProfile.instagramLink} target="_blank" color="primary">
                    <InstagramIcon />
                </IconButton>
                <IconButton component="a" href={mentorProfile.facebookLink} target="_blank" color="primary">
                    <FacebookIcon />
                </IconButton>
            </Stack>
        </Stack>
        <Tabs value={currentTab} scrollButtons="auto" variant="scrollable" allowScrollButtonsMobile onChange={handleTabChange}>
            {MENTOR_TABS.map(tab => (
                <Tab disableRipple key={tab.value} label={tab.value} icon={tab.icon} value={tab.value} />
            ))}
        </Tabs>
        <Box sx={{ bgcolor: 'primary.light', width: '100%', flexGrow: 1, p: { xs: 1, md: 5 } }}>
            {MENTOR_TABS.map(tab => {
                const isMatched = tab.value === currentTab;
                return (
                    isMatched && (
                        <Card key={tab.value} sx={{ mx: 'auto', maxWidth: '800px', p: 2 }}>
                            {tab.component}
                        </Card>
                    )
                );
            })}
        </Box>
    </>
  );
};

export default MentorPage;
