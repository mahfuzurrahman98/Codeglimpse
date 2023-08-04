import RootLayout from './RootLayout';

const Register = () => {
  return (
    <RootLayout>
      <div>
        <h1>Register</h1>
        <form action="">
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="border p-1"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="border p-1"
              type="email"
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
            value="Register"
          />
        </form>
      </div>
    </RootLayout>
  );
};

export default Register;
