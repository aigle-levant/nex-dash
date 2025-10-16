import { useEffect, useState } from "react";
import { type User } from "@/types/dashboardTypes";
import bgImg from "../../assets/neximg.jpg";
import { getProfile } from "@/api/dashboardApi";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const [user, setUser] = useState<User & { gstin: string }>({
    id: 0,
    name: "",
    email: "",
    gstin: "",
    is_admin: false,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      if (data.success && data.data) {
        setUser({ ...data.data, gstin: data.data.gstin || "" });
      } else {
        console.error("Failed to fetch profile:", data.error);
        alert("Could not fetch profile. Please login again.");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      alert("Error fetching profile. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <header className="mb-6">
        <p className="text-2xl font-bold">Profile</p>
      </header>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={bgImg}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-semibold">{user.name || "Anonymous"}</h1>
      </div>
      <h2 className="text-lg font-medium mb-2">Details</h2>
      <ul className="flex flex-col gap-2 mb-4">
        <li>
          <span className="font-semibold">Name: </span>
          {user.name || "N/A"}
        </li>
        <li>
          <span className="font-semibold">Email: </span>
          {user.email || "N/A"}
        </li>
        <li>
          <span className="font-semibold">GSTIN: </span>
          {user.gstin || "N/A"}
        </li>
      </ul>

      <Button onClick={handleLogout} variant="destructive" className="w-full">
        Logout
      </Button>
    </div>
  );
}
