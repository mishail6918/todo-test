"use client";
import { LoginForm } from "@/components/LoginForm";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {!isAuthenticated && (
        <div className="w-full h-full flex justify-center items-center">
          <LoginForm />
        </div>
      )}
    </>
  );
}
