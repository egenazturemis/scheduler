import React, { useState, useEffect } from "react";
import axios from "axios";

export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  
  // find the object in our state.days array who's name matches the provided day. 
  let dayArr = state.days.filter(eachDay => eachDay.name === day);
  console.log("HERE >>>>> ", dayArr)
  
  if (dayArr.length === 0) {
    return [];
  }
  
  // access that specific days appointment array.
  let appointmentsArr = dayArr[0].appointments;

  let eachAppointment = appointmentsArr.map(appoint => state.appointments[appoint])
  return eachAppointment;
}
