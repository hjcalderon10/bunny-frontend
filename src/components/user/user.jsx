import React, { useState, useEffect, Fragment } from "react";
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export default function Users({user, index}) {
  return (
    <Draggable draggableId={`${user.id}`} index={index}>
      {(provided) => (
        <Container 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
          {user.name}
        </Container>
      )}
    </Draggable>
  );
}