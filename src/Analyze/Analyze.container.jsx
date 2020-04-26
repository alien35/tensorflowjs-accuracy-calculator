import React from 'react';
import AccuracyDisplay from './AccuracyDisplay/AccuracyDisplay.container';
import ConfidenceThresholdInput from './ConfidenceThresholdInput/ConfidenceThresholdInput.container';
import { connect } from 'react-redux';
import * as ScoreActions from '../redux/actions/score.actions';
import { bindActionCreators } from 'redux';

function Analyze(props) {

  const [ confidenceThreshold, setConfidenceThreshold ] = React.useState(0.9);
  const [ successImages, setSuccessImages ] = React.useState([]);
  const [ failImages, setFailImages ] = React.useState([]);
  const [ scoresCalculated, setScoresCalculated ] = React.useState(false);

  React.useEffect(() => {
    if (!scoresCalculated) {
      setScoresCalculated(true);
      calculateScores();
    }
  });

  const imagePassed = (imageResult, expected) => {
    let passed = true;
    const normalizedScore = imageResult.confidence > 1 ? 0 : imageResult.confidence;
    if (imageResult.label === expected) {
      if (normalizedScore < confidenceThreshold) {
        imagePassed = false;
      }
    } else {
      if (normalizedScore >= confidenceThreshold) {
        imagePassed = false;
      }
    }
    return passed;
  }

  const calculateScores = () => {
    let _successImages = [];
    let _failureImages = [];
    props.scores.results.forEach((score) => {
      const _imagePassed = imagePassed(score.result, score.expected);
      if (_imagePassed) {
        _successImages.push(score);
      } else {
        _failureImages.push(score);
      }
    })
    setSuccessImages(_successImages);
    setFailImages(_failureImages);
  }

  const onChangeConfidenceThreshold = (value) => {
    setConfidenceThreshold(Math.max(0, Math.min(value, 1)));
  }

  return (
    <div className="main">
      <h3>
        Analyze the results
      </h3>
      <p>
        Confidence threshold: <ConfidenceThresholdInput value={confidenceThreshold} onChange={onChangeConfidenceThreshold} />
      </p>
      <AccuracyDisplay confidenceThreshold={confidenceThreshold} successImages={successImages} failImages={failImages} />
    </div>
  );
}

const mapStateToProps = state => {
    return {
      scores: state.scores,
    };
};

const mapDispatchToProps = (dispatch) => ({
  scoreActions: bindActionCreators(ScoreActions, dispatch)
    // inspectionsActions: bindActionCreators(InspectionsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Analyze);
