import http from './api'

const BASE_URL = '/user'

/**
 * Fetch product data
 * @param {object} params
 * @returns
 */
export function login(params) {
  console.log("Login")
  return http.post(`${BASE_URL}/login`, { params })
}

// /**
//  * Fetch product by id
//  * @param {integer} id
//  * @returns
//  */
// export function getProductById(id) {
//   return http.get(`${BASE_URL}/${id}`)
// }


