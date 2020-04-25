import React from 'react';

function CalculateAccuracyBtn(props) {
  return (
    <div>
      <button onClick={props.calculateAccuracy}>Calculate Accuracy</button>
    </div>
  )
}

export default CalculateAccuracyBtn;
