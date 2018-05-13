import React from 'react'
import EventCollapsed from './eventCollapsed'

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
    <div styles={styles.root}>
      {props.events.map(event => {
        return (
          <EventCollapsed
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
