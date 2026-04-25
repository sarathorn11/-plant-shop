import http from './api'

const BASE_URL = '/product'

/**
 * Fetch product data
 * @param {object} params
 * @returns
 */
export function getProducts(params) {
  return http.get(BASE_URL, { params })
}

/**
 * Fetch product by id
 * @param {integer} id
 * @returns
 */
export function getProductById(id) {
  return http.get(`${BASE_URL}/${id}`)
}


