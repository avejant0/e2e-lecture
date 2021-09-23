import React from "react";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@material-ui/core";

type TodoItemProps = {
  id: string;
  content: string;
  isDone: boolean;
  handleChange: Function;
  handleEdit: Function;
  handleRemove: Function;
};

type Mode = 'edit' | 'view';

function TodoItem(props: TodoItemProps) {
  const { id, content, isDone, handleChange, handleEdit, handleRemove } = props;
  const [mode, setMode] = React.useState<Mode>('view');
  const [editedText, setEditedText] = React.useState('');

  const isEditMode = () => mode === 'edit';

  const switchToEdit = () => {
    setMode('edit');
    setEditedText(props.content);
  }

  const handleInputChange = (event: any) => {
    setEditedText(event.target.value);
  };

  const saveEdited = () => {
    if (editedText !== '') {
      handleEdit(id, editedText);
    }

    setMode('view');
    setEditedText('');
  };

  return(
    <FormGroup row={true} className="TodoItem-container" data-cy="todo-item">
      {!isEditMode() &&
        <>
          <FormControlLabel
            control={
            <Checkbox
              checked={isDone}
              onChange={() => handleChange(id)}
              value={id}
              color="primary"
            />
            }
            label={content}
          />
          <Button color="primary" onClick={switchToEdit}>Edit</Button>
        </>
      }
      {isEditMode() && 
        <>
          <TextField value={editedText} onChange={handleInputChange}/>
          <Button color="primary" onClick={saveEdited}>Save</Button> 
        </> }
      <Button color="secondary" onClick={() => handleRemove(id)}>Remove</Button>
    </FormGroup>
  );
}

export default TodoItem;