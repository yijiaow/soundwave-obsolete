import React, {useState} from 'react'
import styled from 'styled-components'

const NavItem = styled.h4`
  color: ${props => (props.highlight ? 'orange' : 'white')};
`

const NavBar = ({navItems}) => {
  const [current, setCurrent] = useState['navItem-1']
  return (
    <div>
      {navItems.map((item, i) => (
        <div key={`item-${i}`} onClick={setCurrent(`item-${i}`)}>
          <h4 className="">{item.text}</h4>
        </div>
      ))}
    </div>
  )
}

export default NavBar
