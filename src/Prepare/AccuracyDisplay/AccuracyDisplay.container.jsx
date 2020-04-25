import React from 'react';

const AccuracyDisplayHeader = (props) => {
  if (!props.doneCalculating) {
    return (
      <p>No results yet.</p>
    )
  }
  return null;
}

function AccuracyDisplay(props) {

  const [ successImages, setSuccessImages ] = React.useState([]);
  const [ failImages, setFailImages ] = React.useState([]);

  

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
      {
        !props.doneCalculating ? (
          <p>No results yet.</p>
        ) : (
          <h5>
            Overall Accuracy: {accuracyPercentage()}% ({props.successImages.length} / {numImages()} Passed)
          </h5>
        )
      }
      <div className="tested-images">
        {
          props.scores.map((score, index) => (
            <div key={index}>
              <img className="tested-image" src={score.imgSrc} />
              Expected {score.expected}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AccuracyDisplay;
