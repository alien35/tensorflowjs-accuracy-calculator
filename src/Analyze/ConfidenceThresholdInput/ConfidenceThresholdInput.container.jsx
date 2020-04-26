import React from 'react';

function ConfidenceThresholdInput(props) {

  const onChange = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <input max={1} value={props.value} type="number" onChange={onChange} />
  )
}

export default ConfidenceThresholdInput;
