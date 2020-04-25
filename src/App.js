import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageClasses from './ImageClasses/ImageClasses.container';
import AddClassBtn from './AddClassBtn/AddClassBtn.container';
import AccuracyDisplay from './AccuracyDisplay/AccuracyDisplay.container';
import ConfidenceThresholdInput from './ConfidenceThresholdInput/ConfidenceThresholdInput.container';
import CalculateAccuracyBtn from './CalculateAccuracyBtn/CalculateAccuracyBtn.container';
import IsCalculatingIndicator from './IsCalculatingIndicator/IsCalculatingIndicator.container';

function App() {

  const [ classes, setClasses ] = React.useState([{name: '', id: 1, files: null}]);
  const [ classIdToUse, setClassIdToUse ] = React.useState(2);
  const [ confidenceThreshold, setConfidenceThreshold ] = React.useState(0.9);
  const [ calculationProgress, setCalculationProgress ] = React.useState(0);

  const onUpdateClasses = (_classes) => {
    setClasses(_classes);
  }

  const onAddClass = () => {
    setClasses([...classes, {name: '', id: classIdToUse, files: null}]);
    setClassIdToUse(classIdToUse + 1);
  }

  const onDeleteClass = (classId) => {
    setClasses(classes.filter((classObj) => classObj.id !== classId));
  }

  const onUpdateClassName = (classId, value) => {
    setClasses(classes.map((classObj) => {
      if (classObj.id === classId) {
        return {
          ...classObj,
          name: value
        }
      }
      return classObj;
    }))
  }

  const onUpdateClassFiles = (classId, files) => {
    setClasses(classes.map((classObj) => {
      if (classObj.id === classId) {
        return {
          ...classObj,
          files
        }
      }
      return classObj;
    }))
  }

  const onChangeConfidenceThreshold = (value) => {
    setConfidenceThreshold(Math.max(0, Math.min(value, 1)));
  }

  const onCalculateAccuracy = () => {
    setCalculationProgress(1);
  }

  return (
    <div className="main">
      <h1>ml5.js Accuracy Calculator</h1>
      <p>Calculate the accuracy of your <a target="_blank" href="https://ml5js.org/">ml5.js</a> image classification model for a given confidence threshold.</p>
      <p>Please ensure the class names match the ones from when you were training the model.</p>
      {console.log(classes, 'classes')}
      <ImageClasses
        classes={classes}
        onUpdateClassFiles={onUpdateClassFiles}
        onUpdateClassName={onUpdateClassName}
        updateClasses={onUpdateClasses}
        onDeleteClass={onDeleteClass}
      />
      <br />
      <AddClassBtn addClass={onAddClass} />
      <br />
      <ConfidenceThresholdInput value={confidenceThreshold} onChange={onChangeConfidenceThreshold} />
      <br />
      <AccuracyDisplay />
      <br />
      <IsCalculatingIndicator calculationProgress={calculationProgress} />
      <CalculateAccuracyBtn calculateAccuracy={onCalculateAccuracy} />
    </div>
  );
}

export default App;
