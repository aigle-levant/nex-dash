import { useEffect, useState } from "react";
import { api } from "@/utils/apiHelper";
import type { Customer } from "@/types/dashboardTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCustomers() {
      setLoading(true);
      try {
        const res = await api.get("/all-customers");
        setCustomers(res.data.customers);
      } catch (err) {
        console.error("Error fetching all customers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllCustomers();
  }, []);

  const statusCounts = customers.reduce((acc: Record<string, number>, c) => {
    acc[c.status || "pending"] = (acc[c.status || "pending"] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{customers.length}</p>
              </CardContent>
            </Card>

            {/* Status Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <p key={status} className="capitalize">
                    {status}: {count}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* All Customers Table / Cards */}
          <Card>
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((c) => (
                <Card key={c.id} className="hover:shadow-lg transition-shadow">
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
                      <p>Broker ID: {c.broker_id}</p>
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
                          <p>Broker ID: {c.broker_id}</p>
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
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
