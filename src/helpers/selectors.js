export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  
  let dayArr = state.days.filter(eachDay => eachDay.name === day);
  
  if (dayArr.length === 0) {
    return [];
  }
  
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
 
  let dayArr = state.days.filter(eachDay => eachDay.name === day);
  
  if (dayArr.length === 0) {
    return [];
  }
 
  let interviewersArr = dayArr[0].interviewers;

  let eachInterview = interviewersArr.map(interview => state.interviewers[interview])
  return eachInterview;
}
