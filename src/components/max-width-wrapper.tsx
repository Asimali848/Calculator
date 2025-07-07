import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto h-[calc(100dvh-40px)] w-full max-w-screen-xl overflow-auto rounded-xl rounded-r-3xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
