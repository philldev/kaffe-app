import clsx from "clsx";

export const Spinner = () => {
  return (
    <div
      className={clsx(
        "animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-foreground"
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
