import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Register = () => {

    const { createUser, userUpdateProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const image = form.get('image');

    console.log(image, name, email, password);

    const imgbbResponse = await axios.post(image_hosting_api, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const imageURL = imgbbResponse.data?.data?.url;
    console.log('image uplaoded to imgbb', imgbbResponse?.data);

    
    try {
      const res = await axios.post(
        'http://localhost:5000/users',
        {
          name,
          email,
          image: imageURL, 
        }
      );

      console.log('User registered in MongoDB:', res.data);

      if (res.data.insertedId) {
        const createUserResponse = await createUser(email, password);
        const userUpdateProfileResponse = await userUpdateProfile(name, imageURL, email);

        toast.success('User successfully created');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering user in MongoDB:', error);
      toast.error('Failed to create user. Please try again.');
    }
  };

  


  return (
    <div>
      <section className="bg-gray-50 mt-14 mb-14">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Sign Up from here
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="username"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="https://i.ibb.co/N923KRq/92496423-233028898105182-7201246028819857408-n.jpg"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-light text-gray-500">
                      I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account? <Link to="/login" className="font-medium text-primary-600 underline hover:underline">
                    Sign in here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
