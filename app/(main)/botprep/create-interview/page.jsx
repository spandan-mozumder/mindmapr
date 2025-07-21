"use client"

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function CreateInterview() {
  const router = useRouter();
  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44">
      <div className="flex gap-5 items-center">
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
    </div>
  );
}
