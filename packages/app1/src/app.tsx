import * as React from "react";
import { useState } from "react";
import * as host from "host/test";

function App() {
  const [counter, setCounter] = useState(0);
  console.log(host);
  return (
    <div>
      <h1>Counter {counter} {host.test} </h1>
      <button onClick={() => setCounter(counter + 1)}> Increment </button>
      <button onClick={() => setCounter(counter - 1)}> Decrement </button>
    </div>
  );
}

export default App;