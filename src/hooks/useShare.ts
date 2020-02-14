import { useContext } from 'react'
import { ShareContext } from '../contexts/sharecontext'

export const useShare = () => {
  return useContext(ShareContext)
}