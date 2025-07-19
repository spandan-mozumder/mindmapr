'use client';

import React from 'react';
import { Clock } from 'lucide-react';

export default function ChapterListCard({ chapter, index }) {
  return (
    <div>
      <h2 className="">{chapter?.ChapterName}</h2>
      <h2 className="flex items-center text-gray-500">
        <Clock className="h-4" />
        {chapter?.Duration}
      </h2>
    </div>
  );
}
