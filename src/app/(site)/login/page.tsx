"use client";
import { Auth } from "@supabase/auth-ui-react";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import {
  // Import predefined theme
  ThemeSupa,
  darkThemes,
} from "@supabase/auth-ui-shared";
type Props = {};

const Login = (props: Props) => {
  const supabase = createClient();

  return (
    <main className="flex justify-center items-center min-h-screen bg-background">
      <div className="flex flex-col sm:w-1/4">
        <h1 className="text-2xl font-semibold text-center">Whitespace</h1>
        <Auth
          supabaseClient={supabase}
          redirectTo="/profile"
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "red",
                  brandAccent: "darkred",
                },
              },
            },
          }}
          theme="dark"
          providers={["google", "github"]}
        />
      </div>
    </main>
  );
};

export default Login;
