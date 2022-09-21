import React, { Component } from 'react'
import { Form, Input, Message, Button, Icon } from 'semantic-ui-react'
import Trip from '../ethereum/trip'
import web3 from '../ethereum/web3'
import { Router } from '../routes'
import { Link } from '../routes'
class BookForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)

    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.reserve().send({
        from: accounts[0],
        value: this.state.value,
      })

      Router.replaceRoute(`/trips/${this.props.address}/adventurer`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false, message: '' })
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Book</label>
          <Input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
            label="wei"
            labelPosition="right"
            placeholder="Price * 2"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <a>
          <Button loading={this.state.loading} circular compact color="green">
            <Icon name="clipboard check" />
            Reserve
          </Button>
        </a>
      </Form>
    )
  }
}

export default BookForm
