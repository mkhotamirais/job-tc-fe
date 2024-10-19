"use client";

import { useEffect } from "react";
import axios from "axios";
import { apiAccessToken, baseUrl } from "@/lib/constants";

export default function AccountPage() {
  useEffect(() => {
    axios
      .get(`${baseUrl}/account/21375178`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiAccessToken}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return <div>AccountPage</div>;
}
