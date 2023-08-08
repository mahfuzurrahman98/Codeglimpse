import { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';
import RootLayout from './RootLayout';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: 'mahfuz@gmail.com',
      password: 'abc123',
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.post('/users/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data.data;
      console.log(data.user);

      setAuth({
        name: data.user.name,
        email: data.user.email,
        token: data.access_token,
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootLayout>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="border p-1"
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="border p-1"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <input
            className="bg-black text-white px-2 py-1 rounded cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </RootLayout>
  );
};

export default Login;
