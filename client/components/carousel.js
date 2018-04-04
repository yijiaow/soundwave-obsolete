import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { CardMedia, CardTitle } from 'material-ui/Card'

const styles = {
  root: {
    width: 900,
    height: 500
  },
  middle: {
    position: 'absolute',
    left: 200,
    zIndex: 1
  },
  left: {
    position: 'absolute',
    left: 50,
    zIndex: 0
  },
  right: {
    position: 'absolute',
    right: 50,
    zIndex: -1
  },
  image: {
    width: 600,
    height: 400
  }
}

export class Carousel extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const slides = this.props.festivals
    const curr = this.state.activeIndex
    const prev = curr <= 0 ? slides.length - 1 : curr - 1
    const next = curr >= slides.length - 1 ? 0 : curr + 1
    const displaySlides = [slides[prev]].concat(slides[curr], slides[next])
    return (
      <div style={styles.root}>
        <Paper key={prev} style={styles.left} zDepth={5}>
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
        <Paper key={curr} style={styles.middle} zDepth={5}>
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
        <Paper key={next} style={styles.right} zDepth={5}>
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
      </div>
    )
  }
}
