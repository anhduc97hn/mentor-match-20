'use client';

import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import './HomePage.css'; // Assuming this CSS file doesn't need TSX specific changes
import Link from 'next/link';
import FeaturedMentorList from './FeaturedMentorList';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, Theme } from '@mui/material/styles'; // Import useTheme and Theme type
interface HomePageClientProps {
  initialUserProfiles: any[];
}

const logos = [
  { src: '/assets/appsumo-logo.jpg', alt: 'appsumo' },
  { src: '/assets/semrush-logo.jpg', alt: 'semrush' },
  { src: '/assets/coderschool-logo.png', alt: 'coderschool' },
  { src: '/assets/spotify-logo.png', alt: 'spotify' },
  { src: '/assets/netflix-logo.png', alt: 'netflix' },
  { src: '/assets/grab-logo.png', alt: 'grab' },
];

const HomePage: React.FC<HomePageClientProps> = ({ initialUserProfiles }) => {
  const userProfiles = initialUserProfiles;
  const theme = useTheme(); // Get the theme object
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <section className="hero__section">
        <Container
          // width prop removed from Container as it's not a standard prop, use maxWidth or sx width
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
            alignItems: 'center',
            pb: 5,
            pt: 5,
            gap: 5,
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '570px' },
              display: 'flex',
              flexDirection: 'column',
            }}
            gap={5}
          >
            <Typography variant={isTabletOrSmaller ? 'h3' : 'h1'} sx={{ textAlign: { xs: 'center', sm: 'center', md: 'center', lg: 'left' } }}>
              Grow your startup faster with 1:1 mentorship
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'center', lg: 'left' } }}>
              Pick the brains of mentors who have driven growth at some of the world's leading startups. See the blind spots in your decision-making
            </Typography>
            <Stack flexDirection="row" gap={2} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'center', lg: 'left' } }}>
              <Button variant="outlined" component={Link} href="/login">
                Get Started & Get Growing {'>'}
              </Button>
              <Button variant="outlined" component="a" href="https://www.youtube.com/watch?v=x9kQ8m2ex4k&t=35s" target="_blank">
                What people are saying
              </Button>
            </Stack>
            <Stack sx={{ textAlign: { xs: 'center', sm: 'center', md: 'center', lg: 'left' } }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                WITH HUNDREDS OF MENTORS JUST A CLICK AWAY, YOU CAN:
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                ✓ Validate ideas before executing
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                ✓ Get personalized advice for your situation
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                ✓ Get clarity on things you're struggling with
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                ✓ Skip the trial-and-error of doing it yourself
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              width: '45%',
              display: isTabletOrSmaller ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src="/assets/hero-img.jpg" alt="hero__img" width="100%" />
          </Box>
        </Container>
      </section>

      <section className="mentor__section">
        <Container
          // width prop removed from Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 5,
            mb: 2,
          }}
        >
          <Typography
            variant={isTabletOrSmaller ? 'h6' : 'h5'}
            sx={{
              textAlign: 'center',
            }}
          >
            Get instant access to startup mentors from amazing companies like:
          </Typography>
          <Stack flexDirection="row" gap={3} alignItems="center" justifyContent="center">
            {logos.map((logo, index) => (
              <Box
                key={index}
                sx={{
                  width: '15%', // Adjusted width for responsiveness
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={logo.src} alt={logo.alt} width="100%" />
              </Box>
            ))}
          </Stack>
        </Container>

        <div className="mentor__list">
          <Container
            // width prop removed from Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 5,
              mb: 5,
              flexGrow: 1,
              position: 'relative',
            }}
          >
            <Typography variant={isTabletOrSmaller ? 'h6' : 'h5'} sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
              Talk to the operators actively doing the work
            </Typography>
            <Typography variant={isTabletOrSmaller ? 'subtitle1' : 'h6'} sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
              Get the kind of personalised advice you'd never find by passively binging content.
            </Typography>
            <FeaturedMentorList userProfiles={userProfiles} />
          </Container>
        </div>
        <Container
          // width prop removed from Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 5,
            mb: 5,
          }}
        >
          <Typography variant={isTabletOrSmaller ? 'h6' : 'h5'} sx={{ textAlign: 'center' }}>
            Want to browse the rest of the mentors?
          </Typography>
          <Button variant="outlined" sx={{ mt: 3 }} component={Link} href="/mentors">
            BROWSE +100 MENTORS BEFORE JOINING
          </Button>
        </Container>
      </section>

      <section className="numbers__section">
        <Container>
          <Stack flexDirection={{ xs: 'column', md: 'row' }} gap={3} alignItems="center" justifyContent="center" textAlign="center" sx={{ mt: 5, mb: 5 }}>
            <Box>
              <Typography variant="h2">33,000+</Typography>
              <Typography variant="subtitle1">Sessions booked since 2018</Typography>
            </Box>
            <Box>
              <Typography variant="h2">27</Typography>
              <Typography variant="subtitle1">Events organised around the world by our community</Typography>
            </Box>
            <Box>
              <Typography variant="h2">4.7</Typography>
              <Typography variant="subtitle1">Average sessions / month per mentee</Typography>
            </Box>
          </Stack>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
