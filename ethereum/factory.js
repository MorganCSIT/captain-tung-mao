import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xa7a7F20501ff62334c71B4497d50e96F2a4c814c',
)

export default instance
