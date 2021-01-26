import React, { useState } from 'react'

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props) {
  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer && props.interviewer.id);

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
    props.onSave(name, interviewer);
  }

 

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={nameChanger}
            onSubmit={event => event.preventDefault()}
              /*
                This must be a controlled component
              */
          />
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

// name="Lydia Miller-Jones"
//             interviewers={interviewers} 
//             interviewer={interviewer}
//             onSave={action("onSave")}
//             onCancel={action("onCancel")}
