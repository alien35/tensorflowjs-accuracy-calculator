import React from 'react';

function IsCalculatingIndicator(props) {
  if (props.calculationProgress === 0) {
    return null;
  }
  if (props.doneCalculating) {
    return null;
  }
  return (
    <h6>
      Calculating... ({props.calculationProgress}%)
    </h6>
  )
}

export default IsCalculatingIndicator;
