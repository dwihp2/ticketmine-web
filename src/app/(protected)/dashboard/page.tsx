import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, Ticket, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your TicketMine dashboard. Here&apos;s an overview of your account.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Tickets
            </CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,234</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>
              Latest events created in your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Summer Music Festival 2024
                  </p>
                  <p className="text-sm text-muted-foreground">
                    August 15, 2024 • Golden Gate Park
                  </p>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  234 tickets sold
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Tech Conference 2024
                  </p>
                  <p className="text-sm text-muted-foreground">
                    September 22, 2024 • Moscone Center
                  </p>
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  89 tickets sold
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Food & Wine Festival
                  </p>
                  <p className="text-sm text-muted-foreground">
                    October 5, 2024 • Union Square
                  </p>
                </div>
                <div className="text-sm text-orange-600 font-medium">
                  456 tickets sold
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <button className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">Create New Event</div>
              <div className="text-sm text-muted-foreground">Set up a new event and start selling tickets</div>
            </button>
            
            <button className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">View Analytics</div>
              <div className="text-sm text-muted-foreground">Check your event performance and sales data</div>
            </button>
            
            <button className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">Manage Events</div>
              <div className="text-sm text-muted-foreground">Edit existing events and ticket types</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}