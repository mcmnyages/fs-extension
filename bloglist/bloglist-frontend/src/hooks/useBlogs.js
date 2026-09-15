import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import useNotify from './useNotify'

export const useBlogs = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])

  const { notify } = useNotify()
  const results = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 2
  })
  const addBlog = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      notify(`a new blog "${newBlog.title}" was added`)
    },
    onError: (error) => {
      notify('creating the blog failed', 'error')
      throw error
    }
  })

  const likeBlog = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => {
        return oldBlogs.map((blog) => {
          blog.id === updatedBlog.id ? updatedBlog : blog
        })
      })
      notify(`You liked ${updatedBlog.title} blog`, 'success')
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      notify('An error occured While liking the blog', 'error')
      throw error
    }
  })

  const removeMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (removedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => {
        return oldBlogs.filter(blog => blog.id !== removedBlog.id)
      })
    },
    onError: (error) => {
      notify('An error occured while deleting the blog', 'error')
      throw error
    }
  })
  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.createComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify('You added a comment on this blog', 'success')
    },
  })


  return {
    blogs: results.data,
    isPending: results.isPending,
    isError: results.isError,
    create: async (newBlog) => {
      await addBlog.mutateAsync(newBlog)
    },
    likeBlog: async (blog) => {
      await likeBlog.mutateAsync({
        id: blog.id,
        blog: {
          ...blog,
          likes: blog.likes + 1
        }
      })
    },
    remove: async (id) => {
      await removeMutation.mutateAsync(id)
    },
    comment: async (id, comment) => {
      await commentMutation.mutateAsync({ id, comment })
    }

  }

}

export default useBlogs