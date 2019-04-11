import React from 'react'
import NavBar from '../components/NavBar'

const navItems = ['Playlist', 'Concert', 'Artist']

const Home = () => (
  <div>
    <h2>home</h2>
    <NavBar navItems={navItems} />
  </div>
)

export default Home
