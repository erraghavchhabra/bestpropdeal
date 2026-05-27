"use client";

import { Suspense } from "react";
import ServicesTabs from "@/components/services/ServicesTabs";

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesTabs />
    </Suspense>
  );
}