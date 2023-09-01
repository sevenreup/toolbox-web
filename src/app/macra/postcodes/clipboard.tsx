import React from "react";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { useState } from "react";

type Props = {
  text: string;
};

const ClipboardButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="ghost"
      size="sm"
      onMouseLeave={() => setCopied(false)}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
      }}
      className="tooltip"
    >
      <Clipboard className="h-4 w-4" />
      <span className="tooltiptext" id="myTooltip">
        {copied ? "Copied!" : "Copy to clipboard"}
      </span>
    </Button>
  );
};

export default ClipboardButton;
