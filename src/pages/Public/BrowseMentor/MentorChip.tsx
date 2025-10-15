import { Chip, Stack } from '@mui/material';
import React from 'react';

// --- Type Definitions ---

// Define the type for the component's props.
// 'labels' can be an array of strings, null, or undefined.
interface Props {
  labels: (string | null | undefined)[] | null | undefined;
}

// --- Component ---

// Use React.FC<Props> to type the functional component and its props.
const MentorChip: React.FC<Props> = ({ labels }) => {
  // Filter out any null or undefined values before mapping
  const validLabels = labels?.filter((label): label is string => !!label) || [];

  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap">
      {validLabels.map((label, index) => (
        <Chip 
          label={label} 
          variant="outlined" 
          size="small" 
          sx={{ m: 0.5 }} 
          key={`${label}-${index}`} // Use a more stable key if possible
        />
      ))}
    </Stack>
  );
}

export default MentorChip;