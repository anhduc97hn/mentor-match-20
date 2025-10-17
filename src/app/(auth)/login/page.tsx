import ClientLoginPage from "@/src/pageComponents/Auth/LoginPage";
import { Suspense } from "react";

 export default function LoginPage() {
      return (
        <div>
          <h1>Login Page</h1>
          <Suspense fallback={<div>Loading search params...</div>}>
            <ClientLoginPage/>
          </Suspense>
        </div>
      );
    }