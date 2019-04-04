import React, {Component} from 'react'

// const styles = {
//   root: {
//     position: 'relative',
//     top: 50,
//     width: '100%',
//     height: 400,
//     marginLeft: 'auto',
//     marginRight: 'auto'
//   },
//   media: {
//     width: 540,
//     height: 400
//   },
//   slide: {
//     position: 'absolute',
//     boxShadow: '0 0 100px 20px #10021C'
//   },
//   middle: {
//     left: '50%',
//     transform: 'translate(-50%)',
//     zIndex: 5
//   },
//   left: {
//     top: 24,
//     left: 0,
//     zIndex: 4
//   },
//   right: {
//     top: 24,
//     right: 0,
//     zIndex: 3
//   },
//   leftArrow: {
//     position: 'absolute',
//     top: 180,
//     left: '50%',
//     transform: 'translate(-250px)',
//     zIndex: 100
//   },
//   rightArrow: {
//     position: 'absolute',
//     top: 180,
//     right: '50%',
//     transform: 'translate(250px)',
//     zIndex: 10
//   },
//   eventBanner: {
//     position: 'absolute',
//     bottom: 0,
//     display: 'flex',
//     width: '100%',
//     padding: '10px 25px',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)'
//   },
//   eventContent: {
//     display: 'flex',
//     flexDirection: 'column',
//     '&:last-child': {
//       padding: 0
//     }
//   },
//   regionInfo: {
//     fontSize: 20
//   }
// }

const Carousel = () => {
  const [current, setCurrent] = useState()

  return (
    <div
      className={classes.root}
      onMouseEnter={this.pause}
      onMouseLeave={this.resume}
    >
      <ArrowLeft className={classes.leftArrow} onClick={this.slideToPrev} />
      <Card key={prev} className={`${classes.left} ${classes.slide}`}>
        <CardMedia
          className={classes.media}
          image={displaySlides[0].imageSrc}
        />
      </Card>
      <Card key={curr} className={`${classes.middle} ${classes.slide}`}>
        <CardMedia
          className={classes.media}
          title={displaySlides[1].title}
          image={displaySlides[1].imageSrc}
        />
        <div className={classes.eventBanner}>
          <CardContent className={classes.eventContent}>
            <Typography variant="display1" color="textSecondary">
              {title} <span className={classes.regionInfo}>{region}</span>
            </Typography>
            <Typography variant="subheading">{dateRange}</Typography>
          </CardContent>
        </div>
      </Card>
      <Card key={next} className={`${classes.right} ${classes.slide}`}>
        <CardMedia
          className={classes.media}
          image={displaySlides[2].imageSrc}
        />
      </Card>
      <ArrowRight className={classes.rightArrow} onClick={this.slideToNext} />
    </div>
  )
}
class Carousel extends Component {
  slideToPrev() {
    const prev =
      this.state.activeIndex <= 0
        ? this.props.festivals.length - 1
        : this.state.activeIndex - 1
    this.setState({activeIndex: prev})
  }
  slideToNext() {
    const next =
      this.state.activeIndex >= this.props.festivals.length - 1
        ? 0
        : this.state.activeIndex + 1
    this.setState({activeIndex: next})
  }
  pause() {
    clearInterval(this.timerID)
  }
  resume() {
    this.timerID = setInterval(() => this.slideToNext(), 2500)
  }
  render() {
    const {classes} = this.props
    const slides = this.props.festivals
    const curr = this.state.activeIndex
    const prev = curr <= 0 ? slides.length - 1 : curr - 1
    const next = curr >= slides.length - 1 ? 0 : curr + 1
    const displaySlides = [slides[prev]].concat(slides[curr], slides[next])
    const {title, dateRange, region} = displaySlides[1]
  }
}
export default withStyles(styles)(Carousel)
