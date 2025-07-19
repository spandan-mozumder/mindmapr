'use client';

import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

export default function ChapterContent({ chapter, content }) {
  useEffect(() => {
    if (!chapter && !content) {
      toast.error('Chapter content not available');
    }
  }, [chapter, content]);

  return (
    <div className="h-full overflow-y-scroll">
      <div className="p-5 border border-gray-400 rounded-md">
        <h2>{chapter?.ChapterName}</h2>
        <h2 className="text-gray-500">{chapter?.About}</h2>
      </div>
      <div className="flex justify-center items-center my-10">
        {content?.videoId && <YouTube videoId={content.videoId} />}
      </div>

      <div>
        {content?.content?.map((block, index) => (
          <div key={index} className="flex flex-col gap-5 pb-10">
            <h2 className="text-lg font-bold">{block.title}</h2>
            <ReactMarkdown>{block.explanation}</ReactMarkdown>
            {block.Code && (
              <div className="md:m-5 p-5 bg-secondary border-gray-500 border rounded-md overflow-x-auto">
                <pre>
                  <code>{block?.Code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
