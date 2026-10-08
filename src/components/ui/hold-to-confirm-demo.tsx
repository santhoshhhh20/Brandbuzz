"use client";

import React from "react";
import { HoldToConfirm } from "@/components/ui/hold-to-confirm";

export default function HoldToConfirmDemo() {
  return (
    <div className="flex min-h-[220px] items-center justify-center">
      <HoldToConfirm onConfirm={() => {}} confirmLabel="Workspace deleted">
        Hold to delete workspace
      </HoldToConfirm>
    </div>
  );
}
