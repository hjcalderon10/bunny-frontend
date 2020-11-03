import React, {useEffect, useState, Fragment} from "react";
import constants from './../../constants';
import {Draggable} from 'react-beautiful-dnd';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import colors from './../colors';

const {task: taskType, update, remove} = constants

export default function Task({task, taskStates, index, actions}) {
  const [newData, setNewData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [options, setOptions] = useState(false);

  const useStyles = makeStyles((theme) => ({
    paper:{
      backgroundColor: (task ? colors[(task.user_id%colors.length)]:'white')
    },
    select:{
      color: '#202020 !important'
    }
  }));

  const classes = useStyles();

  const titleChange = (event) => trackChanges("title", event.target.value)
  const descriptionChange = (event) => trackChanges("description", event.target.value)
  const evtChange = (event) => trackChanges("state_id", parseInt(event.target.value))

  const trackChanges = (attribute, data) => {
    let obj = {...newData};
    obj[attribute] = data;
    setNewData(obj);
  }

  const ome = () => setOptions(true);
  const oml = () => setOptions(false);
  const sem = () => {
    if(
      task.description != newData.description || 
      task.title != newData.title ||
      task.state_id != newData.state_id
    ){
      actions(taskType, update, newData);
    }
    setEditMode(!editMode)
  };
  const deleteTask = () => 
  {
    actions(taskType, remove, newData.id)
  }

  useEffect(() => {
    if(
      task.description != newData.description || 
      task.title != newData.title ||
      task.state_id != newData.state_id
    ){
      setNewData(task);
    }
  }, [task])

  return (
    <Draggable className={classes.draggable} draggableId={`${index}`} index={index}>
      {(provided) => (
        <Paper className={`paper_container task_container ${classes.paper}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseEnter={ome}
          onMouseLeave={oml}
          >
          <div className='title_with_options'>
            <InputBase className="task_title" 
            disabled={!editMode}
            placeholder="My title" 
            value={editMode ? newData.title : task.title} 
            onChange={titleChange}/>
            <div className={"grow"} />
            {(taskStates && taskStates.length > 0 && task) ? 
              <Select className={classes.select}
                native
                disabled={!editMode}
                onChange={evtChange}
                defaultValue={`${task.state_id}`}
              >
                {taskStates.map((ts, idx) => <option key={idx} value={ts.id}>{ts.state}</option>)}
              </Select> :
              <Fragment/>
            }
            {options ? 
            <Fragment>
              <div className="pointer" onClick={sem}>
                {editMode ? <SaveIcon/> : <EditIcon/>}
              </div>
              <div className="pointer" onClick={deleteTask}>
                <DeleteIcon/>
              </div>
            </Fragment>:<Fragment/>} 
          </div>
          <InputBase className="task_description" 
          disabled={!editMode}
          placeholder="My task description" 
          value={editMode ? newData.description : task.description} 
          multiline
          onChange={descriptionChange}/>
        </Paper>
      )}
    </Draggable>
  );
}