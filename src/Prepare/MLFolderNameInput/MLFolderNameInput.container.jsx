import React from 'react';

function MLFolderNameInput(props) {

  const onChange = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <div>
      ML Folder name: <input value={props.value} type="text" onChange={onChange} />
      <p>
        File path: /public/models/{props.value}/model.json
      </p>
    </div>
  )
}

export default MLFolderNameInput;
