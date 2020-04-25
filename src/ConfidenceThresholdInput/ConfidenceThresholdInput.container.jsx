import React from 'react';

function AccuracyDisplay(props) {

  const onChange = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <div>
      Confidence Threshold: <input max={1} value={props.value} type="number" onChange={onChange} />
    </div>
  )
}

export default AccuracyDisplay;