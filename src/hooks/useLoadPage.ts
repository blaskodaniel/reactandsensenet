import { useEffect, useState } from 'react'
import { File } from '@sensenet/default-content-types'
import { ODataParams } from '@sensenet/client-core'
import { useRepository } from '@sensenet/hooks-react'
import { SinglePageContent } from '../contexts/menucontext'

type Options = {
  pagename: string | number
}

export const useLoadPage = <T extends File>({ pagename }: Options) => {
  const [responsedata, setResponsedata] = useState<SinglePageContent>()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>()
  const repo = useRepository()

  useEffect(() => {
    const ac = new AbortController()
    if (pagename) {
      // Loading the content by Id
      ;(async () => {
        setLoading(true);
        try {
          const response = await repo.load<SinglePageContent>({
            idOrPath: `/Root/Sites/Default_Site/Pages/${pagename}`,
            requestInit: { signal: ac.signal },
            oDataOptions: {
              select: [
                "DisplayName"
              ]
            },
          })
          if(response && response.d){
            // If we need only content
            setResponsedata(response.d)
            setLoading(false)
          }else{
            setLoading(false);
            if (!ac.signal.aborted) {
              setError(new Error("No result"))
            }
          }
          
        } catch (err) {
          setLoading(false);
          if (!ac.signal.aborted) {
            setError(err)
          }
        }
      })()
    }
    return () => ac.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo, pagename])

  return { responsedata, error, loading }
}