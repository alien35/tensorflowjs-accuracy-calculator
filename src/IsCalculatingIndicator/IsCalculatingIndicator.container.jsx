import React from 'react';

function IsCalculatingIndicator(props) {
  if (props.calculationProgress === 0) {
    return null;
  }
  return (
    <div>
      Calculating... ({props.calculationProgress}%)
    </div>
  )
}

export default IsCalculatingIndicator;
