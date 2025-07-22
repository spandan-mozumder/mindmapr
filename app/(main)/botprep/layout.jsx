import { Suspense } from 'react';
import { BarLoader } from 'react-spinners';

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <div className="flex flex-row items-center justify-center">
        {/* <h1 className="font-bold gradient-title text-5xl md:text-6xl">Hop onto an Interview Call</h1> */}
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">This Feature is Coming Soon</h1> 
      </div>
      <Suspense fallback={<BarLoader className="mt-4" width="100%" color="gray" />}>
        {children}
      </Suspense>
    </div>
  );
}
