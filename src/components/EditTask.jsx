import { useParams } from "react-router-dom";


const EditTask = () => {
    const {taskId} = useParams();
    return (
        <div>
            {taskId}
        </div>
    );
};

export default EditTask;