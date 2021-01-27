import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"; //how exactly is this working?
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function destroy() {
    transition(DELETING, true);
    
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <>
      <article className="appointment">
      <Header time = {props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer || {}}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            interview={props.interview}
            onCancel={() => back()}
            onSave={save}
            // setInterviewer={setInterviewer}
          />
        )}
        {mode === SAVING && (
          <Status 
            message="Creating appointment"
          />
        )} 
        {mode === DELETING && (
          <Status 
            message="Deleting..."
          />
        )}
        {mode === CONFIRM && (
          <Confirm 
            message="Are you sure you would like to delete?"
            onCancel={() => back()}
            onConfirm={destroy}
          />
        )}
        {mode === EDIT && (
          <Form 
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            interviewers={props.interviewers}
            onCancel={() => transition(SHOW)}
            onSave={save}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error 
            message="Could not cancel appointment"
            onClose={() => back()}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error 
          message="Could not save appointment"
          onClose={() => back()}
          />
        )}
      </article>
    </>
  )
}
