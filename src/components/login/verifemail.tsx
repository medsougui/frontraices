import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Apple } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import userService from "@/services/userservice";

interface EmailVerificationProps {
  formData: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
    photo: string;
    last_login: Date;
    is_superuser: boolean;
    is_staff: boolean;
    is_active: boolean;
    date_joined: Date;
    id?: number;
  };
}

export function EmailVerification({ formData }: EmailVerificationProps) {
  const [attempts, setAttempts] = useState(3);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [otpValue, setOtpValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [sentCode, setSentCode] = useState(""); // Code sent to email
  const navigate = useNavigate();
  const [verif,setVerif]=useState(false)
  
  useEffect(() => {
    const sendEmail = async () => {
      try {
        const code = await userService.sendVerificationEmail(formData.email);
        setSentCode(code); // Store the sent code
        console.log("Verification email sent to:", formData.email);
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    };
  if(!verif){
    sendEmail
    setVerif(true)
  }
    let timer: NodeJS.Timeout;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [formData.email, cooldownTime]);

  const createuser = async () => {
    try {
      await userService.create(formData);
      console.log("User created");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  // Handle OTP input verification
  const handleVerify = (code: string) => {
    setOtpValue(code);
    if (code.length === 4) {
      const isCorrect = code === sentCode;
      if (!isCorrect) {
        setAttempts((prev) => {
          const newAttempts = prev - 1;
          if (newAttempts === 0) {
            setIsDisabled(true);
            setOtpValue("");
          }
          return newAttempts;
        });
      } else {
        
        navigate("/login"); // Redirect on success
      }
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setAttempts(3);
    setIsDisabled(false);
    setOtpValue("");
    setCooldownTime(30); // Cooldown time
    try {
      const code = await userService.sendVerificationEmail(formData.email);
      setSentCode(code);
      console.log("Verification code resent:", code);
    } catch (error) {
      console.error("Failed to resend verification code:", error);
    }
  };

  // Format cooldown time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted">
      <Card className="w-full max-w-md border border-[#C5A880]">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            {/* Attempts Display */}
            <div className="flex justify-center gap-2 mb-2">
              {[...Array(3)].map((_, index) => (
                <Apple
                  key={index}
                  className={`w-6 h-6 ${index < attempts ? "text-[#FFC107]" : "text-gray-300"}`}
                />
              ))}
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#4E6629] mb-2">Verify Your Email</h1>
              <p className="text-[#6E6A62]">
                We sent a verification code to <span className="font-medium">{formData.email}</span>
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={4}
                  value={otpValue}
                  onChange={(value) => handleVerify(value)}
                  disabled={isDisabled}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border-[#C5A880] focus:ring-[#4E6629]" />
                    <InputOTPSlot index={1} className="border-[#C5A880] focus:ring-[#4E6629]" />
                    <InputOTPSlot index={2} className="border-[#C5A880] focus:ring-[#4E6629]" />
                    <InputOTPSlot index={3} className="border-[#C5A880] focus:ring-[#4E6629]" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-[#4E6629]"
                disabled={isDisabled}
              >
                Verify Email
              </Button>

              <div className="flex flex-col gap-2 items-center">
                <Button
                  type="button"
                  onClick={handleResend}
                  variant="outline"
                  className="border-[#C5A880] text-[#4E6629]"
                  disabled={cooldownTime > 0}
                >
                  {cooldownTime > 0
                    ? `Resend in ${formatTime(cooldownTime)}`
                    : "Resend Code"}
                </Button>
              </div>

              {isDisabled && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Too many incorrect attempts. Please request a new code.
                  </AlertDescription>
                </Alert>
              )}

              <p className="text-sm text-center text-[#6E6A62]">
                Didn't receive the code? Check your spam folder or try resending the code.
              </p>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
