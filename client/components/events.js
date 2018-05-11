import React from 'react'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  eventCard: {
    backgroundColor: 'transparent'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  }
}
const Events = props => {
  const { classes } = props
  if (!props.events) {
    return null
  }
  return (
    <div className={classes.root}>
      {props.events.map(event => (
        <Card key={event.id} className={classes.eventCard}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {event.name}
            </Typography>
            <Typography component="h3">
              Start Data: {event.dates.start.localDate}
            </Typography>
            <Typography component="h3">
              {event._embedded.venues[0].name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default withStyles(styles)(Events)
