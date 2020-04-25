import React from 'react';
import Button from '@material-ui/core/Button';

function CalculateAccuracyBtn(props) {
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={props.calculateAccuracy}
        disabled={props.isCalculating}
      >
        Calculate Accuracy
      </Button>
    </div>
  )
}

export default CalculateAccuracyBtn;
