import React from 'react'
import EventCard from './eventCollapsed'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}

export const Events = props => {
  if (!props.events || props.events.length === 0) {
    return null
  }
  return (
    <div style={styles.root}>
      {props.events.map(event => {
        return (
          <EventCard
            key={event.id}
            id={event.id}
            style={styles.eventCard}
            name={event.name}
            dateTime={event.dates.start.dateTime}
            venues={event._embedded.venues}
            headliners={event._embedded.attractions}
            imageSrc={event.images[0].url}
            genre={event.classifications[0].genre.name}
            saleStatus={event.dates.status.code}
            saleStart={event.sales.public.startDateTime}
          />
        )
      })}
    </div>
  )
}
