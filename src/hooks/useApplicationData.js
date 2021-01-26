import React, { useState } from "react";
import axios from "axios";
 
import "components/Appointment";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },  
    interviewers: {}
  });


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState(prev => ({
        ...prev,
        appointments
      }))
    });

  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
    setState(state => ({
      ...state,
      appointments: {
        ...state.appointments,
        [id]: {
          ...state.appointments[id],
          interview: null
        }
      }
    }))
  }) 
  }

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}