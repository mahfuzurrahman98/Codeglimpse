import RootLayout from './RootLayout';

const Login = () => {
  return (
    <RootLayout>
      <div>
        <h1>Login</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="border p-1"
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
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
              required
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
