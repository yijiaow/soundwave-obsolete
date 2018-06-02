import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    height: 150,
    borderTop: `1px dashed ${theme.palette.grey[200]}`
  },
  dateCard: {
    display: 'flex',
    justifyContent: 'center',
    width: 90,
    borderRadius: 10,
    '& > dateContent': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  eventCard: {
    backgroundColor: 'transparent',
    width: 480,
    marginLeft: 20,
    marginRight: 40,
    padding: 20
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
  icon: {
    position: 'absolute',
    botton: 0,
    right: 50
  },
  expandIconOpen: {
    transform: 'rotate(0deg)'
  },
  expandIconClose: {
    transform: 'rotate(180deg)'
  },
  expansion: {
    display: 'flex'
  },
  media: {
    width: 150,
    height: 180
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0
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
    if (saleStart === 'onsale') {
      const saleStartString = new Date(saleStart)
        .toString()
        .split(' ')
        .slice(1, 5)
        .join(' ')
      console.log(saleStartString)
    }
    return (
      <div>
        <div className={classes.card}>
          <Card className={classes.dateCard}>
            <CardContent classes={{ root: classes.dateContent }}>
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
            <Typography
              variant="title"
              color="secondary"
              component="ul"
              classes={{ root: classes.headlinerList }}
            >
              {headliners &&
                headliners.slice(0, 3).map(headliner => (
                  <li key={headliner.id} className={classes.headliner}>
                    {headliner.name}
                  </li>
                ))}
            </Typography>
            <Typography variant="title">Start Time: {time}</Typography>
            <IconButton
              className={`${classes.icon} ${classes[this.state.expandIcon]}`}
              onClick={this.handleExpand}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
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
            <Typography variant="headline" color="textSecondary">
              {saleStatus}
            </Typography>
            <Typography variant="headline" color="textSecondary">
              {saleStart}
            </Typography>
            <Typography variant="headline" color="textSecondary">
              {genre !== 'Undefined' && `Genre: ${genre}`}
            </Typography>
            <Typography
              variant="subheading"
              color="textSecondary"
              component="ul"
              classes={{ root: classes.headlinerList }}
            >
              Artists:
              {headliners &&
                headliners.map(headliner => (
                  <li key={headliner.id}>{headliner.name}</li>
                ))}
            </Typography>
          </CardContent>
        </Collapse>
      </div>
    )
  }
}

export default withStyles(styles)(EventCard)
