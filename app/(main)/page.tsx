import HomePageClient from "@/src/pages/Public/Homepage/HomePage";

import { fetchFeaturedMentors } from '@/src/data/user'; // <--- NEW server-side function

// NOTE: Components are async by default in the App Router!
export default async function HomePage() {
  
  // 1. Fetch data directly on the server (replaces Redux dispatch/select)
  // This executes *before* the component renders.
  // Assuming fetchFeaturedMentors returns { currentHomePageUsers, userProfilesById }
  const { currentHomePageUsers, userProfilesById } = await fetchFeaturedMentors(); 
  
  // Explicitly map the user profiles
  const userProfiles = currentHomePageUsers.map((id) => userProfilesById[id]);
  
  // The server handles the data and passes it down
  return <HomePageClient initialUserProfiles={userProfiles} />;
}

