import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Camera, AlertCircle, Eye, EyeOff } from "lucide-react";
import userService from "@/services/userservice";

type FormData = {
  id?: number;
  username: string;
  email: string;
  last_login: Date ;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  password: string;
  confirm_password: string;
  photo:string;
};

type ValidationErrors = {
  [key in keyof FormData]?: string;
};

export function SignupForm({ onSubmit, className = "" }: { onSubmit?: (data: FormData) => void; className?: string }) {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    last_login: new Date(),
    is_superuser: false,
    first_name: "",
    last_name: "",
    is_staff: false,
    is_active: true,
    date_joined: new Date(),
    password: "",
    confirm_password: "",
    photo:""
  });

  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = async (): Promise<boolean> => {
    const errors: ValidationErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address";
    }

    // Await the result of userService.findByEmail
    const emailExists = await userService.findByEmail(formData.email);
    if (emailExists) {
        errors.email = "Email address is already used";
    }

    if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirm_password) {
        errors.confirm_password = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
  
    if (name === "pdp" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // The Base64-encoded string will be in `reader.result`
        setFormData((prev) => ({
          ...prev,
          photo: reader.result as string, // Also store it for backend
        }));
        setPreviewUrl(reader.result as string); // If you need to display the image preview
      };
  
      // Read the file as a Data URL (Base64-encoded string)
      reader.readAsDataURL(file);
    } else {
      // For other form fields, handle input changes normally
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (validationErrors[name as keyof FormData]) {
        setValidationErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    const isValid = await validateForm(); // Wait for the form validation to complete
    if (!isValid) {
      setError("Please fix the errors in the form");
      return;
    }
  
    try {
      const userData = {
        ...formData,
        username: `${formData.first_name}${formData.last_name}`.toLowerCase(), // Auto-generate username
      };
  
      if (onSubmit) {
        onSubmit(userData); // Pass the data to the parent component if validation is successful
      } else {
        console.log("User created successfully");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <Card className="overflow-hidden border border-[#C5A880]">
        <CardContent className="grid p-0">
          <form className="p-5 md:p-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-[#4E6629]">Create Account</h1>
                <p className="text-balance text-[#6E6A62]">Join Acme Inc today</p>
              </div>

              {/* Profile Picture Preview */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-28 h-28 group">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#C5A880]">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <User className="w-16 h-14 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="pdp"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <div className="bg-[#FFC107] p-3 rounded-full">
                      <Camera className="w-6 h-6 text-[#4E6629]" />
                    </div>
                  </label>
                  <Input
                    id="pdp"
                    name="pdp"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-[#6E6A62]">Click to upload your profile picture</p>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first_name" className="text-[#4E6629]">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className="border-[#C5A880] focus:ring-[#4E6629]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name" className="text-[#4E6629]">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    className="border-[#C5A880] focus:ring-[#4E6629]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[#4E6629]">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@example.com"
                  required
                  className="border-[#C5A880] focus:ring-[#4E6629]"
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-[#4E6629]">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="border-[#C5A880] focus:ring-[#4E6629] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4E6629]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-red-500">{validationErrors.password}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm_password" className="text-[#4E6629]">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    required
                    className="border-[#C5A880] focus:ring-[#4E6629] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4E6629]"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {validationErrors.confirm_password && (
                  <p className="text-sm text-red-500">{validationErrors.confirm_password}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-[#4E6629]"
              >
                Create Account
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="text-center text-sm text-[#6E6A62]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {}}
                  className="underline underline-offset-4 text-[#6E6A62] hover:text-[#4E6629]"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-[#6E6A62]">
        By clicking continue, you agree to our{" "}
        <button type="button" className="underline underline-offset-4 hover:text-[#4E6629]">
          Terms of Service
        </button>{" "}
        and{" "}
        <button type="button" className="underline underline-offset-4 hover:text-[#4E6629]">
          Privacy Policy
        </button>.
      </div>
    </div>
  );
}
