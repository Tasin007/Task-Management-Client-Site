import { Button, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";


const UserProfile = () => {
  const [u, setU] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => {
        setU(data);
      });
  }, []);

  // Check if u is an array before using filter
  const userData = Array.isArray(u)
    ? u?.find((users) => users?.email === user?.email)
    : [];
  console.log(userData);

  return (
    <div className="pt-36 max-w-7xl mx-auto h-screen">
      <Typography variant="h3" className="text-center underline" gutterBottom>
        User Profile
      </Typography>
      <div>
        {userData ? (
          <div className="flex flex-col items-center py-2">
            <img
              src={userData?.image}
              alt=""
              className="rounded-full h-40 w-40 object-cover"
            />
            <p className="text-xl font-bold">Name: {userData?.name}</p>
            <p className="text-xl font-bold">Email: {userData?.email}</p>
            {/* <p className="text-xl font-bold">ID: {userData?._id}</p> */}
          </div>
        ) :
        (
          
              <div className="flex justify-center">
                <Puff color="#00BFFF" height={100} width={100} />
              </div>
          
        )
        
        }

      </div>
      
    </div>
  );
};

export default UserProfile;
