import React, {useEffect, useState, Fragment} from "react";
import {Draggable} from 'react-beautiful-dnd';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import colors from './../colors';

export default function Task({task, taskStates, index}) {
  const [newData, setNewData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [options, setOptions] = useState(false);

  const useStyles = makeStyles((theme) => ({
    paper:{
      backgroundColor: (task ? colors[(task.user_id%colors.length)]:'white')
    },
    select:{
      color: 'black !important'
    }
  }));

  const classes = useStyles();


  const trackChanges = (attribute, data) => {
    let obj = {...newData};
    obj[attribute] = data;
    setNewData(obj);
  }

  const ome = () => setOptions(true);
  const oml = () => setOptions(false);
  const sem = () => setEditMode(!editMode);

  useEffect(() => {
    if(
      task.description != newData.description || 
      task.title != newData.title
    ){
      setNewData(task);
    }
  }, [task])

  return (
    <Draggable className={classes.draggable} draggableId={`${index}`} index={index}>
      {(provided) => (
        <Paper className={`paper_container ${classes.paper}`}
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
            onChange={(event) => {
              trackChanges("title", event.target.value);
            }}/>
            <div className={"grow"} />
            <Select className={classes.select}
              native
              disabled={!editMode}
              onChange={(evt) => console.log(evt)}
              value={task.state_id}
            >
              {taskStates.map((ts, idx) => <option key={idx} value={ts.id}>{ts.state}</option>)}
            </Select>
            {options ? 
            <Fragment>
              <div className="pointer" onClick={sem}>
                {editMode ? <SaveIcon/> : <EditIcon/>}
              </div>
              <div className="pointer" onClick={() => console.log("delete")}>
                <DeleteIcon/>
              </div>
            </Fragment>:<Fragment/>} 
          </div>
          <InputBase className="task_description" 
          disabled={!editMode}
          placeholder="My task description" 
          value={editMode ? newData.description : task.description} 
          multiline
          onChange={(event) => {
            trackChanges("description", event.target.value);
          }}/>
        </Paper>
      )}
    </Draggable>
  );
}