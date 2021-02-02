import React, { useState } from 'react'

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props) {
  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer && props.interviewer.id);
  const [error, setError] = useState("");

  const nameChanger = (event) => {
    setName(event.target.value);
  }

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const saveInterview = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

 

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={nameChanger}
            onSubmit={event => event.preventDefault()}
          />
          <section className="appointment__validation">{error}</section>
        </form>
          <InterviewerList 
            interviewers={props.interviewers} 
            interviewer={interviewer} 
            setInterviewer={setInterviewer}
          />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={saveInterview}>Save</Button>
        </section>
      </section>
    </main>
  )
}
