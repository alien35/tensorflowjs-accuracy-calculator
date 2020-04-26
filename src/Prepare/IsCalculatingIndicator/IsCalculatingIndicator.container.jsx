import React from 'react';

function IsCalculatingIndicator(props) {
  if (!props.scores.isProcessing) {
    return null;
  }
  if (props.scores.doneProcessing) {
    return null;
  }
  return (
    <h6>
      Processing: {props.calculationProgress}
    </h6>
  )
}

export default IsCalculatingIndicator;
