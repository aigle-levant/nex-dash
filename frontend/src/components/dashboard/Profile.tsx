import React, { useEffect, useState } from "react";
import { type User } from "@/types/dashboardTypes";
import { getProfile, updateProfile } from "../../utils/custApiHelper";

export default function Profile() {
  const [user, setUser] = useState<User>({ id: "", name: "", email: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const data = await getProfile();
    setUser(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name: user.name, email: user.email });
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input
        className="p-2 border"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <input
        className="p-2 border"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Update Profile
      </button>
    </form>
  );
}
