"use client";

import { Button } from "@ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type CopyButtonProps = {
  originalUrl: string;
};

export const CopyButton = ({ originalUrl }: CopyButtonProps) => {
  const handleCopy = async () => {
    try {
      const response = await fetch(originalUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy image");
    }
  };

  return (
    <Button variant="secondary" className="flex-1" onClick={handleCopy}>
      <Copy className="mr-2 size-4" />
      Copy
    </Button>
  );
};
