"use client";
import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Confetti, type ConfettiRef } from "./shadcn/confetti";
import { Button } from "./shadcn/button";

type FormSubmitProp = {
  successOpen: boolean;
  setSuccessOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitSuccess: React.FC<FormSubmitProp> = ({
  successOpen,
  setSuccessOpen,
}) => {
  const confettiRef = useRef<ConfettiRef>(null);

  // Fire confetti globally
  useEffect(() => {
    if (successOpen) {
      setTimeout(() => {
        confettiRef.current?.fire({});
      }, 200);
    }
  }, [successOpen]);

  return (
    <>
      {successOpen && (
        <Confetti
          ref={confettiRef}
          className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  z-[100] size-full"
        />
      )}

      {/* MODAL */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Request Submitted Sucessfully
            </DialogTitle>
          </DialogHeader>

          <p className="text-center text-gray-600">
            Thank you for submitting your request. Our team has received it and
            will get in touch with you shortly to discuss the next steps.
          </p>

          <div className="flex justify-end mt-4">
            <Button onClick={() => setSuccessOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubmitSuccess;
