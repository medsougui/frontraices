import * as React from "react"
import {
  AudioWaveform,
  Command,
  TableProperties,
  GalleryVerticalEnd,
  SquareStack,
  SquareTerminal,
} from "lucide-react"
import { SearchForm } from "@/components/dashboard/search-form"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavProjects } from "@/components/dashboard/nav-projects"
import { NavUser } from "@/components/dashboard/nav-user"
/* import { TeamSwitcher } from "@/components/team-switcher" */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashbord",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "main",
          url: "#",
        },
        {
          title: "History",
          url: "#",
        },
        {
          title: "History",
          url: "#",
        },
      ],
    },
    
  ],
  projects: [
    {
      name: "Product",
      url: "#",
      icon: TableProperties,
    },
    {
      name: "Types",
      url: "#",
      icon: SquareStack,
    },
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
