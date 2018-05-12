import React from 'react'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  collapsed: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  }
}

const EventCollapsed = props => {
  let [dayOfWeek, month, day, , time] = new Date(props.dateTime)
    .toString()
    .split(' ')
  return (
    <div>
      <Card>
        <CardContent>
          <Typography component="h3">{month.toUpperCase()}</Typography>
          <Typography component="h2">{day}</Typography>
          <Typography component="h4">{dayOfWeek}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={props.name} subheader={props.venues[0].name} />
        <CardContent>
          {props.headliners &&
            props.headliners.slice(0, 3).map(headliner => (
              <Typography key={headliner.id} component="p">
                {headliner.name}
              </Typography>
            ))}
          <Typography component="p">{time}</Typography>
        </CardContent>
      </Card>
      <Button variant="raised">More Info</Button>
    </div>
  )
}

const Events = props => {
  const { classes } = props
  if (!props.events || props.events.length === 0) {
    return null
  }
  return (
    <div className={classes.root}>
      {props.events.map(event => {
        return (
          <EventCollapsed
            className={classes.collapsed}
            key={event.id}
            name={event.name}
            dateTime={event.dates.start.dateTime}
            venues={event._embedded.venues}
            headliners={event._embedded.attractions}
          />
        )
      })}
    </div>
  )
}

export default withStyles(styles)(Events)
