import { create } from 'zustand'
import blogService from './services/blogs'

const useBlogstore = create((set) => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const blogs = await blogService.getAll()
      set({ blogs })
    },

    create: async (blogObject) => {
      const blog = await blogService.create(blogObject)
      set((state) => ({
        blogs: state.blogs.concat(blog),
      }))
      return blog
    },

    update: async (blog) => {
      const updatedBlog = await blogService.updateBlog(blog.id, blog)
      set((state) => ({
        blogs: state.blogs.map((b) =>
          b.id === updatedBlog.id ? updatedBlog : b
        ),
      }))
      return updatedBlog
    },

    remove: async (id) => {
      const deletedBlog = await blogService.deleteBlog(id)
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
      }))
      return deletedBlog
    },
  },
}))

export const useBlogs = () =>
  useBlogstore((state) => state.blogs)

export const useBlogsActions = () =>
  useBlogstore((state) => state.actions)

export default useBlogstore
