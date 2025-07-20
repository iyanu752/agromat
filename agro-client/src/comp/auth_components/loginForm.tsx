import { loginUser } from "@/services/authService"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
  
    try {
      const response = await loginUser(data.email, data.password);
      
      if (!response) {
        console.log('response', response)
        toast.error("Something went wrong. Please try again.");
        return;
      }
  
      if (response.success && response.response?.data.user.userType === "user") {
        toast.success(response.message);
        console.log('success message: ', response.message)
        navigate("/products"); 
      }else if (response.success && response.response?.data.user.userType === "seller") {
        toast.success(response.message);
        console.log('success message: ', response.message)
        navigate("/seller"); 
      } else {
        toast.error(response.message);
        console.log('error message', response.message)
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  

  // const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <div>
        <Label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </Label>
        <div className="mt-2">
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
      </div>

      
      <div>
        <Label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </Label>
        <div className="mt-2">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            disabled={isLoading}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
      </div>

      
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="rememberMe" {...register("rememberMe")} />
        <Label htmlFor="rememberMe" className="text-sm text-gray-900">
          Remember me
        </Label>
      </div>

    
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
