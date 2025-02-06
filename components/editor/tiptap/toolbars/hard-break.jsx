"use client";

import { WrapText } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

const HardBreakToolbar = React.forwardRef(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    if (!editor) {
      return null;
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 p-0 sm:h-9 sm:w-9", className)}
              onClick={(e) => {
                editor.chain().focus().setHardBreak().run();
                onClick?.(e);
              }}
              ref={ref}
              {...props}
            >
              {children ?? <WrapText className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Hard break</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

HardBreakToolbar.displayName = "HardBreakToolbar";

export { HardBreakToolbar };
