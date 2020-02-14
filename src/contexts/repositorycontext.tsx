import React, { useEffect, useState, useContext } from 'react'
import { FormsAuthenticationService, LoginState, Repository } from '@sensenet/client-core'
import { RepositoryConfiguration } from '@sensenet/client-core/dist/Repository/RepositoryConfiguration'
import { RepositoryContext } from '@sensenet/hooks-react'
import { Omit } from 'react-router';

/**
 * The last repository will be stored in your local storage with this key
 */
export const lastRepositoryKey = 'mkkpoc-repository'

/**
 * Container component that will provide a Repository object through a Context
 * @param props The repository settings
 */
export const RepositoryProvider: React.FunctionComponent<Omit<
  Partial<RepositoryConfiguration>,
  'repositoryUrl'
>> = props => {
  const [currentRepoUrl, setCurrentRepoUrl] = useState(localStorage.getItem(lastRepositoryKey) || "https://snstoreforms.sensenet.com/")
  const [currentRepo, setCurrentRepo] = useState(new Repository({ ...props, repositoryUrl: currentRepoUrl }))

  useEffect(() => {
    localStorage.setItem(lastRepositoryKey, currentRepoUrl)
    const repo = new Repository({ ...props, repositoryUrl: currentRepoUrl })
    FormsAuthenticationService.Setup(repo)
    setCurrentRepo(repo)
  }, [currentRepoUrl, props])

  return (
    <RepositoryContext.Provider value={currentRepo}>
      {props.children}
    </RepositoryContext.Provider>
  )
}
