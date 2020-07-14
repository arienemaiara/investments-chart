import axios from 'axios'

import Config from '../constants/config'

const api = axios.create({
  baseURL: Config.api_url,
  responseType: 'json'
})

export default api
