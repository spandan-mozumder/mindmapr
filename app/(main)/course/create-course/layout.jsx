'use client';

import React, { useState, Suspense } from 'react';
import { BarLoader } from 'react-spinners';

import { UserInputContext } from '../../_context/userinputcontext';

export default function Layout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState([]);

  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      <Suspense fallback={<BarLoader color="gray" width="100%" className="mt-4" />}>
        {children}
      </Suspense>
    </UserInputContext.Provider>
  );
}
