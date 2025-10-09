import React, { useEffect } from "react";
import styles from "../../styles/style";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const event = allEvents?.[0];

  // useEffect(() => {
  //   const data = allEvents && allEvents.find((a, b) => a.soldOut - b.soldOut);
  //   console.log(data);
  // }, [allEvents]);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid">
            {allEvents && allEvents.length > 0 ? (
              allEvents.map((event) => (
                <EventCard key={event._id} active={true} data={event} />
              ))
            ) : (
              <h4>No Events have!</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
