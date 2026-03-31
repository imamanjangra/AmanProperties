import { useEffect, useState } from "react";
import API from "../Services/API.jsx";
import toast from "react-hot-toast";
import {
  Trash2,
  Pencil,
  User,
  Phone,
  Shield,
  X,
} from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    mobileno: "",
  });

  // 🔹 FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/admin/Users");
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 DELETE USER
  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/user/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔹 OPEN EDIT
  const handleEditOpen = (user) => {
    setEditUser(user._id);
    setForm({
      firstname: user.firstname,
      lastname: user.lastname,
      mobileno: user.mobileno,
    });
  };

  // 🔹 UPDATE USER
  const handleUpdate = async () => {
    try {
      const { data } = await API.put(`/admin/user/${editUser}`, form);

      setUsers(users.map((u) => (u._id === editUser ? data : u)));

      setEditUser(null);
      toast.success("Updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 text-gray-300 min-h-screen">

      <h1 className="text-xl sm:text-2xl font-semibold text-white mb-4">
        Users Management
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="flex flex-col gap-3">

          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              {/* USER INFO */}
              <div className="flex items-center gap-3">

                <div className="bg-gray-800 p-2 rounded-lg">
                  <User size={18} />
                </div>

                <div>
                  <p className="text-white text-sm font-medium">
                    {user.firstname} {user.lastname}
                  </p>

                  <div className="text-xs text-gray-400 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {user.mobileno}
                    </span>

                    <span className="flex items-center gap-1">
                      <Shield size={12} /> {user.role}
                    </span>

                    {user.isblocked && (
                      <span className="text-red-400">Blocked</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">

                <button
                  onClick={() => handleEditOpen(user)}
                  className="p-2 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/40"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40"
                >
                  <Trash2 size={16} />
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* 🔥 EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">

          <div className="bg-gray-900 p-5 rounded-xl w-[90%] sm:w-96 space-y-4">

            <div className="flex justify-between items-center">
              <h2 className="text-white font-semibold">
                Edit User
              </h2>

              <button onClick={() => setEditUser(null)}>
                <X size={18} />
              </button>
            </div>

            <input
              type="text"
              placeholder="First Name"
              value={form.firstname}
              onChange={(e) =>
                setForm({ ...form, firstname: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-800 text-sm outline-none"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={form.lastname}
              onChange={(e) =>
                setForm({ ...form, lastname: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-800 text-sm outline-none"
            />

            <input
              type="text"
              placeholder="Mobile"
              value={form.mobileno}
              onChange={(e) =>
                setForm({ ...form, mobileno: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-800 text-sm outline-none"
            />

            <button
              onClick={handleUpdate}
              className="w-full bg-blue-600 py-2 rounded-lg"
            >
              Save Changes
            </button>

          </div>
        </div>
      )}
    </div>
  );
}