"use client"; // This directive is essential for client-side components

import { Provider as ReduxProvider } from "react-redux";
import { AppStore, makeStore } from "@/src/app/store"; // Adjust path to your Redux store
import ThemeProvider from "@/src/theme"; // Adjust path as needed
import { AuthProvider } from "@/src/contexts/AuthContext"; // Adjust path
import { DatePicker } from "@/src/contexts/DatePicker"; // Adjust path
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRef } from "react";

// Ensure your environment variable is defined
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;

// Type the props for the Providers component
export default function Providers({ children }: { children: React.ReactNode }) {
  // if (!clientId) {
  //   // It's good practice to handle the case where the client ID might be missing.
  //   console.error("Google OAuth Client ID is not configured.");
  //   // You could return a loading state or an error message here.
  //   return <>{children}</>; 
  // }

  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // 4. Create the store instance the first time this component renders
    // This happens once per request on the server (SSR) and once on the client
    storeRef.current = makeStore();
  }

  return (
    <ReduxProvider store={storeRef.current}>
      <AuthProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <ThemeProvider>
            <DatePicker>
              {children}
            </DatePicker>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}