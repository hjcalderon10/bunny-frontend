import React, { Fragment, useState } from "react";
import constants from './../constants';
import styled from 'styled-components';
import User from './user/user';
import UserModal from './user/user-modal';
import Task from './task/task';
import TaskModal from './task/task-modal';
import AddIcon from '@material-ui/icons/Add';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

const List = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: calc(100% - 20px);
  height: calc(100vh - 350px);
  overflow-y: auto;
  padding: 15px;
  background-color: ${props => props.isDraggingOver ? 'WhiteSmoke' : 'white'};
`;

const {user, task} = constants;

export default function Column({array, type, taskStates, dragEndFunc, idSelected, selectUserID, actions}) {
  const [openModal, setOpenModal] = useState(false);

  const om = () => setOpenModal(true);
  const cm = () => setOpenModal(false);
  const dragEnd = (result) => {
    const {destination, source, draggableId} = result
    if(!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    dragEndFunc({destination, source, draggableId, type})
  }

  return (
    <DragDropContext onDragEnd={dragEnd}>
    <div className="column_container">
      <div className="flex-row">
        <h3 className="group_title">{type}</h3>
        { ((idSelected && type === task) || type === user) ?
          <div className="pointer" onClick={om}>
            <AddIcon/>
          </div>
          :
          <Fragment/>
        }
        {
          type === user ?
          <UserModal open={openModal} handleClose={cm} actions={actions}/> :
          <TaskModal open={openModal} handleClose={cm} actions={actions} taskStates={taskStates} idSelected={idSelected}/>
        }
      </div>
      <Droppable droppableId={type}>
        {(provided, snapshot) => (
          <List
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}>
            {type == user ? 
              array.map((element, index) => <User key={index} idSelected={idSelected} selectUserID={selectUserID} user={element} index={index} actions={actions}/>) : 
              array.map((element, index) => <Task key={index} task={element} taskStates={taskStates} index={index} actions={actions}/>)}
              {provided.placeholder}
          </List>
        )}
      </Droppable>
    </div>
    </DragDropContext>
  );
}
