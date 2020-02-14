import { useContext } from 'react'
import { LocalizationContext } from '../contexts/localizationcontext'

export const useLocalization = () => {
  return useContext(LocalizationContext).data
}