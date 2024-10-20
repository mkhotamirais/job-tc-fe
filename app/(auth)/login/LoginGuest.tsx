"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { apiAccessToken, baseUrl } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginGuest() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onGuest = () => {
    axios
      .get(`${baseUrl}/authentication/guest_session/new`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiAccessToken}`,
        },
      })
      // url: `${baseUrl}/authentication/guest_session/new?redirect_to=http://localhost:3000`,
      .then((res) => {
        localStorage.setItem("guest_session_id", res.data.guest_session_id);
        localStorage.removeItem("session_id");
        router.push("/");
      })
      .catch((err) => console.error(err))
      .finally(() => setPending(false));
  };

  return (
    <Button variant={"link"} onClick={onGuest} className="mt-6 w-full">
      {pending && <Loader2 className="animate-spin size-5 mr-3 text-primary" />}
      Contunue as a guest
    </Button>
  );
}
