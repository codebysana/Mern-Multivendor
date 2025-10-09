import React from "react";
import Header from "../components/layout/Header";
import EventCard from "../components/events/EventCard";
import { useSelector } from "react-redux";
import Loader from "../components/layout/Loader";
import Footer from "../components/layout/Footer";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <div >
          <Header activeHeading={4} />
          <EventCard active={true} data={allEvents && allEvents[0]} />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
