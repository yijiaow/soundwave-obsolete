import React from 'react'
import { List, ListItem } from 'material-ui/List'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: 840
  }
}
export const Events = props => {
  return props.renderStatus ? (
    <div style={styles.root}>
      <List style={styles.list}>
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
  ) : null
}
