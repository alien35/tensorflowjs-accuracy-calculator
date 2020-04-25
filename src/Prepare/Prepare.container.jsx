import React from 'react';
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
  const [ doneCalculating, setDoneCalculating ] = React.useState(false);
  const [ isCalculating, setIsCalculating ] = React.useState(false);
  const [ mlFolderName, setMLFolderName ] = React.useState('my-model-folder');
  const [ scores, setScores ] = React.useState([]);
  const [ numImagesToCalculate, setNumImagesToCalculate ] = React.useState(0);
  const [ numImagesCalculated, setNumImagesCalculated ] = React.useState(0);
  const [ successImages, setSuccessImages ] = React.useState([]);
  const [ failImages, setFailImages ] = React.useState([]);



  console.log(scores, 'scores...');

  React.useEffect(() => {
    console.log(scores, scores.length, numImagesToCalculate, 'hello', doneCalculating, scores[1])
    if (numImagesToCalculate
      && scores.length
      && scores.length === numImagesToCalculate
      && !doneCalculating) {
        setDoneCalculating(true);
        setIsCalculating(false);
        calculateScores();
        console.log('done here bro');
    }
  });

  const calculateScores = () => {
    scores.map((score) => {
      let imagePassed = true;
      score.result.forEach((scoreResult) => {
        const normalizedScore = scoreResult.confidence > 1 ? 0 : scoreResult.confidence;
        if (scoreResult.label === score.expected) {
          if (normalizedScore < confidenceThreshold) {
            imagePassed = false;
          }
        } else {
          if (normalizedScore >= confidenceThreshold) {
            imagePassed = false;
          }
        }
      })
      if (imagePassed) {
        setSuccessImages([...successImages, score]);
      } else {
        setFailImages([...failImages, score]);
      }
    })
  }

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

  const classifyImage = (files, index, classObj, imageClassifier, _scores) => {
    console.log(files[index], 'file to check??', index, files.length);
    if (index >= files.length) {
      return null;
    }
    console.log('this far man')
    const reader = new FileReader();
    console.log('fi 2')
    reader.onload = async (e) => {
      console.log('on load')
      const domImg = document.createElement('img');
      domImg.src = e.target.result;
      const result = await imageClassifier.predict(domImg);
      // setScores([...scores, {expected: classObj.name, result}]);
      console.log(result ,' result here')
      _scores.push({expected: classObj.name, result, imgSrc: e.target.result});
      console.log(_scores, '_scores down here');
      setScores(_scores);
      setCalculationProgress(_scores.length);
      classifyImage(files, index + 1, classObj, imageClassifier, _scores);
    }
    console.log('starting read as data')
    reader.readAsDataURL(files[index]);
    
  }

  const onCalculateAccuracy = async () => {
    setNumImagesCalculated(0);
    setIsCalculating(true);
    setDoneCalculating(false);
    let _numImagesToCalculate = 0;
    classes.forEach((classObj) => {
      _numImagesToCalculate += Array.from(classObj.files).length;
    })
    setNumImagesToCalculate(_numImagesToCalculate);
    let numImagesCalculated = 0;
    const imageClassifier = await ml5.imageClassifier(`${window.location.origin}/models/${mlFolderName}/model.json`);
    

    classes.forEach((classObj) => {
      const _scores = [];
      const filesArray = Array.from(classObj.files);
      classifyImage(filesArray, 0, classObj, imageClassifier, _scores);
    })

  }

  const onChangeMLFolderName = (value) => {
    setMLFolderName(value);
  }

  return (
    <div className="main">
      <h1>Tensorflow.js ML Model Accuracy Calculator</h1>
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
      <CalculateAccuracyBtn isCalculating={isCalculating} calculateAccuracy={onCalculateAccuracy} />
      <IsCalculatingIndicator doneCalculating={doneCalculating} calculationProgress={calculationProgress} />
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
      <AccuracyDisplay confidenceThreshold={confidenceThreshold} doneCalculating={doneCalculating} successImages={successImages} failImages={failImages} scores={scores} />
    </div>
  );
}

export default App;
