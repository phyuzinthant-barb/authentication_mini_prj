import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserList = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <div>UserList</div>;
};

export default UserList;
