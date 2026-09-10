import { cn } from "@/lib/cn";

type Props = {
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
  width?: "shell" | "read";
  className?: string;
  children: React.ReactNode;
};

/** Gouttière et largeur maximale uniques pour tout le site. */
export function Container({ as: Tag = "div", width = "shell", className, children }: Props) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-gutter sm:px-8",
        width === "shell" ? "max-w-shell" : "max-w-read",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
