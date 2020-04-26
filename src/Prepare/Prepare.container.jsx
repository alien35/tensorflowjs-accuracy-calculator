import React from 'react';
import ImageClasses from './ImageClasses/ImageClasses.container';
import AddClassBtn from './AddClassBtn/AddClassBtn.container';
import CalculateAccuracyBtn from './CalculateAccuracyBtn/CalculateAccuracyBtn.container';
import IsCalculatingIndicator from './IsCalculatingIndicator/IsCalculatingIndicator.container';
import MLFolderNameInput from './MLFolderNameInput/MLFolderNameInput.container';
import { connect } from 'react-redux';
import * as ScoreActions from '../redux/actions/score.actions';
import { bindActionCreators } from 'redux';

function Prepare(props) {

  const [ classes, setClasses ] = React.useState([{name: '', id: 1, files: null}]);
  const [ classIdToUse, setClassIdToUse ] = React.useState(2);
  const [ confidenceThreshold, setConfidenceThreshold ] = React.useState(0.9);
  const [ calculationProgress, setCalculationProgress ] = React.useState('');
  const [ doneCalculating, setDoneCalculating ] = React.useState(false);
  const [ isCalculating, setIsCalculating ] = React.useState(false);
  const [ mlFolderName, setMLFolderName ] = React.useState('my-model-folder');
  const [ scores, setScores ] = React.useState([]);
  const [ numImagesToCalculate, setNumImagesToCalculate ] = React.useState(0);
  const [ successImages, setSuccessImages ] = React.useState([]);
  const [ failImages, setFailImages ] = React.useState([]);

  React.useEffect(() => {
    if (numImagesToCalculate
      && scores.length
      && scores.length === numImagesToCalculate
      && !doneCalculating) {
        setDoneCalculating(true);
        setIsCalculating(false);
        calculateScores();
    }
  });

  const calculateScores = () => {
    scores.forEach((score) => {
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

  const classifyImage = (files, index, classObj, imageClassifier, _scores, classIndex) => {
    if (index >= files.length) {
      const newClassIndex = classIndex + 1;
      if (classes[newClassIndex]) {
        const filesArray = Array.from(classes[newClassIndex].files);
        return classifyImage(filesArray, 0, classes[newClassIndex], imageClassifier, _scores, newClassIndex);
      }
      return null;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const domImg = document.createElement('img');
      domImg.src = e.target.result;
      const result = await imageClassifier.predict(domImg);
      // setScores([...scores, {expected: classObj.name, result}]);
      _scores.push({expected: classObj.name, result, imgSrc: e.target.result});
      setScores(_scores);
      props.scoreActions.setScores(_scores, numImagesToCalculate);
      setCalculationProgress(`${_scores.length} image${_scores.length === 1 ? '' : 's'} analyzed.`);
      classifyImage(files, index + 1, classObj, imageClassifier, _scores, classIndex);
    }
    reader.readAsDataURL(files[index]);
    
  }

  const onCalculateAccuracy = async () => {
    setIsCalculating(true);
    setDoneCalculating(false);
    setCalculationProgress('Loading model');
    let _numImagesToCalculate = 0;
    classes.forEach((classObj) => {
      _numImagesToCalculate += Array.from(classObj.files).length;
    })
    setNumImagesToCalculate(_numImagesToCalculate);
    let numImagesCalculated = 0;
    const imageClassifier = await ml5.imageClassifier(`${window.location.origin}/models/${mlFolderName}/model.json`);
    const _scores = [];
    const filesArray = Array.from(classes[0].files);
    classifyImage(filesArray, 0, classes[0], imageClassifier, _scores, 0);

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
      <IsCalculatingIndicator scores={props.scores} doneCalculating={doneCalculating} calculationProgress={calculationProgress} />
      <br />
      <br />
      <hr />
      <br />
    </div>
  );
}

const mapStateToProps = state => {
    return {
      scores: state.scores.results,
    };
};

const mapDispatchToProps = (dispatch) => ({
  scoreActions: bindActionCreators(ScoreActions, dispatch)
    // inspectionsActions: bindActionCreators(InspectionsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prepare);
