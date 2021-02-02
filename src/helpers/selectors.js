export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  
  const dayArr = state.days.filter(eachDay => eachDay.name === day);
  
  if (dayArr.length === 0) {
    return [];
  }
  
  const appointmentsArr = dayArr[0].appointments;

  const eachAppointment = appointmentsArr.map(appointment => state.appointments[appointment])
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
 
  const dayArr = state.days.filter(eachDay => eachDay.name === day);
  
  if (dayArr.length === 0) {
    return [];
  }
 
  const interviewersArr = dayArr[0].interviewers;

  const eachInterview = interviewersArr.map(interview => state.interviewers[interview])
  return eachInterview;
}
