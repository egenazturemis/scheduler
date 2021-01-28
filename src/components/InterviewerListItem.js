import React from "react";

import classNames from 'classnames/bind';

import "components/InterviewerListItem.scss";

const classnames = require('classnames');


export default function InterviewerListItem(props) {
  let interviewerClass = classnames("interviewers__item", {
    "interviewers__item": true,
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected
    });
  

  return (
    <li className={interviewerClass}
        onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}

// key={interviewer.id}
//       name={interviewer.name}
//       avatar={interviewer.avatar}
//       selected={interviewer.id === props.interviewer}
//       setInterviewer={event => props.onChange(interviewer.id)}