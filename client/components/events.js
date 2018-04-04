import React from 'react'
import { List, ListItem } from 'material-ui/List'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center'
  }
}
export const Events = props => {
  return (
    <div style={styles.root}>
      <List>
        {props.events.map(event => (
          <ListItem key={event.id}>
            <Card>
              <CardHeader
                title={event.name}
                subtitle={
                  <span>Start Date: {event.dates.start.localDate}</span>
                }
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                <p>{event._embedded.venues[0].name}</p>
              </CardText>
            </Card>
            <Divider />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
