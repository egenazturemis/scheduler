import React from "react";
import classNames from 'classnames/bind';

import "components/Button.scss";

const classnames = require('classnames');

export default function Button(props) {
// Create a new buttonClass string each time we update the props.
// i.e. add the conditional class names logic to the Button component.
   
   // Apply the base button class.
   // let buttonClass = "button";
   
   // When props.confirm is true we append a space and the 
   // "button--confirm" class to the buttonClass string.
   // if (props.confirm) {
   //    buttonClass += " button--confirm";
   // }

   // if (props.danger) {
   //    buttonClass += " button--danger";
   // }

   // REFACTOR using ClassNames:
   let buttonClass = classnames("button", {
      button: true,
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   // Normally when we want to disable a button element we use the disabled attribute. 
   // In order to support this behaviour in React we will need to forward a prop called disabled to the button element.
   return (
      <button 
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
   // props.children is the label that shows up on the button
}
