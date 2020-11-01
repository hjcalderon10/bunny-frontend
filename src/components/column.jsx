import React, { useState, useEffect, Fragment } from "react";
import styled from 'styled-components';
import User from './user/user';
import Task from './task/task';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const List = styled.div`
  padding: 8px;
`;

export default function Column({array, type, user, task}) {

  const onDragEnd = (result) => {

  }

  return (
    <DragDropContext onDragEnd={() => onDragEnd}>
    <Container>
      <Title>{type}</Title>
      <Droppable droppableId={type}>
        {(provided) => (
          <List 
          ref={provided.innerRef}
          {...provided.droppableProps}>
            {type == user ? 
              array.map((element, index) => <User key={index} user={element} index={index}/>) : 
              array.map((element, index) => <Task key={index} task={element} index={index}/>)}
              {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Container>
    </DragDropContext>
  );
}
