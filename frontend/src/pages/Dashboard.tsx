import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import AdminDashboard from "@/components/dashboard/Admin";
import { getProfile } from "@/api/dashboardApi";
import type { User } from "@/types/dashboardTypes";

export default function DashboardPage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await getProfile();
        console.log("Profile data:", res?.data);
        setProfile(res?.data ?? null);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Failed to load profile.</p>;

  return profile.is_admin ? <AdminDashboard /> : <Dashboard />;
}
