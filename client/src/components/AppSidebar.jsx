import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { IoHomeOutline } from "react-icons/io5";
import { GoDot } from "react-icons/go";
import logo from '../assets/react.svg'
import { TbCategory } from "react-icons/tb";
function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} alt=""  width={50}/>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup >
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <IoHomeOutline/>
                        <Link to="">Home</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <IoHomeOutline/>
                        <Link to="">Categories</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <IoHomeOutline/>
                        <Link to="">Blogs</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <IoHomeOutline/>
                        <Link to="">Comments</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <IoHomeOutline/>
                        <Link to="">User</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup >
            <SidebarGroupLabel>
            <TbCategory/>
                Categories
                </SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <GoDot/>
                        <Link to="">Home</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar