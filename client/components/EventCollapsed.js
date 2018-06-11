import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    display: 'flex',
    paddingTop: 24,
    borderTop: `1px dashed ${theme.palette.grey[200]}`,
    marginBottom: 20
  },
  dateCard: {
    display: 'flex',
    justifyContent: 'center',
    width: 90,
    height: 116,
    borderRadius: 12
  },
  dateContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 36,
    textAligh: 'center'
  },
  eventCard: {
    backgroundColor: 'transparent',
    width: '80%',
    marginLeft: 20,
    marginRight: 40
  },
  headliners: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    listStyle: 'none'
  },
  listItem: {
    marginRight: 8,
    fontWeight: 400
  },
  actionCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 100
  },
  saveButton: {
    marginRight: 15,
    whiteSpace: 'nowrap'
  },
  icon: {
    alignSelf: 'flex-end'
  },
  expandIconOpen: {
    transform: 'rotate(0deg)'
  },
  expandIconClose: {
    transform: 'rotate(180deg)'
  },
  expansion: {
    display: 'flex',
    marginBottom: 24
  },
  media: {
    width: 180,
    height: 120,
    borderRadius: 12
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'column'
  }
})

class EventCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      expandIcon: 'expandIconOpen',
      currentEvent: this.props
    }
    this.handleExpand = this.handleExpand.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
  handleExpand(event) {
    event.stopPropagation()
    const iconStatus = this.state.expanded
      ? 'expandIconOpen'
      : 'expandIconClose'
    this.setState({ expanded: !this.state.expanded, expandIcon: iconStatus })
  }
  handleSave(event) {
    const saveEvent = JSON.parse(event.currentTarget.getAttribute('event'))
    fetch(`/events/${saveEvent.id}/save`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        user: {
          email: sessionStorage.getItem('email'),
          token: sessionStorage.getItem('token')
        },
        event: saveEvent
      })
    }).catch(err => console.error(err))
  }
  render() {
    const { classes } = this.props
    const {
      id,
      name,
      dateTime,
      venues,
      headliners,
      imageSrc,
      genre,
      saleStatus,
      saleStart
    } = this.props
    let [dayOfWeek, month, day, , time] = new Date(dateTime)
      .toString()
      .split(' ')
    let saleStartString
    if (saleStatus === 'onsale') {
      saleStartString = new Date(saleStart)
        .toString()
        .split(' ')
        .slice(1, 5)
        .join(' ')
    }
    return (
      <div
        event={JSON.stringify({
          id,
          name,
          dateTime,
          venues,
          headliners,
          imageSrc,
          genre,
          saleStatus,
          saleStartString
        })}
        onClick={this.handleSave}
      >
        <div className={classes.card}>
          <Card className={classes.dateCard}>
            <CardContent className={classes.dateContent}>
              <Typography variant="headline" color="secondary">
                {month.toUpperCase()}
              </Typography>
              <Typography variant="headline" color="secondary">
                {day}
              </Typography>
              <Typography variant="display1">
                {dayOfWeek.toUpperCase()}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.eventCard}>
            <Typography variant="headline" color="secondary" gutterBottom>
              {name}
            </Typography>
            <Typography variant="title" gutterBottom>
              Venue: {venues[0].name}
            </Typography>
            <Typography variant="title" gutterBottom>
              Location: {venues[0].address.line1}, {venues[0].city.name}
            </Typography>
            <Typography
              variant="title"
              color="secondary"
              component="ul"
              className={classes.headliners}
            >
              {headliners &&
                headliners.slice(0, 3).map(headliner => (
                  <li key={headliner.id} className={classes.listItem}>
                    {headliner.name}
                  </li>
                ))}
            </Typography>
          </Card>
          <div className={classes.actionCard}>
            <Button
              className={classes.saveButton}
              variant="contained"
              color="secondary"
              size="small"
            >
              Track Event
            </Button>
            <IconButton
              className={`${classes.icon} ${classes[this.state.expandIcon]}`}
              onClick={this.handleExpand}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
        <Collapse
          classes={{ wrapperInner: classes.expansion }}
          in={this.state.expanded}
          timeout="auto"
          unmountOnExit
        >
          <CardMedia className={classes.media} image={imageSrc} />
          <CardContent className={classes.eventDetails}>
            <Typography variant="subheading">
              Event start time: {time}
            </Typography>
            <Typography variant="subheading">
              {saleStatus === 'onsale' &&
                `Ticket ${saleStatus}: ${saleStartString}`}
            </Typography>
            <Typography variant="title" gutterBottom>
              {genre !== 'Undefined' && `Genre:  ${genre}`}
            </Typography>
            <Typography
              className={classes.headliners}
              variant="title"
              component="ul"
            >
              {headliners &&
                headliners.map(headliner => (
                  <li key={headliner.id} className={classes.listItem}>
                    {headliner.name}
                  </li>
                ))}
            </Typography>
          </CardContent>
        </Collapse>
      </div>
    )
  }
}

export default withStyles(styles)(EventCard)
