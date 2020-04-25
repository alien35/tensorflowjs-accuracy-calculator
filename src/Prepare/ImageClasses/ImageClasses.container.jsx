import React from 'react';
import ImageClass from './ImageClass/ImageClass.container';

function ImageClasses(props) {
  return (
    <div>
      {
        props.classes.map((classObj) => (
          <React.Fragment key={classObj.id}>
            <ImageClass
              onFilesChange={(files) => props.onUpdateClassFiles(classObj.id, files)}
              onUpdateName={(value) => props.onUpdateClassName(classObj.id, value)}
              onDelete={() => props.onDeleteClass(classObj.id)}
              classObj={classObj}
            />
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default ImageClasses;
