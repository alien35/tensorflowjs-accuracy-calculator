import React from 'react';

function AddClassBtn(props) {
  return (
    <div>
      <button onClick={props.addClass}>[+] Add a class</button>
    </div>
  )
}

export default AddClassBtn;
