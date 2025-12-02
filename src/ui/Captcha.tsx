"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./shadcn/button";
import { toast } from "sonner";
export default function Captcha({
  onVerify,
}: {
  onVerify: (valid: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [captchaText, setCaptchaText] = useState("");
  const [input, setInput] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaText(text);
  };

  // Draw captcha on canvas
  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#333";
    ctx.textBaseline = "middle";

    const startX = 15;
    const centerY = canvas.height / 2;

    // Draw each character separately with random rotation
    for (let i = 0; i < captchaText.length; i++) {
      const char = captchaText[i]!;

      const angle = (Math.random() * 20 - 10) * (Math.PI / 180); // -10° to +10°
      const x = startX + i * 22; // spacing between letters

      ctx.save();
      ctx.translate(x, centerY);
      ctx.rotate(angle);
      ctx.fillText(char, -5, 0);
      ctx.restore();
    }

    // Noise Lines
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.3})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * 140, Math.random() * 35);
      ctx.lineTo(Math.random() * 140, Math.random() * 35);
      ctx.stroke();
    }

    // Noise Dots
    for (let i = 0; i < 25; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.3})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * 140,
        Math.random() * 35,
        Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [captchaText]);

  // Validate input
  const handleVerify = () => {
    const isValid =
      input.trim().toUpperCase() === captchaText.trim().toUpperCase();
    setIsInvalid(!isValid);

    if (!isValid) {
      toast.error("Invalid Captcha", {
        className:
          "!bg-red-600/40 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
      });
    }

    onVerify(isValid);
  };
  return (
    <div className="space-y-2 select-none min-w-full">
      {/* Canvas */}
      <div className="flex w-full gap-3 ">
        <canvas
          ref={canvasRef}
          width={150}
          height={35}
          className="rounded-md border  bg-white"
        />
        <div className="flex items-center flex-1 gap-2 ">
          <input
            type="text"
            value={input}
            placeholder="Enter Captcha"
            onChange={(e) => {
              setIsInvalid(false);
              setInput(e.target.value);
            }}
            className={`border px-3 py-2 rounded-md w-full text-sm transition
    ${
      isInvalid
        ? "border-red-500 bg-red-100 placeholder:text-red-500"
        : "border-slate-400"
    }
  `}
          />

          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => {
              generateCaptcha();
              setInput("");
            }}
            className="px-3  py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            ↻
          </button>
        </div>
      </div>

      <Button
        type="button"
        disabled={input.trim().length === 0}
        onClick={handleVerify}
        className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primary/80"
      >
        Verify Captcha
      </Button>
    </div>
  );
}
