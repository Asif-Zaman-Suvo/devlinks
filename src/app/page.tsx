import LoginForm from "@/components/LoginForm/LoginForm";
import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to DEVLINKS</h1>
        <LoginForm />
      </div>
    </div>
  );
}
