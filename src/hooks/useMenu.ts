import { useContext } from 'react'
import { MenuContext } from '../contexts/menucontext'

export const useMenu = () => {
  return useContext(MenuContext)
}