
import apiService from '@/src/app/apiService'; // Assuming you move apiService to /lib
import { UserProfile } from '@/src/types/user'; // Assuming you move types to /lib

// Define the structure of the data the server needs to return to the page
interface FeaturedUserProfilesData {
  userProfiles: UserProfile[];
  userProfilesById: Record<string, UserProfile>;
  currentHomePageUsers: string[];
}

// This function replaces the Redux Thunk for server-side fetching
export async function fetchFeaturedMentors(): Promise<FeaturedUserProfilesData> {
  try {
    // 1. Execute the API call directly (just like the thunk did)
    const response = await apiService.get<any, { data: { userProfiles: UserProfile[] } }>(
      `/userProfiles/featured`
    );

    const userProfiles = response.data.userProfiles;
    const userProfilesById: Record<string, UserProfile> = {};
    const currentHomePageUsers: string[] = [];

    // 2. Process the data into the structure your component needs (data normalization)
    userProfiles.forEach(userProfile => {
      userProfilesById[userProfile._id] = userProfile;
      currentHomePageUsers.push(userProfile._id);
    });

    // 3. Return the clean, processed data object
    return {
      userProfiles: userProfiles,
      userProfilesById: userProfilesById,
      currentHomePageUsers: currentHomePageUsers,
    };
  } catch (error) {
    // In a Server Component, you generally throw errors, handle them in error.tsx,
    // or return a safe default, rather than calling toast.
    console.error('Failed to fetch featured mentors:', error);
    // Return an empty set if fetching fails
    return { userProfiles: [], userProfilesById: {}, currentHomePageUsers: [] };
  }
}

// lib/data/user.ts or similar server utility file

// Use types from your Redux slice for clarity
interface GetUserProfileParams {
  page: number;
  limit?: number;
  filter?: {
    searchQuery?: string;
    sortBy?: string;
    company?: string;
    position?: string;
    city?: string;
  };
}

// Assuming your API response structure looks like the Redux state expects
interface UserProfileData {
  userProfiles: UserProfile[];
  currentPageUsers: string[]; // array of IDs
  userProfilesById: Record<string, any>; // map of ID to full user profile object
  total: number;
  totalPages: number;
}

export async function getUserProfilesServer(
  params: GetUserProfileParams
): Promise<UserProfileData> {
  // 1. Construct the filter object for the POST body
  
  const { page, limit, filter } = params;
  const requestParams: GetUserProfileParams = { page, limit };
  if (filter) {
    requestParams.filter = filter;
  }

  try {
      const response = await apiService.get(`/userProfiles/`, { params: requestParams });
   const userProfiles = response.data.userProfiles as UserProfile[];
    const userProfilesById: Record<string, UserProfile> = {};
    const currentPageUsers: string[] = [];

    // 2. Process the data into the structure your component needs (data normalization)
    userProfiles.forEach(userProfile => {
      userProfilesById[userProfile._id] = userProfile;
      currentPageUsers.push(userProfile._id);
    });

    // 3. Return the clean, processed data object
    return {
      userProfiles: userProfiles,
      userProfilesById: userProfilesById,
      currentPageUsers: currentPageUsers,
      total: response.data.count,
      totalPages: response.data.totalPages 
    };

  } catch (error) {
    // Log the error on the server
    console.error("Server-side mentor fetch error:", error);
    // Return empty data structure on failure
    return {
      userProfiles: [],
      currentPageUsers: [],
      userProfilesById: {},
      total: 0,
      totalPages: 0,
    };
  }
}

// Assuming your API response structure for a single user is IMentorProfile
import { IMentorProfile } from '@/src/types/user'; // Use your actual type

export async function getMentorProfileServer(mentorId: string): Promise<IMentorProfile | null> {
  try {
    const response = await apiService.get(`/userProfiles/${mentorId}`);
    const userProfile = response.data;
    return userProfile;
  } catch (error) {
    console.error('Server-side mentor fetch error:', error);
    return null;
  }
}