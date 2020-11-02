import React, { useState, useEffect, Fragment } from "react";
import styled from 'styled-components';
import User from './user/user';
import Task from './task/task';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

const List = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: calc(100% - 20px);
  height: calc(100vh - 350px);
  overflow-y: auto;
  padding: 15px 15px;
  background-color: ${props => props.isDraggingOver ? 'lightgrey' : 'white'};
`;

export default function Column({array, type, user, task, taskStates, dragEndFunc, idSelected, selectUserID}) {

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
      <h3 className="group_title">{type}</h3>
      <Droppable droppableId={type}>
        {(provided, snapshot) => (
          <List
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}>
            {type == user ? 
              array.map((element, index) => <User key={index} idSelected={idSelected} selectUserID={selectUserID} user={element} index={index}/>) : 
              array.map((element, index) => <Task key={index} task={element} taskStates={taskStates} index={index}/>)}
              {provided.placeholder}
          </List>
        )}
      </Droppable>
    </div>
    </DragDropContext>
  );
}
