import MentorPageClient from '@/src/pages/Public/MentorDetail/MentorPage';

// app/mentors/[mentorId]/page.tsx
import { getMentorProfileServer } from '@/src/data/user'; // Import the new server utility
// import MentorClientContent from './MentorClientContent';
import { Avatar, Box, Button, Card, Container, Divider, Stack, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import NotFoundPage from '@/src/app/not-found'; // Adjust path
import LoadingScreen from '@/src/components/LoadingScreen'; // Adjust path
import { fData } from '@/src/utils/numberFormat'; // Adjust path
import { fDateToMonthYear } from '@/src/utils/formatTime'; // Adjust path
// NOTE: uuseAuth/Redux imports are removed here

interface MentorRouteParams {
  params: {
    mentorId: string;
  };
}

export default async function MentorPageRSC({ params }: MentorRouteParams) {
  const { mentorId } = params;

  // 1. Fetch data on the server
  // You might want to display a loading screen if the server takes long,
  // but for a single fetch, just waiting for the promise to resolve is typical.
  const mentorProfile = await getMentorProfileServer(mentorId);

  // 2. Handle 404
  if (!mentorProfile) {
    // You'd typically return the Next.js not-found() function or a custom 404 component
    return <NotFoundPage />;
  }

  // 3. Format data (better done on the server)
  const formattedCreatedAt = fDateToMonthYear(mentorProfile.createdAt);
  const formattedReviewAverageRating = mentorProfile.reviewAverageRating ? fData(mentorProfile.reviewAverageRating) : 'N/A';

  // NOTE: You'll need to fetch currentUserProfileId via a server-side method
  // (e.g., from cookies or session) if you need it for the 'Request a Call' button.
  // We'll keep it simple here and assume this check moves to the client.
  // For now, removing `useAuth` from the server component.

  return (
    <Container
      className="mentor-page"
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 4. Profile Header (Static/RSC part) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '90vw', md: '50vw' },
          gap: 3,
          mt: 5,
          mb: 2,
        }}
      >
        <Avatar sx={{ width: '100px', height: '100px' }} src={mentorProfile.avatarUrl as string} alt={mentorProfile.name} />
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {mentorProfile.name}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          {mentorProfile.currentPosition} at {mentorProfile.currentCompany}
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={{ xs: 2, md: 5 }} divider={<Divider orientation="vertical" flexItem />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon color="primary" />
            <Typography variant="subtitle2">{mentorProfile.city}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <LanguageIcon color="primary" />
            <Typography variant="subtitle2">Vietnamese, English</Typography>
          </Stack>
          <Typography variant="subtitle2" alignItems="center">
            Joined {formattedCreatedAt}
          </Typography>
        </Stack>
        <Card
          sx={{
            width: '100%',
            bgcolor: 'transparent',
            borderRadius: 1,
            border: '1px solid #F3F4F6',
          }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" sx={{ p: 2 }} spacing={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="success.main">
                Free
              </Typography>
              <Typography variant="body2">Price per hour</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="success.main">
                1 hour
              </Typography>
              <Typography variant="body2">Cancel anytime</Typography>
            </Box>
            <Stack alignItems="center">
              <Stack direction="row" alignItems="center">
                <StarIcon sx={{ color: 'primary.main', mr: 0.5 }} />
                <Typography variant="h5">{formattedReviewAverageRating}</Typography>
              </Stack>
              <Typography variant="body2">
                {mentorProfile.reviewCount} reviews / {mentorProfile.sessionCount} sessions
              </Typography>
            </Stack>
          </Stack>
        </Card>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" sx={{ width: '100%' }} spacing={2}>
          {/* NOTE: Moved social icons and 'Request a Call' logic to the Client Component
               as they often involve auth/client interaction/href construction */}
        </Stack>
      </Box>
      {/* <Divider sx={{ border: 1, width: '100%', borderColor: 'divider' }} /> */}

      {/* 5. Client Component Wrapper (Client-side interactivity) */}
      <MentorPageClient mentorProfile={mentorProfile} mentorId={mentorId} />
    </Container>
  );
}
