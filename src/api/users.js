import API from '../api/config'
import jwt_decode from "jwt-decode"

export default {
  verifyUser: () => {
    const { sub } = jwt_decode(localStorage.getItem('token'));
    return API.get(`users/${sub}`)
  }
}
