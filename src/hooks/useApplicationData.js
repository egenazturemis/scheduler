import { useState, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
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



  function spotsRemaining(id, isAdded) {
    let count;
    
    for (let day in state.days) {
      
      if (state.days[day].appointments.includes(id)) {
        
        if (isAdded) {
          count = state.days[day].spots - 1
        } else {
          count = state.days[day].spots + 1
        }
        
        const newDay = {
          ...state.days[day],
          spots: count
        }
  
        const days = [...state.days]
        days[day] = newDay
  
        setState(prev => ({
          ...prev,
          days
        }))
      } 

    }
    return count;

  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log("HERE >>> ", state.appointments[id])
    if (state.appointments[id].interview === null) {
      spotsRemaining(id, true);
    }

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
      spotsRemaining(id, false)
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