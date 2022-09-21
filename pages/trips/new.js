import React, { Component } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

class TripNew extends Component {
  state = {
    captainAddress: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault()

    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createTrip(this.state.captainAddress).send({
        from: accounts[0],
      })

      Router.pushRoute('/')
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }

    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <h3>Create new reservation channel</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Address of captain</label>
            <Input
              label="ETH address"
              labelPosition="right"
              value={this.state.captainAddress}
              placeholder="0x0000000000000000000000000000000000000000"
              onChange={(event) =>
                this.setState({ captainAddress: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Opps!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default TripNew
