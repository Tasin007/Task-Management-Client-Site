import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const ItemType = "TASK";

const DraggableTitle = ({ title, status, index, moveTitle }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      item.index = hoverIndex;
      moveTitle(dragIndex, hoverIndex);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { title, status, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {title}
    </div>
  );
};

const ToDo = () => {
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

  const sortByMail = tasks?.filter((task) => task?.user_email === user?.email);

  const moveTitle = (dragIndex, hoverIndex) => {
    const updatedTasks = [...tasks];
    const [draggedTitle] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTitle);
    setTasks(updatedTasks);
  };

  const handleDrop = (status, titleIndex) => {
    // Update the status of the dropped task in the backend
    const updatedTasks = [...tasks];
    const updatedTask = { ...updatedTasks[titleIndex], status };
    updatedTasks.splice(titleIndex, 1, updatedTask);
    setTasks(updatedTasks);

    // Make an API call to update the task status in the backend
    axiosPublic.put(`/tasks/${updatedTask._id}`, { status });
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-3"> Lists</h1>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>OnGoing</th>
            <th>TODO</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {sortByMail?.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>
                <DraggableTitle
                  title={task?.title}
                  status="OnGoing"
                  index={index}
                  moveTitle={moveTitle}
                />
              </td>
              <td>
                <DropTarget status="TODO" onDrop={() => handleDrop("TODO", index)} />
              </td>
              <td>
                <DropTarget status="Completed" onDrop={() => handleDrop("Completed", index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// DropTarget is a placeholder component for the drop area
const DropTarget = ({ status, onDrop }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: () => onDrop(),
  });

  return <div ref={drop} style={{ height: "40px", border: "1px dashed #000" }} />;
};

export default ToDo;