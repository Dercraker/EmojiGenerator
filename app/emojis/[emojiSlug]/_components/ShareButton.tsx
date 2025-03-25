"use client";

import { Button } from "@ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";

type ShareButtonProps = {
  prompt: string;
};

export const ShareButton = ({ prompt }: ShareButtonProps) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: prompt,
        text: `Check out this prompt: ${prompt}`,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL copied to clipboard!");
    }
  };

  return (
    <Button variant="secondary" className="flex-1" onClick={handleShare}>
      <Share className="mr-2 size-4" />
      Share
    </Button>
  );
};
