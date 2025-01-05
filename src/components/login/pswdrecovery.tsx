import { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { CheckCircle2 } from "lucide-react";
import { toast, Toaster } from "sonner"
const ProgressSteps = ({  currentStep = 0 }) => {
  const steps = [
    { number: 1, label: "Email" },
    { number: 2, label: "Verify" },
    { number: 3, label: "Password" }
  ];

 return (
    
    <div className="relative mb-8">
      <Progress 
  value={currentStep === 1 ? 0 : currentStep === 2 ? 49 : 100} 
  className="h-2 bg-[#FFF2D1]"
/>
      <div className="absolute -top-1 w-full flex justify-between">
        {steps.map((step, index) => (
          <div 
            key={step.number}
            className={`flex flex-col items-center relative ${
              index === 0 ? 'items-start' : index === steps.length - 1 ? 'items-end' : 'items-center'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center
                ${currentStep >= step.number 
                  ? 'bg-[#FFC107] text-[#4E6629]' 
                  : 'bg-[#FFF2D1] text-[#6E6A62]'
                }`}
            >
              {currentStep > step.number ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="text-sm">{step.number}</span>
              )}
            </div>
            <span className={`text-xs mt-1 ${
              currentStep >= step.number ? 'text-[#4E6629]' : 'text-[#6E6A62]'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export  function PasswordRecovery() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <ProgressSteps currentStep={step} />
      
      <Card className="overflow-hidden border border-[#C5A880]">
        <CardContent className="grid p-0">
          <div className="p-6 md:p-8">
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold text-[#4E6629]">Password Recovery</h1>
                  <p className="text-balance text-[#6E6A62]">
                    Enter your email to receive a verification code
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-[#4E6629]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-[#C5A880] focus:ring-[#4E6629]"
                  />
                </div>
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!email}
                  className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-[#4E6629]"
                >
                  Next
                </Button>
                <div className="text-center text-sm text-[#6E6A62]">
                  Remember your password?{" "}
                  <a href="login" className="underline underline-offset-4 text-[#6E6A62] hover:text-[#4E6629]">
                    Return to login
                  </a>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold text-[#4E6629]">Verify Your Email</h1>
                  <p className="text-balance text-[#6E6A62]">
                    We've sent a code to {email}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label className="text-center text-[#4E6629]">Enter verification code</Label>
                  <div className="flex justify-center">
                    <InputOTP 
                      value={otp} 
                      onChange={setOTP} 
                      maxLength={6}
                      className="gap-2"
                    >
                      <InputOTPGroup >
                        <InputOTPSlot index={0} className="border-[#C5A880] w-12 h-12" />
                        <InputOTPSlot index={1} className="border-[#C5A880] w-12 h-12" />
                        <InputOTPSlot index={2} className="border-[#C5A880] w-12 h-12" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup >
                        <InputOTPSlot index={3} className="border-[#C5A880] w-12 h-12" />
                        <InputOTPSlot index={4} className="border-[#C5A880] w-12 h-12" />
                        <InputOTPSlot index={5} className="border-[#C5A880] w-12 h-12" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="w-full border-[#C5A880] text-[#4E6629] hover:border-[#FFC107]"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={otp.length !== 6}
                    className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-[#4E6629]"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold text-[#4E6629]">Create New Password</h1>
                  <p className="text-balance text-[#6E6A62]">
                    Enter and confirm your new password
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword" className="text-[#4E6629]">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border-[#C5A880] focus:ring-[#4E6629]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword" className="text-[#4E6629]">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-[#C5A880] focus:ring-[#4E6629]"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="w-full border-[#C5A880] text-[#4E6629] hover:border-[#FFC107]"
                  >
                    Back
                  </Button>
                  <Button 
                        variant="outline"
                          onClick={() =>
                            toast.success("The change was successful", {
                              description: "your password are changed",
                              
                            })
                          }
                    
                    disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
                    className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-[#4E6629]"
                  >
                    Submit
                  </Button>
                  <Toaster richColors/>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}