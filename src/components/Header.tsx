"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
  const { logout, isAuthenticated } = useAuthStore();

  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated === false) router.push("/");
  }, [isAuthenticated]);
  return (
    <>
      <header className="py-4">
        <div className="container">
          <div className="flex justify-end">
            <button
              className="border rounded-md py-2 px-4"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
