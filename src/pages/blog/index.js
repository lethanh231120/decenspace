import React, { useEffect } from 'react'
import { getBlogs } from '../../redux/blogSlice'
import { useDispatch, useSelector } from 'react-redux'

const Blogs = () => {
  const dispatch = useDispatch()
  const { blogs } = useSelector(state => state.blogs)
  let listBlog = []
  useEffect(() => {
    dispatch(getBlogs({ page: 1, pageSize: 10 }))
  }, [dispatch])

  if (blogs.blogs) {
    listBlog = blogs.blogs
  }
  return (
    <div>
      {listBlog && listBlog.map((item) => (<div key={item._id}>{item.title}</div>))}
    </div>
  )
}
export default Blogs
