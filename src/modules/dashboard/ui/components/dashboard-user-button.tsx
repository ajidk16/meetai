import GeneratedAvatar from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const { data, isPending } = authClient.useSession();

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  if (isPending ?? data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden p-3 gap-2">
          {data?.user?.image ? (
            <Avatar>
              <AvatarImage
                src={data?.user?.image ?? ""}
                alt={data?.user?.name}
              />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data?.user?.name || "U"}
              className="size-9 mr-3"
              variant="initials"
            />
          )}
          <div className="flex flex-col text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data?.user?.name}</p>
            <p className="text-xs truncate w-full">{data?.user?.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data?.user?.name}</DrawerTitle>
            <DrawerDescription>{data?.user?.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline">
              <CreditCardIcon className="size-4" />
              Billing
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOutIcon className="size-4" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden p-3 gap-2">
        {data?.user?.image ? (
          <Avatar>
            <AvatarImage src={data?.user?.image ?? ""} alt={data?.user?.name} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data?.user?.name || "U"}
            className="size-9 mr-3"
            variant="initials"
          />
        )}
        <div className="flex flex-col text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data?.user?.name}</p>
          <p className="text-xs truncate w-full">{data?.user?.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="truncate font-medium">{data?.user.name}</span>
            <span className="truncate font-normal text-sm text-muted-foreground">
              {data?.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={onLogout}
        >
          Logout <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
