import { useBreakpointValue, useToast } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
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
  const toastIdRef = useRef()

  const setToast = options => (toastIdRef.current = toast({ ...options }))

  const showToast = toastOptions => {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, { ...toastOptions })
      if (!toast.isActive(toastIdRef.current)) setToast(toastOptions)
      return
    }
    setToast(toastOptions)
  }

  return { showToast }
}

export const useResponsive = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })

  return { isDesktop }
}

export const useField = (name, initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = event => setValue(event.target.value)

  return { name, value, onChange }
}
