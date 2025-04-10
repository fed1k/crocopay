"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      // router.push("/index")
      router.push("/login")
    }
  }, [])
  
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h2>Hehe booy</h2>
    </div>
  );
}
