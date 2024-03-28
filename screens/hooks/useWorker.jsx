import { useContext } from "react";
import WorkerContext from "../context/worker/WorkerContext";

const useWorker = () => {
    return useContext(WorkerContext)
}

export default useWorker;