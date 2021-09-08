import React, { ChangeEvent } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";

type TodoItemProps = {
  id: string;
  content: string;
  isDone: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  handleRemove: Function;
};

function TodoItem(props: TodoItemProps) {
  const { id, content, isDone, handleChange, handleRemove } = props;
  return(
    <FormGroup row={true}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isDone}
            onChange={handleChange}
            value={id}
            color="primary"
          />
        }
        label={content}
      />
      <Button color="primary">Edit</Button>
      <Button color="secondary" onClick={() => handleRemove(id)}>Remove</Button>
    </FormGroup>
  );
}

export default TodoItem;