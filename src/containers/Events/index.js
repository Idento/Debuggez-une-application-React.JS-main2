import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.scss";

const PER_PAGE = 9;

function filterEvents(data, currentPage, perpage, type){
  const filteredEventsbyType = data?.events.filter((event) => {
    if (event.type === type || type === "Toutes") {
      return true;
    }
    return false;
  });
  const start = (currentPage - 1) * perpage;
  const end = start + perpage;
  const filteredEvents = filteredEventsbyType ? filteredEventsbyType.slice(start, end) : null;
  return filteredEvents
}

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState("Toutes");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState([])


  useEffect(() => {
    setFilteredEvents(filterEvents(data, currentPage, PER_PAGE, type))
  }, [data, type])
  

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents?.map((dataevent) => (
              <Modal key={dataevent.id} Content={<ModalEvent event={dataevent} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={dataevent.cover}
                    title={dataevent.title}
                    date={new Date(dataevent.date)}
                    label={dataevent.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
