import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { signupUser } from "@/services/authService";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  userType: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
      acceptTerms: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    const response = await signupUser(data.name, data.email, data.password, data.userType);
    setIsLoading(false);
    if (response.success) {
      toast.success(response.message);
      navigate("/login");
    } else {
      toast.error(response.message);
    }
  };
  const password = watch("password");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {Object.values(errors)[0]?.message as string}
          </AlertDescription>
        </Alert>
      )}

      <div>
        <Label htmlFor="name"  className="block text-sm font-medium leading-6 text-gray-900">Full name</Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          disabled={isLoading}
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
          })}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" >Email address</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          disabled={isLoading}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          })}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm password</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

            <div>
        <Label className="block text-sm font-medium leading-6 text-gray-900">I want to join as a</Label>
        <div className="mt-2">
          <RadioGroup
            defaultValue="buyer"
            onValueChange={(value) => setValue("userType", value as "buyer" | "seller" | "admin")}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="user" id="user" />
              <Label htmlFor="buyer" className="cursor-pointer">
                Buyer - I want to purchase products
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="seller" id="seller" />
              <Label htmlFor="seller" className="cursor-pointer">
                Seller - I want to sell agricultural products
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin" className="cursor-pointer">
                Admin - I need to manage the platform
              </Label>
            </div>
          </RadioGroup>
          {errors.userType && <p className="mt-1 text-sm text-red-500">{errors.userType.message}</p>}
        </div>
      </div>

      <div className="flex items-center">
      <input type="checkbox" {...register("acceptTerms", { required: true })} />
        <Label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
          I agree to the{" "}
          <a href="#" className="font-semibold text-green-600 hover:text-green-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-semibold text-green-600 hover:text-green-500">
            Privacy Policy
          </a>
        </Label>
      </div>
      {/* {errors.acceptTerms && (
        <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
      )} */}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 focus:ring-green-500"
      >
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
