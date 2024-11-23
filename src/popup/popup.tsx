import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function Popup() {
  const [weekNumber, setWeekNumber] = useState<number>(0);

  useEffect(() => {
    setWeekNumber(DateTime.local().weekNumber);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-white  rounded-lg">
      <h1 className="text-4xl">Week number: {weekNumber}</h1>
    </div>
  );
}
