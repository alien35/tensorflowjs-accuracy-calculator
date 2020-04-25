import React from 'react';

function AccuracyDisplay(props) {

  const [ successImages, setSuccessImages ] = React.useState([]);
  const [ failImages, setFailImages ] = React.useState([]);

  if (!props.doneCalculating) {
    return (
      <p>No results yet.</p>
    )
  }

  const overallScore = () => {
    
  }

  const numImages = () => {
    return props.successImages.length + props.failImages.length;
  }

  const accuracyPercentage = () => {
    return (props.successImages.length / numImages()) * 100;
  }

  return (
    <div>
      <h5>
        Overall Accuracy: {accuracyPercentage()}% ({props.successImages.length} / {numImages()} Passed)
      </h5>
    </div>
  )
}

export default AccuracyDisplay;
