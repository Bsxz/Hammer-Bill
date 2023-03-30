import React from 'react'
import { Navigate } from 'react-router-dom'
import { useLocalStore } from '../stores/useLocalStore'
export const Root: React.FC = () => {
  const { hasReadWelcome } = useLocalStore()
  if (hasReadWelcome) {
    return (
      <>
        <Navigate to="/home" />
      </>
    )
  } else {
    return (
      <>
        <Navigate to="/welcome/firstpage" />
      </>
    )
  }
}
