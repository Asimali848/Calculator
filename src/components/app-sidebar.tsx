import { useEffect, useState } from "react";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { CirclePower } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "@/assets/img/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { items } from "@/lib/constants";
import { cn, truncateString } from "@/lib/utils";
import { useGetUserQuery } from "@/store/services/user";

import { Button } from "./ui/button";
import WarningModal from "./warning-modal";

const AppSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout, getToken } = useKindeAuth();
  const [token, setToken] = useState<string>("");
  const [warn, setWarn] = useState<boolean>(false);
  const { data, refetch } = useGetUserQuery(`${token}`, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  const [userData, setUserData] = useState(data);

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchToken = async () => {
      if (getToken) {
        const newToken = await getToken();
        setToken(newToken || "");
      }
    };

    fetchToken();
  }, [getToken]);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  return (
    <>
      <WarningModal
        open={warn}
        setOpen={setWarn}
        message="Are you sure you want to logout?"
        cta={logout}
      />
      <Sidebar>
        <SidebarHeader className="bg-gray-100 dark:bg-gray-900">
          <Link
            to="https://pimpact-landing-page.vercel.app/"
            className="flex h-12 w-full items-center justify-center"
          >
            <img
              src={Logo}
              alt="Logo"
              className="size-32 cursor-pointer dark:invert"
            />
          </Link>
        </SidebarHeader>
        <SidebarContent className="bg-sidebar-background p-5">
          <SidebarGroup className="">
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn("", {
                    "rounded-md bg-primary text-white": pathname.includes(
                      item.url
                    ),
                  })}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-sidebar-background border-t pb-6 pt-5">
          <div className="flex w-full items-center justify-center gap-2.5">
            <img
              src={
                userData?.profile_picture_url
                  ? userData?.profile_picture_url
                  : "https://ui.shadcn.com/avatars/02.png"
              }
              alt="User Profile"
              className="size-10 shrink-0 cursor-pointer rounded-full"
              onClick={() => navigate("/profile")}
            />
            <div
              onClick={() => navigate("/profile")}
              className="flex w-full cursor-pointer flex-col items-start justify-center"
            >
              <span className="w-full overflow-hidden truncate text-left text-sm font-semibold">
                {data?.first_name
                  ? truncateString(`${data?.first_name} ${data?.last_name}`, 15)
                  : truncateString(
                      `${user?.given_name} ${user?.family_name}`,
                      15
                    )}
              </span>
              <span className="flex overflow-hidden truncate text-left text-xs font-light">
                {truncateString(`${user?.email}`, 15)}
              </span>
            </div>
            <Button
              onClick={() => setWarn(true)}
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 hover:bg-gray-200"
            >
              <CirclePower className="size-full text-red-500" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
