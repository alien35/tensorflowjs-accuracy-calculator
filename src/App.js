import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageClasses from './ImageClasses/ImageClasses.container';
import AddClassBtn from './AddClassBtn/AddClassBtn.container';
import AccuracyDisplay from './AccuracyDisplay/AccuracyDisplay.container';
import ConfidenceThresholdInput from './ConfidenceThresholdInput/ConfidenceThresholdInput.container';
import CalculateAccuracyBtn from './CalculateAccuracyBtn/CalculateAccuracyBtn.container';
import IsCalculatingIndicator from './IsCalculatingIndicator/IsCalculatingIndicator.container';
import MLFolderNameInput from './MLFolderNameInput/MLFolderNameInput.container';

function App() {

  const [ classes, setClasses ] = React.useState([{name: '', id: 1, files: null}]);
  const [ classIdToUse, setClassIdToUse ] = React.useState(2);
  const [ confidenceThreshold, setConfidenceThreshold ] = React.useState(0.9);
  const [ calculationProgress, setCalculationProgress ] = React.useState(0);
  const [ mlFolderName, setMLFolderName ] = React.useState('my-model-folder');

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

  const onCalculateAccuracy = async () => {
    setCalculationProgress(1);
    const imageClassifier = await ml5.imageClassifier(`${window.location.origin}/models/${mlFolderName}/model.json`);
    setCalculationProgress(5);
    
    classes.forEach((classObj) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        console.log(e.target.result, 'target hereee');
        const domImg = document.createElement('img');
        domImg.src = e.target.result;
        const result = await imageClassifier.predict(domImg);
        console.log(result, 'result here');
      }
      
      console.log(classObj, 'obj here man..');
      Array.from(classObj.files).forEach(async (file) => {
        reader.readAsDataURL(file);
      })
    })

  }

  const onChangeMLFolderName = (value) => {
    setMLFolderName(value);
  }

  return (
    <div className="main">
      <h1>ml5.js Accuracy Calculator</h1>
      <p>Calculate the accuracy of your <a href="https://www.tensorflow.org/js" target="_blank">tensorflow.js</a> image classification model for a given confidence threshold.</p>
      <p>If you don't have a model to test yet, get started at <a href="https://teachablemachine.withgoogle.com/train" target="_blank">https://teachablemachine.withgoogle.com/train</a></p>
      <br />
      <hr />
      <br />
      <h3>1. Add test images for each ML model class</h3>
      <ImageClasses
        classes={classes}
        onUpdateClassFiles={onUpdateClassFiles}
        onUpdateClassName={onUpdateClassName}
        updateClasses={onUpdateClasses}
        onDeleteClass={onDeleteClass}
      />
      <br />
      <AddClassBtn addClass={onAddClass} />
      <p>Note: Please ensure the class names match the ones from when you were training the model.</p>
      <br />
      <br />
      <hr />
      <br />
      <h3>2. Configure the ML model file path</h3>
      <MLFolderNameInput value={mlFolderName} onChange={onChangeMLFolderName} />
      <CalculateAccuracyBtn calculateAccuracy={onCalculateAccuracy} />
      <IsCalculatingIndicator calculationProgress={calculationProgress} />
      <br />
      <br />
      <hr />
      <br />
      <h3>
        3. Inspect the results
      </h3>
      <p>
        Confidence threshold: <ConfidenceThresholdInput value={confidenceThreshold} onChange={onChangeConfidenceThreshold} />
      </p>
      <AccuracyDisplay />
    </div>
  );
}

export default App;
