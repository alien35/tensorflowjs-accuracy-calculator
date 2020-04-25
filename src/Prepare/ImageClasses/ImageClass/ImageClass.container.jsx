import React from 'react';

function ImageClass(props) {

  const onNameChange = (e) => {
    props.onUpdateName(e.target.value);
  }

  const onFilesChange = (e) => {
    console.log('files change here.', e.target.files);
    props.onFilesChange(e.target.files);
  }

  return (
    <div className="class-obj">
      <input type="text" placeholder="Class name" onChange={onNameChange} />
      <input type="file" onChange={onFilesChange} multiple accept="image/png|image/jpg|image/jpeg" />
      <button onClick={props.onDelete}>Delete</button>
    </div>
  )
}

export default ImageClass;
