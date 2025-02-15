import { AvatarImage } from "@radix-ui/react-avatar";
import { Calendar, Home, Inbox, Search, Settings, Upload } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import TomatoImage from "../assets/tomato_1f345.png";
import { Avatar } from "./ui/avatar";

const menuItems = [
  {
    title: "Upload",
    url: "#",
    icon: Upload,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const areas = [
  {
    title: "Page1",
    url: "#",
    icon: Home,
  },
  {
    title: "My Notes",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="pt-4 px-4">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={TomatoImage} />
          </Avatar>
          <div className="flex flex-col">
            <h1>Tomato Drive</h1>
            <small>Nightwatch</small>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Private</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {areas.map((area) => (
                <SidebarMenuItem key={area.title}>
                  <SidebarMenuButton asChild>
                    <a href={area.url}>
                      <area.icon />
                      <span>{area.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
