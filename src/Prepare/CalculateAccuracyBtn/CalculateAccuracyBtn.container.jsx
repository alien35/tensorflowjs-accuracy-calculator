import React from 'react';

function CalculateAccuracyBtn(props) {
  return (
    <div>
      <button
        disabled={props.isCalculating}
        onClick={props.calculateAccuracy}>
          Calculate Accuracy
      </button>
    </div>
  )
}

export default CalculateAccuracyBtn;
