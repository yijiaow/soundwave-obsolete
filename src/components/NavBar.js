import React, {useState} from 'react'
import styled from 'styled-components'

const StyledNavBar = styled.div`
  position: fixed:
  display: flex;
  width: '100%';
  & h4 {
    color: black;
  }
`

const NavBar = ({navItems}) => {
  const [current, setCurrent] = useState('item-0')

  return (
    <StyledNavBar>
      {navItems.map((item, i) => (
        <div key={`item-${i}`} onClick={() => setCurrent(`item-${i}`)}>
          <h4>{item}</h4>
        </div>
      ))}
    </StyledNavBar>
  )
}

export default NavBar
