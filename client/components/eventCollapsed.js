import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
    padding: 20,
    ':last-child': {
      paddingBottom: 18
    }
  },
  eventCard: {
    backgroundColor: 'transparent',
    width: '100%',
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
  icon: {
    position: 'absolute',
    right: 240
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
    flexDirection: 'column',
    paddingTop: 0
  }
})

class EventCard extends Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false, expandIcon: 'expandIconOpen' }
    this.handleExpand = this.handleExpand.bind(this)
  }
  handleExpand() {
    const iconStatus = this.state.expanded
      ? 'expandIconOpen'
      : 'expandIconClose'
    this.setState({ expanded: !this.state.expanded, expandIcon: iconStatus })
  }
  render() {
    const { classes } = this.props
    const {
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
      <div>
        <div className={classes.card}>
          <Card className={classes.dateCard}>
            <CardContent className={classes.dateContent}>
              <Typography variant="title" color="textSecondary">
                {month.toUpperCase()}
              </Typography>
              <Typography variant="display1">{day}</Typography>
              <Typography variant="title">{dayOfWeek.toUpperCase()}</Typography>
            </CardContent>
          </Card>
          <Card className={classes.eventCard}>
            <Typography variant="headline" color="secondary" gutterBottom>
              {name}
            </Typography>
            <Typography variant="title" color="textSecondary" gutterBottom>
              Venue: {venues[0].name}
            </Typography>
            <Typography variant="title" color="textSecondary" gutterBottom>
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
            <CardActions>
              <IconButton
                className={`${classes.icon} ${classes[this.state.expandIcon]}`}
                onClick={this.handleExpand}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
        <Collapse
          classes={{ wrapperInner: classes.expansion }}
          in={this.state.expanded}
          timeout="auto"
          unmountOnExit
        >
          <CardMedia className={classes.media} image={imageSrc} />
          <CardContent className={classes.eventDetails}>
            <Typography variant="headline">Event start time: {time}</Typography>
            <Typography variant="headline" color="textSecondary">
              {saleStatus === 'onsale' &&
                `Ticket ${saleStatus}: ${saleStartString}`}
            </Typography>
            <Typography variant="headline" color="textSecondary">
              {genre !== 'Undefined' && `Genre:  ${genre}`}
            </Typography>
            <Typography
              className={classes.headliners}
              variant="title"
              color="textSecondary"
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
