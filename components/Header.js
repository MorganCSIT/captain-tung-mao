import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from '../routes'
const Header = () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <a
        href={'https://morgancsit.github.io/lba-frontend/index.html'}
        className="item"
      >
        Home
      </a>

      <Link route="/">
        <a className="item">Channels</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/trips/new">
          <a className="item">Admin</a>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}

export default Header
