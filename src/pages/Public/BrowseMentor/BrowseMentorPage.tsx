'use client'

import React, { useEffect, useMemo, useRef, useState } from "react";
import FTextField from "../../../components/form/FTextField";
import FormProvider from "../../../components/form/FormProvider";
import FSelect from "../../../components/form/FSelect";
import LoadingScreen from "../../../components/LoadingScreen";
import MentorList from "./MentorList";
import {
  Alert,
  Box,
  Container,
  InputAdornment,
  Pagination,
  Stack,
  Typography,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import "./BrowseMentorPage.css";
import { getUserProfile } from "../../../slices/userProfileSlice";
import FAutoComplete from "../../../components/form/FAutoComplete";
import { useAppSelector, useAppDispatch } from '@/src/app/hooks'
import { current } from "@reduxjs/toolkit";

// Define the shape of the form data
interface FilterFormInputs {
  searchQuery: string;
  sortBy: string;
  company: string;
  position: string;
  city: string;
}

// Define the structure for the filter menu items
interface RenderMenuItem {
  label: string;
  name: keyof Omit<FilterFormInputs, "searchQuery" | "sortBy">; // Ensures name is 'company', 'position', or 'city'
  options: string[];
}

interface BrowseMentorPageProps {
  initialMentors: any[];
  initialTotal: number;
  initialTotalPages: number;
  initialPage: number;
}
// --- Component ---

const BrowseMentorPage: React.FC<BrowseMentorPageProps> = ({ initialMentors, initialTotal, initialTotalPages, initialPage }) => {
  const [page, setPage] = useState<number>(1);
  const { currentPageUsers, userProfilesById, isLoading, error, total, totalPages } = useAppSelector(state => state.userProfile);
  const dispatch = useAppDispatch();

  const defaultValues: FilterFormInputs = {
    searchQuery: '',
    sortBy: 'reviewDesc',
    company: '',
    position: '',
    city: '',
  };
  const methods = useForm<FilterFormInputs>({
    defaultValues,
  });
  const { reset, handleSubmit } = methods;
  const [updates, setUpdates] = useState<FilterFormInputs>(defaultValues);

  const clientMentors = currentPageUsers.map(userId => userProfilesById[userId]) as any;
  // Prioritize client-fetched mentors if available, otherwise use initial server data
  const mentors = clientMentors.length > 0 ? clientMentors : initialMentors;
  const currentTotal = clientMentors.length > 0 ? total : initialTotal;
  const currentPageTotalPages = clientMentors.length > 0 ? totalPages : initialTotalPages;

  // Calculate filter options with useMemo
  const filterOptions = useMemo(() => {
    const uniqueCompanies = new Set<string>();
    const uniquePositions = new Set<string>();
    const uniqueCities = new Set<string>();

    mentors.forEach((mentor: any) => {
      if (mentor.currentCompany) uniqueCompanies.add(mentor.currentCompany);
      if (mentor.currentPosition) uniquePositions.add(mentor.currentPosition);
      if (mentor.city) uniqueCities.add(mentor.city);
    });

    return {
      company: Array.from(uniqueCompanies),
      position: Array.from(uniquePositions),
      city: Array.from(uniqueCities),
    };
  }, [mentors]);

  // Type the renderMenu array
  const renderMenu: RenderMenuItem[] = [
    {
      label: 'Company',
      name: 'company',
      options: filterOptions.company,
    },
    {
      label: 'Position',
      name: 'position',
      options: filterOptions.position,
    },
    {
      label: 'City',
      name: 'city',
      options: filterOptions.city,
    },
  ];

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onSubmit = (data: FilterFormInputs) => {
    setPage(1); // Reset to first page on new search
    setUpdates(data);
  };

  const handleReset = () => {
    setPage(1);
    setUpdates(defaultValues);
    reset();
  };

  // Replace:
  // useEffect(() => {
  //     dispatch(getUserProfile({ filter: updates, page }));
  //   }, [dispatch, updates, page]);

  // With:
  const isInitialMount = useRef(true);

  useEffect(() => {
    // 1. Check if this is the very first render after mount
    if (isInitialMount.current) {
      isInitialMount.current = false; // Set to false after the first render
      return; // Skip the effect logic on the initial mount
    }

    // 2. This code runs only on subsequent changes to 'updates' or 'page'
    dispatch(getUserProfile({ filter: updates, page }));
  }, [dispatch, updates, page]);

  return (
    <section className="mentorlist-page">
      <Container
        sx={{
          backgroundColor: 'primary.light',
          padding: 2,
          m: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        maxWidth={false}
      >
        {isLoading && !mentors.length ? (
          <LoadingScreen sx={{ top: 0, left: 0 }} />
        ) : (
          <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Box className="search-bar" sx={{ borderRadius: 1.5, width: '100%', p: 2 }}>
                <FTextField
                  name="searchQuery"
                  size="medium"
                  variant="standard"
                  sx={{ width: '100%', mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ width: '30px', height: '30px' }} color="primary" />
                      </InputAdornment>
                    ),
                    placeholder: 'Search by mentor name, company, or position...',
                  }}
                />
                <Stack
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                  }}
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                >
                  {renderMenu.map(item => (
                    <FAutoComplete
                      key={item.name}
                      name={item.name}
                      label={item.label}
                      options={item.options}
                      sx={{
                        width: { xs: '100%', md: '25%' },
                        border: '1px solid #9DA4AE',
                        borderRadius: 1,
                      }}
                    />
                  ))}
                  <FSelect name="sortBy" label="Sort By" size="medium" sx={{ width: { xs: '100%', md: '15%' } }}>
                    {[
                      { value: 'reviewDesc', label: 'Most Rated' },
                      { value: 'sessionDesc', label: 'Most Sessions' },
                      { value: 'newest', label: 'Newest' },
                    ].map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FSelect>
                </Stack>
              </Box>
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 2,
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1">{`${currentTotal} mentors found`}</Typography>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" size="small" type="submit">
                    Search
                  </Button>
                  <Button variant="outlined" size="small" onClick={handleReset}>
                    Reset
                  </Button>
                </Stack>
              </Stack>
            </FormProvider>
            <Box sx={{ position: 'relative', minHeight: '50vh' }}>
              {error ? <Alert severity="error">{error}</Alert> : <MentorList mentors={mentors} />}
              {isLoading && <LoadingScreen sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />}
            </Box>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Pagination count={currentPageTotalPages} page={page} onChange={handleChange} />
            </Box>
          </>
        )}
      </Container>
    </section>
  );
};

export default BrowseMentorPage;