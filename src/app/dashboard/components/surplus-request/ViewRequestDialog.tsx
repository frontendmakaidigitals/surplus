"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type SurplusRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  businessName?: string;
  description?: string;
  category: string;
  quantity: string;
  condition: string;
  location: string;
  images?: string[];
  message?: string;
  createdAt: string;
};

type ViewRequestDialogProps = {
  request: SurplusRequest;
};

export function ViewRequestDialog({ request }: ViewRequestDialogProps) {
  const images = [
    "/hydraulic_pump/hydraulic_pump_3.jpg",
    "/hydraulic_pump/hydraulic_pump.jpg",
    "/hydraulic_pump/hydraulic_pump2.jpg",
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View Full
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Surplus Request Details</DialogTitle>
          <DialogDescription>
            Full information submitted by the user.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Detail label="Name" value={request.name} />
          <Detail label="Phone" value={request.phone} />
          <Detail label="Email" value={request.email} />
          <Detail label="Business" value={request.businessName || "—"} />
          <Detail label="Category" value={request.category} />
          <Detail label="Quantity" value={request.quantity} />
          <Detail label="Condition" value={request.condition} />
          <Detail label="Location" value={request.location} />
          <Detail label="Submitted On" value={request.createdAt} />

          <div className="col-span-2">
            <Detail label="Description / Message" value={request.description} />
          </div>

          {/* IMAGES */}
          <div className="col-span-2 mt-2">
            <p className="text-sm font-semibold mb-2">Images</p>

            {images?.length > 0 ? (
              <div className="flex flex-nowrap gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Upload"
                    className="aspect-square bg-neutral-50 h-24 object-contain rounded border"
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No images uploaded.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
type DetailProps = {
  label: string;
  value?: string | number | null;
};

function Detail({ label, value }: DetailProps) {
  return (
    <div className="flex flex-col">
      <p className="font-medium ">{label}</p>
      <p className=" rounded-lg mt-1 border bg-slate-200/20 border-slate-400/40 px-3 p-2 text-sm break-words text-muted-foreground">
        {value}
      </p>
    </div>
  );
}
