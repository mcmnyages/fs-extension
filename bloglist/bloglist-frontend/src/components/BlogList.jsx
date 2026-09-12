import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBlogs, useBlogsActions } from '../blogStore'

const BlogList = () => {
  const blogs = useBlogs()
  const { initialize } = useBlogsActions()
  useEffect(() => {
    initialize()
  }, [initialize])
  const sortedBlogs = [...blogs].sort(
    (a, b) => b.likes - a.likes
  )

  return (
    <div>
      <h2>blogs</h2>

      {sortedBlogs.map(blog => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>

          <span>
            {' '}by {blog.author}
          </span>
        </div>
      ))}
    </div>
  )
}

export default BlogList
