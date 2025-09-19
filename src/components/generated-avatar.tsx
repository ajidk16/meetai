import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface generatedAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  variant?: "botttsNeutral" | "initials";
}

const GeneratedAvatar = ({
  seed,
  className,
  variant = "botttsNeutral",
}: generatedAvatarProps) => {
  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  } else {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }

  return (
    <Avatar className={cn(className, "bg-muted")}>
      <AvatarImage src={avatar.toDataUri()} className={className} alt="" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default GeneratedAvatar;
