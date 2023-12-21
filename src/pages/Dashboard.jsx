import { NavLink, Outlet } from "react-router-dom";
import { GrArticle } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { BsCart4, BsHouse, BsPaypal } from "react-icons/bs";
import { CiMenuBurger } from "react-icons/ci";
import useAuth from "../Hooks/useAuth";


const Dashboard = () => {
    const {user} = useAuth();

  return (
    <div>
      <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn m-4 bg-blue-500 drawer-button lg:hidden"
          >
            <CiMenuBurger className="text-2xl text-white font-bold" />
          </label>
          <div>
              <Outlet />
      </div>
        </div>
        
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {user?.email && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/allTasks"
                    className="menu text-base lg:text-2xl p-5 text-black text-center"
                  >
                    <BsHouse></BsHouse>
                    All Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addTasks"
                    className="menu text-base lg:text-2xl p-5 text-black text-center"
                  >
                    <FaUserAlt></FaUserAlt>
                    Add Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/toDo"
                    className="menu text-base lg:text-2xl p-5 text-black text-center"
                  >
                    <GrArticle></GrArticle>
                    Lists
                  </NavLink>
                </li>
              </>
            ) }

            <div className="divider"></div>
            <li>
              <NavLink
                to="/"
                className="menu text-base lg:text-2xl p-5 text-black text-center"
              >
                <BsHouse></BsHouse>
                Home
              </NavLink>
            </li>
            </ul>
        
        </div>
        
      </div>
      </div>
      
      
    </div>
  );
};

export default Dashboard;
