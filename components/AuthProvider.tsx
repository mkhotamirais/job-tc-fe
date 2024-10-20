"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiKey, baseUrl } from "@/lib/constants";
import { useMovie } from "@/hooks/useMovie";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { sessId, setIsLogin } = useMovie();

  useEffect(() => {
    axios
      .get(`${baseUrl}/account/21375178?session_id=${sessId}&api_key=${apiKey}`)
      .then(() => {
        setIsLogin(true);
      })
      .catch(() => {
        setIsLogin(false);
      });
  }, [sessId, setIsLogin]);

  if (!mounted) return null;
  return <>{children}</>;
}
