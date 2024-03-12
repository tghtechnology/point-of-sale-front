import { useContext } from "react";
import CategoryContext from "../context/category/CategoryContext";

const useCategory = () => {
    return useContext(CategoryContext)
}

export default useCategory;