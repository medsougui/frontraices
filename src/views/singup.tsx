import { useState } from "react";
import { SignupForm } from "@/components/login/singup-form";
import { EmailVerification } from "@/components/login/verifemail";

type FormData = {
  id?: number;
  username: string;
  email: string;
  last_login: Date;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  password: string;
  confirm_password: string;
  photo: string;
};

export default function Singuppage() {
  const [Data, setFormData] = useState<FormData | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track if form is submitted
  const handleData = (data: FormData) => {
    setFormData(data);
    setFormSubmitted(true); // Set formSubmitted to true to hide the form
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted">
      <div className="w-full max-w-sm md:max-w-3xl">
        {!formSubmitted && <SignupForm onSubmit={handleData} />} {/* Render SignupForm only if not submitted */}
        
        {formSubmitted && Data && ( // Ensure Data is not null before passing to EmailVerification
          <EmailVerification 
            formData={Data}  
          />
        )}
      </div>
    </div>
  );
}
