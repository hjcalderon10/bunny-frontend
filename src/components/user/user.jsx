import React, {useEffect, useState, Fragment} from "react";
import constants from './../../constants';
import {Draggable} from 'react-beautiful-dnd';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import colors from './../colors';

const {user: userType, update, remove} = constants

export default function User({user, index, idSelected, selectUserID, actions}) {
  const [newData, setNewData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [options, setOptions] = useState(false);

  const useStyles = makeStyles((theme) => ({
    paper:{
      backgroundColor: (user ? colors[(user.id%colors.length)]:'white')
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
  const sui = () => selectUserID(user.id);
  const sem = () => {
    if(
      user.nickname != newData.nickname || 
      user.name != newData.name
    ){
      actions(userType, update, newData);
    }
    setEditMode(!editMode)
  };
  const deleteUser = () => 
  {
    actions(userType, remove, newData.id)
  }

  

  useEffect(() => {
    if(
      user.nickname != newData.nickname || 
      user.name != newData.name
    ){
      setNewData(user);
    }
  }, [user])

  return (
    <Draggable draggableId={`${index}`} index={index}>
      {(provided) => (
        <Paper className={`paper_container ${classes.paper}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseEnter={ome}
          onMouseLeave={oml}
          >
          <div className='title_with_options'>
            <InputBase className="user_name" 
            disabled={!editMode}
            placeholder="My Name" 
            value={editMode ? newData.name : user.name ? user.name : ''} 
            onChange={(event) => {
              trackChanges("name", event.target.value);
            }}/>
            <div className={"grow"} />
            <div className="pointer" onClick={sui}>
              {
                idSelected == user.id ? 
                <YoutubeSearchedForIcon/> :
                <SearchIcon/>
              }
              
            </div>
            {options ? 
            <Fragment>
              <div className="pointer" onClick={sem}>
                {editMode ? <SaveIcon/> : <EditIcon/>}
              </div>
              <div className="pointer" onClick={deleteUser}>
                <DeleteIcon/>
              </div>
            </Fragment>:<Fragment/>} 
          </div>
          <InputBase className="user_nickname" 
          disabled={!editMode}
          placeholder="My user nickname" 
          value={editMode ? newData.nickname : user.nickname ? user.nickname: ''} 
          multiline
          onChange={(event) => {
            trackChanges("nickname", event.target.value);
          }}/>
        </Paper>
      )}
    </Draggable>
  );
}