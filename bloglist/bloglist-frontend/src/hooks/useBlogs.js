import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

export const useBlogs =() => {
  const results = useQuery({
    queryKey:['blogs'],
    queryFn:blogService.getAll,
    retry:2
  })
  console.log('Results from hook', results)
  return {
    blogs:results.data,
    isPending:results.isPending,
    isError:results.isError
  }

}

export default useBlogs