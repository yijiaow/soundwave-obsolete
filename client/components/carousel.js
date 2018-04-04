import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { CardMedia, CardTitle } from 'material-ui/Card'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

const styles = {
  root: {
    width: 900,
    height: 500
  },
  middleSlide: {
    position: 'absolute',
    left: 200,
    zIndex: 1
  },
  leftSlide: {
    position: 'absolute',
    left: 50,
    zIndex: 0
  },
  rightSlide: {
    position: 'absolute',
    right: 50,
    zIndex: -1
  },
  image: {
    width: 600,
    height: 400
  },
  leftArrow: {
    position: 'absolute',
    top: 180,
    left: 220,
    zIndex: 10
  },
  rightArrow: {
    position: 'absolute',
    top: 180,
    right: 220,
    zIndex: 10
  }
}

export class Carousel extends Component {
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
  componentDidMount() {
    this.timerID = setInterval(() => this.slideToNext(), 2500)
  }
  pause() {
    clearInterval(this.timerID)
  }
  resume() {
    this.timerID = setInterval(() => this.slideToNext(), 2500)
  }
  render() {
    const slides = this.props.festivals
    const curr = this.state.activeIndex
    const prev = curr <= 0 ? slides.length - 1 : curr - 1
    const next = curr >= slides.length - 1 ? 0 : curr + 1
    const displaySlides = [slides[prev]].concat(slides[curr], slides[next])
    return (
      <div
        style={styles.root}
        onMouseOver={this.pause}
        onMouseOut={this.resume}
      >
        <NavigationChevronLeft
          style={styles.leftArrow}
          onClick={this.slideToPrev}
        />
        <Paper key={prev} style={styles.leftSlide} zDepth={5}>
          <CardMedia
            overlay={
              <CardTitle
                title={displaySlides[0].title}
                subtitle={displaySlides[0].dateRange}
              />
            }
          >
            <img src={displaySlides[0].imageSrc} style={styles.image} />
          </CardMedia>
        </Paper>
        <Paper key={curr} style={styles.middleSlide} zDepth={5}>
          <CardMedia
            overlay={
              <CardTitle
                title={displaySlides[1].title}
                subtitle={displaySlides[1].dateRange}
              />
            }
          >
            <img src={displaySlides[1].imageSrc} style={styles.image} />
          </CardMedia>
        </Paper>
        <Paper key={next} style={styles.rightSlide} zDepth={5}>
          <CardMedia
            overlay={
              <CardTitle
                title={displaySlides[2].title}
                subtitle={displaySlides[2].dateRange}
              />
            }
          >
            <img src={displaySlides[2].imageSrc} style={styles.image} />
          </CardMedia>
        </Paper>
        <NavigationChevronRight
          style={styles.rightArrow}
          onClick={this.slideToNext}
        />
      </div>
    )
  }
}
