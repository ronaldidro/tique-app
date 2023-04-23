import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { request } from '../services/index'

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const response = request(baseUrl, 'GET')
    response.then(data => setResources(data))
  }, [baseUrl])

  return resources
}

export const useCustomToast = () => {
  const toast = useToast()

  const showToast = toastOptions => toast({ ...toastOptions })

  return { showToast }
}
