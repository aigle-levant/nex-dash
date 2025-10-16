import { useEffect, useState } from "react";
import { getProfile, getCustomers } from "@/api/dashboardApi";
import type { Customer, User } from "@/types/dashboardTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [profile, setProfile] = useState<User | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const user = await getProfile();
        setProfile(user?.data ?? null);

        const customerList = await getCustomers();
        setCustomers(customerList ?? []);
      } catch (err) {
        console.error("Error loading dashboard:", err);
        setProfile(null);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalCustomers = customers.length;
  const recentCustomers = customers
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Profile Card */}
          {profile && (
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Email: {profile.email}</p>
              </CardContent>
            </Card>
          )}

          {/* Total Customers Card */}
          <Card>
            <CardHeader>
              <CardTitle>Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalCustomers}</p>
            </CardContent>
          </Card>

          {/* Recent Customers */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentCustomers.length === 0 ? (
                <p>No recent customers.</p>
              ) : (
                recentCustomers.map((c) => (
                  <Card
                    key={c.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`https://ui-avatars.com/api/?name=${c.name}`}
                          />
                          <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{c.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {c.email}
                          </p>
                        </div>
                      </div>

                      <div className="text-sm space-y-1">
                        <p>GSTIN: {c.gstin}</p>
                        <p>
                          Created At:{" "}
                          {new Date(c.created_at).toLocaleDateString()}
                        </p>
                        <p>Status: {c.status || "pending"}</p>
                      </div>

                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link" size="sm">
                            View Details
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <div className="space-y-1">
                            <p className="font-semibold">{c.name}</p>
                            <p>{c.email}</p>
                            <p>Status: {c.status || "pending"}</p>
                            <p>GSTIN: {c.gstin}</p>
                            <p>
                              Created At:{" "}
                              {new Date(c.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          {/* Manage Customers Button */}
          <div>
            <Button onClick={() => (window.location.href = "/customers")}>
              Manage Customers
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
