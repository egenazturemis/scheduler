import React from "react";

import classNames from 'classnames/bind';

import "components/DayListItem.scss";

const classnames = require('classnames');

export default function DayListItem(props) {
  let dayClass = classnames("day-list__item", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // Format the props.spots to make our tests pass:
  let formatSpots = () => {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    };
  }
  
  return (
    // The <li> represents the entire day item.
    <li 
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

