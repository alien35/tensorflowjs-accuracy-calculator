import React from 'react';
import Button from '@material-ui/core/Button';

function AddClassBtn(props) {
  return (
    <Button variant="contained"  size="small" color="primary" onClick={props.addClass}>
      [+] Add a class
    </Button>
  )
}

export default AddClassBtn;
