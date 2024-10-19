"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { apiAccessToken, baseUrl } from "@/lib/constants";

export default function LoginGuest() {
  const router = useRouter();
  const onGuest = () => {
    const options = {
      method: "GET",
      url: `${baseUrl}/authentication/guest_session/new`,
      // url: `${baseUrl}/authentication/guest_session/new?redirect_to=http://localhost:3000`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiAccessToken}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const { guest_session_id, expires_at } = response.data;
        localStorage.setItem("guest_session_id", guest_session_id);
        localStorage.setItem("expires_at", expires_at);
        router.push("/");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Button variant={"link"} onClick={onGuest} className="mt-6 w-full">
      Contunue as a guest
    </Button>
  );
}
