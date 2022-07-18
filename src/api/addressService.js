import axios from 'axios'
import { getCookie, STORAGEKEY } from '../utils/storage/index'

const getUrlPrefix = () => '/'
const instance = axios.create({
<<<<<<< HEAD
<<<<<<< HEAD
  // baseURL: 'http://139.180.147.199:8081'
  // baseURL: 'https://bb36-104-28-222-76.ap.ngrok.io',
  baseURL: '/addressService'
=======
  baseURL: '//139.180.147.199:8081'
  // baseURL: 'https://ca6d-118-70-117-216.ap.ngrok.io'
>>>>>>> 9c169cb (delete http)
=======
<<<<<<< HEAD
  // baseURL: 'https://bb36-104-28-222-76.ap.ngrok.io',
  baseURL: '/addressService'
=======
  baseURL: 'https://a204-118-70-117-216.ap.ngrok.io'
>>>>>>> e945c4d (fix giao dien profile, edit profile)
=======
  // baseURL: 'https://bb36-104-28-222-76.ap.ngrok.io',
  baseURL: '/addressService'
>>>>>>> 07c61fd (fix netlify)
>>>>>>> e12dce7 (fix conflict)
})

const token = getCookie(STORAGEKEY.ACCESS_TOKEN)

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const get = async(url, params = {}) => {
  const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  try {
    const config = { params: params }
    const response = await instance.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

const put = async(url, data = {}) => {
  try {
    let response = {}
    if (data.toLocaleString() === '[object FormData]') {
      response = await instance.put(getUrlPrefix() + url, data)
    } else {
      response = await instance.put(getUrlPrefix() + url, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const post = async(url, data = {}) => {
  try {
    const response = await instance.post(getUrlPrefix() + url, data)
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const del = async(url, data = {}) => {
  try {
    const response = await instance.delete(getUrlPrefix() + url, { data })
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const _responseHandler = (response, url) => {
  const { data } = response
  return data
}

const _errorHandler = (err) => {
  if (err.response && err.response.status === 401) {
    // console.log('')
  }
  throw err
}

const patch = async(url, data = {}) => {
  try {
    let response = {}
    if (data.toLocaleString() === '[object FormData]') {
      response = await instance.patch(getUrlPrefix() + url, data)
    } else {
      response = await instance.patch(getUrlPrefix() + url, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

export { get, post, del, put, patch }
