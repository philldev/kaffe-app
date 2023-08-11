import { cn } from "@/lib/utils";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-foreground",
        className
      )}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const OverlaySpinner = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-background/50 grid place-items-center">
      <Spinner />
    </div>
  );
};
