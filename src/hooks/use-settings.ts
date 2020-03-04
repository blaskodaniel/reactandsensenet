import { useContext } from 'react'
import { SettingContext } from '../contexts/settingscontext'

export const useSetting = () => {
  return useContext(SettingContext).data
}