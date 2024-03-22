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
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-center">Whitespace</h1>
        <Auth
          supabaseClient={supabase}
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
