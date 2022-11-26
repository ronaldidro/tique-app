import { useState, useEffect } from 'react'
import { request } from '../services/index'

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const response = request(baseUrl, 'GET')
    response.then(data => setResources(data))
  }, [baseUrl])

  return resources
}
