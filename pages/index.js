import React, { Component } from 'react'
import { Button, Card, Divider, Segment } from 'semantic-ui-react'
import factory from '../ethereum/factory'
import Layout from '../components/Layout'
import { Link } from '../routes'

class TripIndex extends Component {
  static async getInitialProps() {
    const trips = await factory.methods.getDeployedTrips().call()

    return { trips }
  }

  renderTrips() {
    const items = this.props.trips.map((address) => {
      return {
        header: (
          <p style={{ fontFamily: 'monospace' }}>{address.substring(1, 6)}</p>
        ),
        description: (
          <Link route={`/trips/${address}`}>
            <a>View information</a>
          </Link>
        ),
        fluid: true,
        style: { overflowWrap: 'break-word' },
      }
    })

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <Segment>
          <div style={{ paddingTop: 8 }}>
            <h3>Reservation channels</h3>

            {this.renderTrips()}
          </div>
          <Divider></Divider>
        </Segment>
      </Layout>
    )
  }
}

export default TripIndex
