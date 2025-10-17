import React from 'react';
import MentorCard from './MentorCard';
import { IMentorProfile } from '@/src/types/user';

// Define the type for the component's props.
interface Props {
  mentors: IMentorProfile[];
}

// --- Component ---

// Use React.FC<Props> to type the functional component and its props.
const MentorList: React.FC<Props> = ({ mentors }) => {
  return (
    <>
      {/* The 'mentor' variable inside map is now strongly typed as MentorProfile */}
      {mentors.map((mentor) => (
        <MentorCard mentor={mentor} key={mentor._id} />
      ))}
    </>
  );
}

export default MentorList;