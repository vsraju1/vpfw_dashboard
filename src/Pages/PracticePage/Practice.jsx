import React, { useState } from 'react';

const Practice = () => {
  const [status, setStatus] = useState("");

  console.log("this is from practice")

  return (
    <div>
        rigth under this
      <select
        style={{ backgroundColor: "black", cursor: "pointer" }}
        name="status"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="opt1">opt1</option>
        <option value="opt2">opt2</option>
        <option value="opt3">opt3</option>
        <option value="opt4">opt4</option>
        <option value="opt5">opt5</option>
      </select>
    </div>
  );
};

export default Practice;