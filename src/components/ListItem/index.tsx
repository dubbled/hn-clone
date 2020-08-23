import React from 'react'

import { Card, ListGroup } from 'react-bootstrap'
export default (props) => (
  <ListGroup.Item key={props.story.url}>
    <h6 style={{textAlign: 'left'}}>{props.story.title}</h6>
  </ListGroup.Item>
)