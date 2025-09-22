"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";

/**
 * Lightweight wrapper around Cmdk's `CommandPrimitive` that applies project-standard styles and slot mapping.
 *
 * Renders a `CommandPrimitive` with `data-slot="command"`, a default set of layout and theme classes,
 * and forwards all received props. The `className` prop is merged with the component's default classes.
 */
function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  );
}

/**
 * Responsive command-palette container that renders a Drawer on mobile and a Dialog on desktop.
 *
 * On mobile (when useIsMobile() is true) this component renders a Drawer with the palette content;
 * on desktop it renders a Dialog. The provided children should be Cmdk-based command UI elements
 * (e.g., Command, CommandInput, CommandList). All extra props are forwarded to the underlying
 * Drawer (mobile) or Dialog (desktop).
 *
 * @param title - Title used for the (screen-reader-only) header; defaults to "Command Palette".
 * @param description - Description used for the (screen-reader-only) header; defaults to "Search for a command to run...".
 * @param className - Applied to the DialogContent on the desktop path (merged with internal classes).
 * @param showCloseButton - Controls whether the DialogContent shows a close button on desktop; defaults to true.
 * @returns A React element rendering the responsive command palette.
 */
function CommandResponsiveDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer {...props}>
        <DrawerContent className="overflow-hidden p-0">
          <DrawerHeader className="sr-only">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            {children}
          </Command>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Desktop-only command palette wrapped in a Dialog.
 *
 * Renders a Dialog containing screen-reader-only header (title + description) and a
 * DialogContent that hosts the shared `Command` component. Intended for non-mobile
 * (desktop) usage.
 *
 * @param title - Visible to screen readers; defaults to "Command Palette"
 * @param description - Screen-reader-only description shown inside the dialog header
 * @param className - Additional classes appended to the DialogContent container
 * @param showCloseButton - Whether the DialogContent should render a close button (default: true)
 * @returns A React element rendering the command palette inside a Dialog
 */
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Renders a styled command palette input with a leading search icon.
 *
 * The component mounts a wrapper (data-slot="command-input-wrapper") containing a
 * SearchIcon and a Cmdk CommandPrimitive.Input (data-slot="command-input"). All props
 * are forwarded to the underlying input; use `className` to extend or override the
 * input's CSS classes.
 *
 * @param className - Additional class names applied to the input element
 */
function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

/**
 * Renders a Cmdk `List` with built-in max-height and scrolling styles.
 *
 * Wraps `CommandPrimitive.List`, sets `data-slot="command-list"`, applies
 * default max-height and overflow classes for a scrollable list, and forwards
 * all props (including `className`) to the underlying component.
 */
function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders the Cmdk "Empty" slot for the command palette with default styling.
 *
 * The component forwards all props to `CommandPrimitive.Empty`, sets
 * `data-slot="command-empty"` for slot mapping, and applies small centered
 * padding/text styles (`py-6 text-center text-sm`). Any incoming `className`
 * or other props are merged/forwarded to the underlying primitive.
 *
 * @returns A React element rendering the empty-state slot for the command palette.
 */
function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

/**
 * Wrapper around Cmdk's CommandPrimitive.Group that applies project-specific styling.
 *
 * Renders a Cmdk group element with data-slot="command-group" and the default utility
 * classes used by the command palette (including muted group-heading styles). Passes
 * through all other props to the underlying Cmdk Group.
 */
function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders a horizontal separator for the command palette.
 *
 * The element includes `data-slot="command-separator"` so Cmdk or other consumers can target it,
 * and applies the default separator styling. Additional class names passed via `className`
 * will be merged with the defaults.
 */
function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * A styled wrapper around Cmdk's CommandPrimitive.Item for use in the command palette.
 *
 * Applies a default set of utility classes (selected/disabled states, SVG sizing/behavior, layout)
 * and sets `data-slot="command-item"`. Forwards all props to `CommandPrimitive.Item` and merges
 * any provided `className`.
 */
function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

/**
 * Visual container for displaying a keyboard shortcut inside a command palette.
 *
 * Renders a <span> with the `data-slot="command-shortcut"` attribute and default
 * styling (right-aligned, small uppercase tracking). Any `className` provided
 * will be merged with the defaults; all other span props are forwarded.
 *
 * @param className - Additional CSS classes to merge with the default styling.
 */
function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandResponsiveDialog,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
