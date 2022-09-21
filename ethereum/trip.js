import web3 from './web3'
import Trip from './build/Trip.json'

const trip = (address) => {
  return new web3.eth.Contract(JSON.parse(Trip.interface), address)
}

export default trip
