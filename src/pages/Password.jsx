import React, { useState } from "react";
import { Header } from "../components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

const Password = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  // Mywisdom1996@
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handletoggle = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New Password and confirm Password must match");
      return;
    }

    const token = localStorage.getItem('token');

    axios
      .put("https://globalpay-merchant.onrender.com/api/me/change-password", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
        
      )
      .then((response) => {
        setSuccess("Password changed Successfully");
        alert(response.data.message)
        setError("");
        console.log(response.data.message)
        localStorage.removeItem('token')
        window.location.href = '/login'

      })
      .catch((err) => {
        setError(err);
        alert(err.response.data.message)
        console.log(err)
        setSuccess("");
      });
  };

  return (
    <form>
      <div
        className="m-2 pt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-x-scroll xl:w-[1000px] xl:mx-auto "
        style={{ overflowX: "auto" }}
      >
        <Header
          category="Security"
          title="Password Settings"
          description="Update password"
        />
        <div className="mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {/* Column 1 */}
            <div className="grid mx-auto gap-2">
              <label
                className="text-lg font-semibold  text-gray-500"
                htmlFor="date1"
              >
                Current Password
              </label>
              <div className="flex">
                <input
                  type={showPassword ? "text" : "password"}
                  id="date1"
                  // value={password}
                  name="oldPassword"
                  onChange={handleChange}
                  className="border p-2 w-[289px] rounded-xl text-md"
                />
                <button
                  type="button"
                  className="relative  right-7 top-2 w-[24px] my-auto pb-4 text-black rounded-full p-1"
                  onClick={handletoggle}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>

            {/* Column 2 */}
            <div className="grid mx-auto gap-2">
              <label
                className="text-lg font-semibold  text-gray-500"
                htmlFor="date1"
              >
                New Password
              </label>
              <div className="flex">
                <input
                  type={showPassword ? "text" : "password"}
                  id="date1"
                  // value={password}
                  name="newPassword"
                  onChange={handleChange}
                  className="border p-2 w-[289px] rounded-xl text-md"
          
                />

                <button
                  type="button"
                  className="relative  right-7 top-2 w-[24px] my-auto pb-4 text-black rounded-full p-1"
                  onClick={handletoggle}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>

            <div className="grid mx-auto gap-2">
              <label
                className="text-lg font-semibold  text-gray-500"
                htmlFor="date1"
              >
                Confirm New Password
              </label>
              <div className="flex">
                <input
                  type={showPassword ? "text" : "password"}
                  id="date1"
                  // value={password}
                  name="confirmPassword"
                  // onChange={(e) => setPassword(e.target.value)}
                 
                  onChange={handleChange}
                  className="border p-2 w-[289px] rounded-xl text-md"
                />

                <button
                  type="button"
                  className="relative  right-7 top-2 w-[24px] my-auto pb-4 text-black rounded-full p-1"
                  onClick={handletoggle}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>

            <div className="mx-auto">
              <button type="submit"  onClick={handleSubmit} className="bg-blue-500 w-[7rem]  rounded-2xl text-white text-md p-2 hover:bg-blue-600 ">
                Update
              </button>
            </div>
          </div>
        </div>
       
      </div>
    </form>
  );
};

export default Password;
