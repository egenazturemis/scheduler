import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"; //how exactly is this working?
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
;  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id);
    transition(EMPTY);
  }

  console.log("PROPS >>>>> ", props)
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
            onCancel={props.cancelInterview}
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
            onCancel={() => transition(SHOW)}
            onConfirm={deleteInterview}
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

      </article>
    </>
  )
}
