# Interview Scheduler

## Project Description

A single page application, Scheduler keeps track of student interviews. Users enjoy an optimized user experience as they easily add, edit and delete appointments in real time. Data is persisted by the API server using a PostgreSQL database.

## Dependencies
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Screenshots

!["Appontment form, where users can create a new appointment or edit an existing one"](https://github.com/egenazturemis/scheduler/blob/master/docs/appointment-form.png?raw=true)
Appointment form, where users can create a new appointment or edit an existing one.

!["Users have to confirm when deleting an appointment"](https://github.com/egenazturemis/scheduler/blob/master/docs/confirm-delete.png?raw=true)
Users have to confirm when deleting an appointment.

!["Users see a status update while their appointment is being created or deleted"](https://github.com/egenazturemis/scheduler/blob/master/docs/deleting.png?raw=true)
Users see a status update while their appointment is being created or deleted.

## Setup 
Install dependencies with npm install.

#### Running Webpack Development Server
```sh
npm start
```
#### Running Jest Test Framework
```sh
npm test
```
#### Running Storybook Visual Testbed
```sh
npm run storybook
```
## Setup the Interview Scheduler API
Clone the [scheduler-api](https://github.com/egenazturemis/scheduler-api)