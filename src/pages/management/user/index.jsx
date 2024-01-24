import AdminLayout from "@/HOC/admin-layouts/AdminLayout";
import Phone from "@/components/inputs/Phone";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const User = () => {
  const [users, setUsers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [profile, setProfile] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    role: ""
  });
  const [conPass, setConPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const getUserList = async () => {
    try {
      const response = await axios.get("/api/users/user-list");
      setUsers(response.data.data);
      console.log(response.data.data); // response.data is the parsed JSON object
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };


  const deleteUser = async (id) => {
   
    Swal.fire({
      title: "Warning!",
      text: "Are you want to delete this user?",
      icon: "error",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      focusCancel: true,
      cancelButtonColor: "#800"
    });

    // const res = await fetch('/api/users/delete')
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const addUrl = "/api/users/add";
    const updateUrl = "/api/users/update";
    console.log(profile);
    try {
      //   if (profile.password !== conPass) {
      //     alert("Password does not match!");
      //     return false;
      //   }
      const response = await fetch(
        `${profile.id !== null ? updateUrl : addUrl}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: profile.id,
            email: profile.email,
            password: "12345678",
            profile: profile,
            role: profile.role
          })
        }
      );

      console.log(response);

      if (response.status == 200) {
        Swal.fire({
          title: "Success!",
          text: "Registration Success",
          icon: "success",
          confirmButtonText: "Ok"
        });
        setFormOpen(false);
        getUserList();
        setProfile({
          id: null,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          country: "",
          role: ""
        });
      } else {
        // Redirect to the base URL after successful login
        setErrorMessage(response);
        Swal.fire({
          title: "Error!",
          text: response.error,
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred during sign-in.");
    }
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <AdminLayout>
      {formOpen ? (
        <div className="flex flex-col w-auto items-center justify-center lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-gray">
                  Add New User
                </h1>
                <button
                  onClick={() => {
                    setFormOpen(false);
                    setProfile({
                      id: null,
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      phone: "",
                      country: "",
                      role: ""
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
                      name="firstName"
                      id="firstName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Jahangir"
                      required=""
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          firstName: e.target.value
                        })
                      }
                      value={profile.firstName}
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
                      name="lastName"
                      id="lastName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Hossain"
                      required=""
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          lastName: e.target.value
                        })
                      }
                      value={profile.lastName}
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
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required=""
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        email: e.target.value
                      })
                    }
                    value={profile.email}
                  />
                </div>
                <Phone user={profile} setUser={setProfile} />
                <div class="relative z-0 w-full mb-5 group">
                  {/* <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                    >
                        Password
                    </label> */}
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required=""
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        password: e.target.value
                      })
                    }
                    value={profile.password}
                  />
                </div>
                {/* <div class="relative z-0 w-full mb-5 group"> */}
                {/* <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                    >
                        Confirm Password
                    </label> */}
                {/* <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required=""
                    onChange={(e) => setConPass(e.target.value)}
                    value={conPass}
                    /> */}
                {/* </div> */}
                <div className="relative z-0 w-full mb-5">
                  <select
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        role: e.target.value
                      })
                    }
                    id="country"
                    name="country"
                    autocomplete="country-name"
                    class="bg-gray-700 text-white block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Role</option>
                    <option selected={profile?.role == "Admin"} value="Admin">
                      Admin
                    </option>
                    <option selected={profile?.role == "User"} value="User">
                      User
                    </option>
                    <option
                      selected={profile?.role == "Subscriber"}
                      value="Subscriber"
                    >
                      Subscriber
                    </option>
                    <option selected={profile?.role == "Editor"} value="Editor">
                      Editor
                    </option>
                  </select>
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
                Users
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name,
                title, email and role.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={() => setFormOpen(true)}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add user
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
                          Name
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
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
                      {users?.length > 0 &&
                        users.map((person) => (
                          <tr key={person.email}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {person.profile.firstName}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.roles === "User" && (
                                <span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                                  {person.roles}
                                </span>
                              )}
                              {person.roles === "Admin" && (
                                <span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                                  {person.roles}
                                </span>
                              )}
                              {person.roles === "Editor" && (
                                <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                                  {person.roles}
                                </span>
                              )}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => {
                                  setProfile({
                                    firstName: person.profile.firstName,
                                    lastName: person.profile.lastName,
                                    phone: person.profile.phone,
                                    email: person.email,
                                    role: person.roles,
                                    id: person.id
                                  });
                                  setFormOpen(true);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                              >
                                Edit
                                <span className="sr-only">, {person.name}</span>
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => deleteUser(person.id)}
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
  );
};

export default User;
