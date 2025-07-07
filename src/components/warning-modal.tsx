import type { Dispatch, SetStateAction } from "react";

import { Loader2, TriangleAlert } from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface WarningModalProps {
  open: boolean;
  message: string;
  cta?: (() => void | Promise<void>) | undefined;
  loading?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const WarningModal = ({
  cta,
  open,
  message,
  loading,
  setOpen,
}: WarningModalProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!loading) {
      setOpen(isOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm md:max-w-md">
        <DialogHeader>
          <DialogTitle>Warning</DialogTitle>
          <DialogDescription>
            Please ensure before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col items-center justify-center gap-5 py-10">
          <TriangleAlert className="size-14 text-destructive" />
          <p className="w-full text-center text-xl font-bold">{message}</p>
        </div>
        <DialogFooter className="gap-2.5">
          <Button
            onClick={() => {
              if (!loading) {
                setOpen(false);
              }
            }}
            type="button"
            variant="outline"
            size="default"
            className="hover:text-white"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              if (cta) {
                cta();
              } else if (!loading) {
                setOpen(false);
              }
            }}
            type="submit"
            variant="destructive"
            size="default"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningModal;
