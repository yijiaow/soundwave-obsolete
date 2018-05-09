import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { CardMedia } from 'material-ui/Card'
import ArrowLeft from '@material-ui/icons/ChevronLeft'
import ArrowRight from '@material-ui/icons/ChevronRight'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    position: 'relative',
    top: 250,
    width: 1200,
    height: 400,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  media: {
    width: 600,
    height: 400
  },
  slide: {
    position: 'absolute'
  },
  middle: {
    left: 300,
    zIndex: 5
  },
  left: {
    left: 0,
    zIndex: 4
  },
  right: {
    right: 0,
    zIndex: 3
  },
  leftArrow: {
    position: 'absolute',
    top: 180,
    left: 320,
    zIndex: 10
  },
  rightArrow: {
    position: 'absolute',
    top: 180,
    right: 320,
    zIndex: 10
  }
}

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0 }
    this.timerID = null
    this.slideToPrev = this.slideToPrev.bind(this)
    this.slideToNext = this.slideToNext.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
  }
  slideToPrev() {
    const prev =
      this.state.activeIndex <= 0
        ? this.props.festivals.length - 1
        : this.state.activeIndex - 1
    this.setState({ activeIndex: prev })
  }
  slideToNext() {
    const next =
      this.state.activeIndex >= this.props.festivals.length - 1
        ? 0
        : this.state.activeIndex + 1
    this.setState({ activeIndex: next })
  }
  pause() {
    clearInterval(this.timerID)
  }
  resume() {
    this.timerID = setInterval(() => this.slideToNext(), 2500)
  }
  render() {
    const { classes } = this.props
    const slides = this.props.festivals
    const curr = this.state.activeIndex
    const prev = curr <= 0 ? slides.length - 1 : curr - 1
    const next = curr >= slides.length - 1 ? 0 : curr + 1
    const displaySlides = [slides[prev]].concat(slides[curr], slides[next])
    if (!this.props.renderStatus) {
      return null
    }
    return (
      <div
        className={classes.root}
        onMouseOver={this.pause}
        onMouseOut={this.resume}
      >
        <ArrowLeft className={classes.leftArrow} onClick={this.slideToPrev} />
        <Paper
          key={prev}
          className={`${classes.left} ${classes.slide}`}
          elevation={7}
        >
          <CardMedia
            className={classes.media}
            title={displaySlides[0].title}
            image={displaySlides[0].imageSrc}
          />
        </Paper>
        <Paper
          key={curr}
          className={`${classes.middle} ${classes.slide}`}
          elevation={10}
        >
          <CardMedia
            className={classes.media}
            title={displaySlides[1].title}
            image={displaySlides[1].imageSrc}
          />
        </Paper>
        <Paper
          key={next}
          className={`${classes.right} ${classes.slide}`}
          elevation={7}
        >
          <CardMedia
            className={classes.media}
            title={displaySlides[2].title}
            image={displaySlides[2].imageSrc}
          />
        </Paper>
        <ArrowRight className={classes.rightArrow} onClick={this.slideToNext} />
      </div>
    )
  }
}
export default withStyles(styles)(Carousel)
