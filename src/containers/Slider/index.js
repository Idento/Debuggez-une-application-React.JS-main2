import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getStringMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  new Date(evtA.date) > new Date(evtB.date) ? 1 : -1
);
const nextCard = () => {
  setTimeout(
    () => byDateDesc ? setIndex(index < byDateDesc.length -1 ? index + 1 : 0) : setIndex(0),
    5000
  );
};
useEffect(() => {
  nextCard();
  return clearTimeout(nextCard())
},[index, byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getStringMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
      ))}
      <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((event, radioIdx) => (
                <input
                  key={`${getStringMonth(new Date(event.date))}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                />
              ))}
            </div>
        </div>
    </div>
  );
};

export default Slider;
