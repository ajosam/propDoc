"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLibraryStore } from "@/lib/store/library-store";

export function DeletePropertyDialog({
  propertyId,
  propertyName,
  onDeleted,
  trigger,
}: {
  propertyId: string;
  propertyName: string;
  onDeleted: () => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const removeProperty = useLibraryStore((s) => s.removeProperty);

  function handleConfirm() {
    removeProperty(propertyId);
    setOpen(false);
    onDeleted();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove {propertyName} from library?</DialogTitle>
          <DialogDescription>
            This removes the property from your library. This can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="gap-1.5">
            <Trash2 className="size-4" />
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
