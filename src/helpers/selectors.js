import React, { useState, useEffect } from "react";
import axios from "axios";

export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  
  // find the object in our state.days array who's name matches the provided day. 
  let dayArr = state.days.filter(eachDay => eachDay.name === day);
  
  if (dayArr.length === 0) {
    return [];
  }
  
  // access that specific days appointment array.
  let appointmentsArr = dayArr[0].appointments;

  let eachAppointment = appointmentsArr.map(appointment => state.appointments[appointment])
  return eachAppointment;
}


export function getInterview(state, interview){
  if (!interview) {
    return null;
  }

  const id = interview.interviewer;
  const interviewer = state.interviewers[id];

  const result = {...interview, interviewer};

  return result;
}


export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  
  // find the object in our state.days array who's name matches the provided day. 
  let dayArr = state.days.filter(eachDay => eachDay.name === day);
  
  if (dayArr.length === 0) {
    return [];
  }
  
  // access that specific days appointment array.
  let appointmentsArr = dayArr[0].appointments;

  let eachAppointment = appointmentsArr.map(appointment => state.appointments[appointment])
  return eachAppointment;
}
