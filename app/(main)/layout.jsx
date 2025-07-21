'use client';

import { useState } from 'react';
import { InterviewDataContext } from '@/app/(main)/_context/interviewdatacontext';

const MainLayout = ({ children }) => {
  const [interviewInfo, setInterviewInfo] = useState();
  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div className="container mx-auto mt-24 mb-20">{children}</div>
    </InterviewDataContext.Provider>
  );
};

export default MainLayout;
