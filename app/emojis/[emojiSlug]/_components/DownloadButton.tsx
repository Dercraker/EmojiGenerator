"use client";

import { Button } from "@ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

type DownloadButtonProps = {
  prompt: string;
  originalUrl: string;
};

export const DownloadButton = ({
  originalUrl,
  prompt,
}: DownloadButtonProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(originalUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${prompt.toLowerCase().replace(/\s+/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Download started!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  return (
    <Button variant="secondary" className="flex-1" onClick={handleDownload}>
      <Download className="mr-2 size-4" />
      Download
    </Button>
  );
};
