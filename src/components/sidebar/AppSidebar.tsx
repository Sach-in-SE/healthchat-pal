
import { Calendar, Home, History, PieChart, FileQuestion, Brain, UserCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Chat",
    icon: Calendar,
    url: "/chat",
  },
  {
    title: "History",
    icon: History,
    url: "/history",
  },
  {
    title: "Symptom Checker",
    icon: FileQuestion,
    url: "/symptoms",
  },
  {
    title: "Diet Suggestions",
    icon: PieChart,
    url: "/diet",
  },
  {
    title: "Mental Health",
    icon: Brain,
    url: "/mental-health",
  },
  {
    title: "Profile",
    icon: UserCircle,
    url: "/profile",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-health-primary w-8 h-8 flex items-center justify-center">
            <span className="text-white font-semibold">HC</span>
          </div>
          <div className="font-semibold text-lg">HealthChat</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground">
        <div>HealthChat v2.0</div>
        <div>© 2023 HealthChat</div>
      </SidebarFooter>
    </Sidebar>
  );
};
