import { Button, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {!user.isAdmin && (
                    <>
                      <Link
                        to={`/admin/user/${user._id}`}
                        style={{ marginRight: "10px" }}
                      >
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
