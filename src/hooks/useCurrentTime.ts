import { useEffect, useState } from "react";

function useCurrentTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return {
    currentDateTime,
  };
}

export default useCurrentTime;
