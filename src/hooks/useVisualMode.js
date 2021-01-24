import React, { useState } from "react";


// a custom Hook that allows us to manage the visual mode of any component. 
// We can define the modes as constants in our component and then 
// use the Hook to transition forward and back: 
export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (next, replace=false) => {
    setMode(()=> next)
    setHistory(prev => {
      return replace ?
      [...prev.slice(0, -1), next] :
      [...prev, next]
    });
  };

  function back () {
    if (history.length > 1) {
      // remove the last item from the stack 
      setHistory(prev => [...prev.slice(0, -1)])
      // setMode with the last item in the array
      setMode(history[history.length-2])
    }
  }
  
  
  return { mode, transition, back };
}