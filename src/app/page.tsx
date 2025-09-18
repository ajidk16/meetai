"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

/**
 * Client-side React component that provides simple email-based sign-up and sign-in flows and shows the current session.
 *
 * Displays a sign-up form (name, email, password) and a sign-in form (email, password) when no session exists. Submitting the sign-up or sign-in forms calls the corresponding authClient methods; success and error outcomes are surfaced via browser alerts. When a session is present, renders a welcome message (using the user's name or email) and a Sign Out button that calls authClient.signOut().
 *
 * Note: this component reads session state via authClient.useSession() and performs authentication side effects (signUp, signIn, signOut).
 *
 * @returns The component's rendered JSX: either the authenticated view (welcome + sign-out) or the unauthenticated view with sign-up and sign-in forms.
 */
export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong: ");
        },
        onSuccess: () => {
          window.alert("Check your email for verification link");
        },
      }
    );
  };

  const onLogin = async () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong: ");
        },
        onSuccess: () => {
          window.alert("Logged in successfully");
        },
      }
    );
  };

  console.log("Session:", session);

  if (session) {
    return (
      <div>
        <div>Welcome, {session.user.name || session.user.email}!</div>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 p-4">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
}
