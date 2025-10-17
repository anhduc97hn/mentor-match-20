import BrowseMentorPageClient from "@/src/pageComponents/Public/BrowseMentor/BrowseMentorPage";
import { getUserProfilesServer } from "@/src/data/user"; // Create this utility function

// Define the initial filter state (Server-side defaults)
const initialFilter = {
  searchQuery: "",
  sortBy: "reviewDesc", // Use 'reviewDesc' for most popular/most reviews as default
  company: "",
  position: "",
  city: "",
};

export default async function BrowseMentorsPage() {
  // 1. Fetch the initial data directly on the server
  const defaultPage = 1;
  const initialData = await getUserProfilesServer({
    filter: initialFilter,
    page: defaultPage
  });

  // initialData should contain { currentPageUsers, userProfilesById, total, totalPages }

  // Extract mentors for the initial render (matching your component logic)
  const initialMentors = initialData.currentPageUsers.map(
    (userId) => initialData.userProfilesById[userId]
  );
  
  // 2. Render the client component, passing the server-fetched data as props
  return (
    <BrowseMentorPageClient
      initialMentors={initialMentors}
      initialTotal={initialData.total}
      initialTotalPages={initialData.totalPages}
      initialPage={defaultPage}
      // Pass other necessary initial state/data if needed
    />
  );
}