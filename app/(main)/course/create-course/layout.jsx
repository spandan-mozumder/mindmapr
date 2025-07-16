"use client";

import React, { Suspense, useState } from "react";
import { UserInputContext } from "../../_context/userinputcontext";
import { BarLoader } from "react-spinners";

const MainLayout = ({ children }) => {
  const [userCourseInput, setUserCourseInput] = useState([]);

  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      <div className="flex flex-col justify-center items-center">
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
        >
          {children}
        </Suspense>
      </div>
    </UserInputContext.Provider>
  );
};

export default MainLayout;
