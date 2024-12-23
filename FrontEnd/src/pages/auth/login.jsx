import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from '../../assets/images/logo-icon.png';
import BackToHome from "../../components/back-to-home";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message === "Invalid email or password.") {
          setError("Invalid email or password.");
        } else {
          setError("An unexpected error occurred.");
        }
        return;
      }

      const data = await response.json();

      // Save token and user details
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      // Redirect user based on role
      const decodedToken = jwtDecode(data.token);
      const userRole = decodedToken.role;
      console.log("Role:", userRole);
      if (userRole === "admin") {
        navigate("/admin");
        console.log("Admin authorized");
      } else if (userRole === "user") {
        navigate(from);
      } else {
        navigate("/404");
      }

      // Save rememberMe preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
        // Auto logout when the token expires
        setTimeout(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate('/login'); // Redirect to login
          alert("Session expired. Please log in again.");
        }, 3600 * 1000); // 1 hour in milliseconds
      }


    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
        <div className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/6.jpg')] bg-no-repeat bg-center bg-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2" id="particles-snow"></div>
        <div className="container relative z-3">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
              <Link to="/"><img src={logo} className="mx-auto" alt="Logo" /></Link>
              <h5 className="my-6 text-xl font-semibold text-center">Login</h5>
              <form className="text-start" onSubmit={handleLogin}>
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                    <input
                      id="LoginEmail"
                      type="email"
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4 relative">
                    <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                    <input
                      id="LoginPassword"
                      type={showPassword ? "text" : "password"} // Toggle between 'password' and 'text'
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Password:"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {/* Eye Icon for toggling password visibility */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[60px] transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <FiEye className="w-4 h-4" />
                      ) : (
                        <FiEyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="ml-2">Remember Me</span>
                    </label>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm mb-4">
                      {error}
                    </div>
                  )}

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full"
                    >
                      Login
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-slate-400 mb-0"><Link to="/forgot-password" className="text-red-400">Forgot password ?</Link></p>
                    <span className="text-slate-400 me-2">Don't have an account?</span>
                    <Link to="/signup" className="text-black dark:text-white font-bold inline-block">Sign Up</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <BackToHome />
    </>
  );
}
