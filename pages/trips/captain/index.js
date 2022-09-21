import React, { Component } from 'react'
import {
  Card,
  Grid,
  Button,
  Divider,
  Form,
  Message,
  Input,
  Icon,
  Segment,
} from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import Trip from '../../../ethereum/trip'
import web3 from '../../../ethereum/web3'
import { Router } from '../../../routes'
import CaptainConfirmForm from '../../../components/CaptainConfirmForm'

class CaptainCorner extends Component {
  static async getInitialProps(props) {
    const trip = Trip(props.query.address)

    const summary = await trip.methods.getSummary().call()

    return {
      address: props.query.address,
      boatPrice: summary[0],
      deposit: summary[1],
      captain: summary[2],
      totalBalance: summary[3],
      reserved: summary[4],
      refunded: summary[5],
      confirmed: summary[6],
      description: summary[7],
      client: summary[8],
      date: summary[9],
    }
  }

  renderCards() {
    const {
      boatPrice,
      deposit,
      captain,
      totalBalance,
      reserved,
      refunded,
      confirmed,
      description,
      client,
      date,
    } = this.props

    const items = [
      {
        header: "Captain's address",
        meta: '',
        description: captain,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Trip balance',
        meta: '',
        description: totalBalance + ' wei',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Reserved?',
        meta: '',
        description: reserved.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Refund requested?',
        meta: '',
        description: refunded.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Confirmed?',
        meta: '',
        description: confirmed.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Confirmed trip date',
        meta: '',
        description: date,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Trip information',
        meta: '',
        description: description,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Price',
        meta: '',
        description: boatPrice + ' wei',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Amount to deposit',
        meta: '',
        description: deposit + ' wei',
        style: { overflowWrap: 'break-word' },
      },
    ]

    return <Card.Group items={items} />
  }

  state = {
    description: '',
    price: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)
    this.setState({ loading: true, errorMessage: '' })
    const { description, price } = this.state

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods
        .setDescription(description, price)
        .send({ from: accounts[0] })

      Router.replaceRoute(`/trips/${this.props.address}/captain`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false, message: '' })
  }

  render() {
    return (
      <Layout>
        <Segment>
          <Button style={{ marginBottom: 10 }} color="purple">
            <Icon name="anchor" />
            Captains's Corner
          </Button>
          <Grid>
            <Grid.Column>
              {this.renderCards()}
              <Divider></Divider>
              <Grid.Row>
                <CaptainConfirmForm address={this.props.address} />
              </Grid.Row>
              <Grid.Row>
                <Form
                  onSubmit={this.onSubmit}
                  error={!!this.state.errorMessage}
                >
                  <Form.Field>
                    <label style={{ marginTop: '10px' }}>
                      Edit description and price
                    </label>
                    <Input
                      value={this.state.price}
                      onChange={(event) =>
                        this.setState({ price: event.target.value })
                      }
                      placeholder="Price"
                    />
                    <Input
                      value={this.state.description}
                      onChange={(event) =>
                        this.setState({ description: event.target.value })
                      }
                      placeholder="Information"
                    />
                  </Form.Field>
                  <Button
                    loading={this.state.loading}
                    color="orange"
                    circular
                    compact
                  >
                    <Icon name="pencil" />
                    Set Price & Information
                  </Button>
                  <Message
                    error
                    header="Oops!"
                    content={this.state.errorMessage}
                  />
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Segment>
      </Layout>
    )
  }
}

export default CaptainCorner
