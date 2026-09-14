// I was using store here but switched to tanstack query these are its imports
// import { useBlogs, useBlogsActions } from '../blogStore'
// import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useBlogs from '../hooks/useBlogs'



const BlogList = () => {
  const { blogs,isPending } = useBlogs()
  console.log('Blogs',blogs)

  if(isPending){
    return(
      <div>Loading  ...</div>
    )
  }
  // It's usage here
  // const { initialize } = useBlogsActions()
  // useEffect(() => {
  //   initialize()
  // }, [initialize])

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
