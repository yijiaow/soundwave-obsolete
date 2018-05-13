import React from 'react'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

const styles = theme => ({
  collapsed: {
    display: 'flex',
    alignItems: 'center',
    height: 150,
    borderBottom: `1px dashed ${theme.palette.grey[200]}`,
    backgroundColor: 'transparent'
  },
  content: {
    width: 480,
    marginLeft: 20,
    marginRight: 40
  },
  date: {
    borderRadius: 10
  },
  headlinerList: {
    display: 'flex',
    padding: 0,
    listStyle: 'none'
  },
  headliner: {
    marginRight: 8,
    fontWeight: 400
  },
  expandBtn: {
    borderRadius: 10,
    whiteSpace: 'nowrap'
  }
})

const EventCollapsed = props => {
  const { classes } = props
  let [dayOfWeek, month, day, , time] = new Date(props.dateTime)
    .toString()
    .split(' ')
  return (
    <div className={classes.collapsed}>
      <Card classes={{ root: classes.date }}>
        <CardContent>
          <Typography variant="title" color="textSecondary">
            {month.toUpperCase()}
          </Typography>
          <Typography variant="display1">{day}</Typography>
          <Typography variant="title">{dayOfWeek.toUpperCase()}</Typography>
        </CardContent>
      </Card>
      <div className={classes.content}>
        <Typography variant="title" color="secondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="subheading" color="textSecondary" gutterBottom>
          Venue: {props.venues[0].name}
        </Typography>
        <Typography
          variant="subheading"
          color="textSecondary"
          component="ul"
          classes={{ root: classes.headlinerList }}
        >
          {props.headliners &&
            props.headliners.slice(0, 3).map(headliner => (
              <li key={headliner.id} className={classes.headliner}>
                {headliner.name}
              </li>
            ))}
        </Typography>
        <Typography variant="body1">Start Time: {time}</Typography>
      </div>
      <Button
        variant="raised"
        color="primary"
        classes={{ root: classes.expandBtn }}
      >
        More Info
      </Button>
    </div>
  )
}

export default withStyles(styles)(EventCollapsed)
