
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
import { FormattedMessage } from "react-intl";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-health-primary w-8 h-8 flex items-center justify-center">
            <span className="text-white font-semibold">HC</span>
          </div>
          <div className="font-semibold text-lg">
            <FormattedMessage id="app.name" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <FormattedMessage id="sidebar.main" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" className="flex items-center space-x-2">
                    <Home className="h-4 w-4" />
                    <span><FormattedMessage id="sidebar.dashboard" /></span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/chat" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span><FormattedMessage id="sidebar.chat" /></span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/history" className="flex items-center space-x-2">
                    <History className="h-4 w-4" />
                    <span><FormattedMessage id="sidebar.history" /></span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/symptoms" className="flex items-center space-x-2">
                    <FileQuestion className="h-4 w-4" />
                    <span><FormattedMessage id="sidebar.symptoms" /></span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/diet" className="flex items-center space-x-2">
                    <PieChart className="h-4 w-4" />
                    <span><FormattedMessage id="sidebar.diet" /></span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/mental-health" className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span><FormattedMessage id="sidebar.mentalHealth" /></span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/profile" className="flex items-center space-x-2">
                    <UserCircle className="h-4 w-4" />
                    <span><FormattedMessage id="sidebar.profile" /></span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground">
        <div><FormattedMessage id="app.version" /></div>
        <div><FormattedMessage id="app.copyright" /></div>
      </SidebarFooter>
    </Sidebar>
  );
};
