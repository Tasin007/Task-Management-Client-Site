import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosPublic.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [axiosPublic, user]);

  const sortByMail = tasks?.filter((task) => task.user_email === user?.email);

  const handleDeleteTask = (task) => {
    Swal.fire({
        title: "Are you sure you want to remove this task?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!"
      }).then((result) => {
        if (result.isConfirmed) {
  
            axiosPublic.delete(`/tasks/${task._id}`)
            .then((result) => {
                if (result.data.modifiedCount > 0) {
                    setTasks((prevTasks) =>
                prevTasks.filter((t) => t._id !== task._id)
              );
                    Swal.fire({
                        title: "Removed!",
                        text: "Your task has been removed.",
                        icon: "success"
                      });
                }
            })
  
          
        }
      });
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-center text-2xl font-bold my-3"> All Tasks of {user?.displayName} </h1>

      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {sortByMail?.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.deadline}</td>
              <td>{task.priority}</td>
              <td>
              <div className="flex gap-2">
              <Link to={`/edit-task/${task._id}`}>
              <MdModeEdit className="text-xl"/> 
              </Link>
              <button onClick={()=> handleDeleteTask(task)}><MdDelete className="text-xl text-red-500"/>
              </button>
              
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTasks;
