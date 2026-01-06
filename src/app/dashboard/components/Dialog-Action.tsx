"use client";

import React, { ReactNode } from "react";
import { Button } from "@/ui/shadcn/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmActionButtonProps {
  /** Function to call when confirmed */
  onConfirm: () => void;
  /** Text for dialog title */
  title?: string;
  /** Text for dialog description */
  description?: string;
  /** Text for confirm button */
  confirmText?: string;
  /** Optional class for the trigger button */
  buttonClassName?: string;
  /** Optional icon or content for trigger button */
  trigger?: ReactNode;
  /** Variant & size for the trigger button (optional) */
  triggerSize?: "icon" | "sm" | "md" | "lg";
  triggerVariant?: "ghost" | "outline" | "default" | "destructive";
}

const ConfirmActionButton: React.FC<ConfirmActionButtonProps> = ({
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  buttonClassName,
  trigger,
  triggerVariant = "ghost",
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={triggerVariant} className={buttonClassName}>
          {trigger || "Action"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmActionButton;
