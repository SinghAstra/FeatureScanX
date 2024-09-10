import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import RecommendUsersSkeleton from "../../Skeleton/Home/RecommendUsersSkeleton";
import UserItem from "./UserItem";

const RecommendUsers = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/random-users",
          {
            withCredentials: true,
          }
        );
        setUsers(response.data.users);
      } catch (err) {
        console.log("Error fetching random users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <RecommendUsersSkeleton />;
  }

  return (
    <div className="recommend-users">
      {users.length === 0 ? (
        <p>No users to recommend.</p>
      ) : (
        <>
          {currentUser.following.length > 0 ? (
            <h1>Suggested for you</h1>
          ) : (
            <h1>Start Following</h1>
          )}
          {users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </>
      )}
    </div>
  );
};

export default RecommendUsers;
