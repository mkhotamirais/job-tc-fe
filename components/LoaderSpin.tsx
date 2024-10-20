"use client";

import { Loader2 } from "lucide-react";

export default function LoaderSpin() {
  return (
    <div className="grow flex justify-center py-16">
      <Loader2 className="animate-spin size-12 text-primary" />
    </div>
  );
}
