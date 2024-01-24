import AdminLayout from "@/HOC/admin-layouts/AdminLayout";
import Phone from "@/components/inputs/Phone";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState({
    id: null,
    title: "",
    sub_title: "",
    description: "",
    thumbnail: "",
    writer: "",
    category: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  
  const getBlogList = async () => {
    try {
      const response = await axios.get("/api/blogs/blog-list");
      setBlogs(response.data.data);
      console.log(response.data.data); // response.data is the parsed JSON object
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData({
      ...data,
      thumbnail: file,
    });
  };


  const deleteBlog = async (id) => {
   
    Swal.fire({
      title: "Warning!",
      text: "Are you want to delete this blog?",
      icon: "error",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      focusCancel: true,
      cancelButtonColor: "#800"
    });

    // const res = await fetch('/api/blogs/delete');
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    

    try {
      const response = await fetch('/api/blogs/addUpdate', 
      {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: data.title,
            id:data.id,
            description:data.description,
            sub_title:data.sub_title,
            category:data.category,
            thumbnail:data.thumbnail
        })
      });

      console.log(response.data);
      if(response.status === 200) {
        Swal.fire({
            title: "Success!",
            text: response?.message,
            icon: "success",
            confirmButtonText: "Ok"
          });
          setFormOpen(false);
          getBlogList();
          setData({
            id: null,
            title: "",
            sub_title: "",
            description: "",
            thumbnail: "",
            writer: "",
            category: "",
          });
      }
      // Handle success, redirect, or perform additional actions
    } catch (error) {
      console.error('Blog creation error:', error);
      // Handle error
    }
  };

  useEffect(() => {
    getBlogList();
  }, []);
  return (
    <AdminLayout>
      {formOpen ? (
        <div className="flex flex-col w-auto items-center justify-center lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-gray">
                  Add New Blog
                </h1>
                <button
                  onClick={() => {
                    setFormOpen(false);
                    setData({
                        id: null,
                        title: "",
                        sub_title: "",
                        description: "",
                        thumbnail: "",
                        writer: "",
                        category: "",
                    });
                  }}
                  className="bg-gray-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Back List
                </button>
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-0 w-full mb-2 group">
                    {/* <label
                        for="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                        >
                        First Name
                        </label> */}
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="title..."
                      required=""
                      onChange={(e) =>
                        setData({
                          ...data,
                          title: e.target.value
                        })
                      }
                      value={data.title}
                    />
                  </div>
                  <div class="relative z-0 w-full mb-2 group">
                    {/* <label
                        for="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                        >
                        Last Name
                        </label> */}
                    <input
                      type="text"
                      name="sub_title"
                      id="sub_title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="sub title"
                      required=""
                      onChange={(e) =>
                        setData({
                          ...data,
                          sub_title: e.target.value
                        })
                      }
                      value={data.sub_title}
                    />
                  </div>
                </div>

                <div class="relative z-0 w-full mb-5 group">
                  {/* <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                    >
                        Email
                    </label> */}
                    <textarea  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" onChange={(e) =>
                      setData({
                        ...data,
                        description: e.target.value
                      })
                    } placeholder="Description...">
                    {data.description}
                    </textarea>
                  
                </div>
                
                <div className="relative z-0 w-full mb-5">
                  <select
                    onChange={(e) =>
                      setData({
                        ...data,
                        category: e.target.value
                      })
                    }
                    id="category"
                    name="category"
                    
                    class="bg-gray-700 text-white block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Category</option>
                    <option selected={data?.category == "cat_1"} value="cat_1">
                      Category One
                    </option>
                    <option selected={data?.category == "cat_2"} value="cat_2">
                      Category Two
                    </option>
                    <option selected={data?.category == "cat_3"} value="cat_3">
                      Category Three
                    </option>
                    <option selected={data?.category == "cat_4"} value="cat_4">
                      Category Four
                    </option>
                    
                  </select>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  {/* <label
                        for="thumbnail"
                        className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                    >
                        Thumbnail
                    </label> */}
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    placeholder="Select Thumbnail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required=""
                    onChange={handleFileChange}
                    
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Blog List
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the blogs in your account including their name
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={() => setFormOpen(true)}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add blog
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Title
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Sub Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="relative text-right py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {blogs?.length > 0 &&
                        blogs.map((blog) => (
                          <tr key={blog.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {blog.title} {blog._id}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {blog.sub_title}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {blog.category}
                            </td>
                            
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => {
                                  setData({
                                    title: blog.title,
                                    sub_title: blog.sub_title,
                                    category: blog.category,
                                    description: blog.description,
                                    thumbnail: blog.thumbnail,
                                    id: blog._id
                                  });
                                  setFormOpen(true);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                              >
                                Edit
                                <span className="sr-only">, {blog.name}</span>
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => deleteBlog(blog.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default Blog