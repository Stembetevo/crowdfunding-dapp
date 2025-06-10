import { CircleUserRound,  LayoutDashboard, LogOut, Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    name: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Campaign',
    url: '/create-campaign',
    icon: Plus,
  },
  {
    name: 'Profile',
    url: '/profile',
    icon: CircleUserRound,
  },
  {
    name: 'Log out',
    url: '/log-out',
    icon: LogOut,
  },
  
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Peana</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      
                      <item.icon />
                      <span>{item.name}</span>
                    
                    </Link>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
