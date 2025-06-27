//as the useSearchParams can only be used inside the client component we are making a diff client file that handles the displaying of data then we import that inside the suspense
import Resultpart from "@/components/resultpart/page";

import { Suspense } from "react";

export default function Result() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Resultpart />  
    </Suspense>
  );
}
