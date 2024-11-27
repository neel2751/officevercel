import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { getMenu, MENU } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Badge } from "../ui/badge";

const SideBarHeaderCom = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center border border-neutral-200 p-1 justify-center rounded-lg text-sidebar-primary-foreground">
                  <Image
                    src="/images/cdc.svg"
                    alt="Logo"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CDC</span>
                  <span className="truncate text-xs">
                    Creative Design & Construction
                  </span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

const SideBarMenu = () => {
  const pathName = usePathname();
  // if our path is dynamic , we need to get the menu item that matches the path
  const path = pathName.split("/", 3).join("/");
  const currentMenu = getMenu(path);

  const { data } = useSession();
  const menuItems = MENU.filter((item) => item.role.includes(data?.user?.role));
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu className="gap-4">
          {menuItems?.map((item) => (
            <Collapsible
              key={item.name}
              asChild
              defaultOpen={item?.name === currentMenu?.name}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.name}
                    className={`${
                      item?.name === currentMenu?.name
                        ? "bg-neutral-200 text-neutral-900"
                        : "hover:bg-gray-100"
                    } text-sm text-gray-800 font-normal rounded-lg flex items-center p-2 group`}
                  >
                    <Link href={item?.path}>
                      {item.icon}
                      <span>{item?.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

const SideBarFooterCom = () => {
  const { data: session } = useSession();

  return (
    <SidebarFooter className="border-t">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user?.image || "/images/cdc.svg"}
                    alt={session?.user?.name || "CDC"}
                  />
                  <AvatarFallback className="rounded-lg">N</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.user?.name || "CDC"}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user?.email || "info@cdc.construction"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.user?.image || "/images/cdc.svg"}
                      alt={session?.user?.name || "CDC"}
                    />
                    <AvatarFallback className="rounded-lg">N</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user?.name || "CDC"} -{" "}
                      <span className="text-xs lowercase text-neutral-700">
                        {session?.user?.role || "None"}
                      </span>
                    </span>
                    <span className="truncate text-xs">
                      {session?.user?.email || "info@cdc.construction"}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles className="text-neutral-500" />
                  <span className="text-xs font-medium text-neutral-500">
                    Current Version : CDC/v1.1
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export { SideBarFooterCom, SideBarHeaderCom, SideBarMenu };