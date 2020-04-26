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
      <h3>Images that passed</h3>
      <div className="tested-images">
        {
          props.successImages.map((score, index) => (
            <div key={index}>
              <img className="tested-image" src={score.imgSrc} />
              Expected {score.expected}
              {
                score.result.map((scoreResult) => (
                  <div>{scoreResult.label}: <span>{scoreResult.confidence}</span></div>
                ))
              }
            </div>
          ))
        }
      </div>
      <h3>Images that failed</h3>
      <div className="tested-images">
        {
          props.failImages.map((score, index) => (
            <div key={index}>
              <img className="tested-image" src={score.imgSrc} />
              Expected {score.expected}
              {
                score.result.map((scoreResult) => (
                  <div>{scoreResult.label}: <span>{scoreResult.confidence}</span></div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AccuracyDisplay;
