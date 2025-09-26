import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "@/utils/auth";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      // Assuming the response includes a token
      localStorage.setItem("token", response.token);
      toast.success("Login successful!");
      form.reset();
      navigate("/home"); // Redirect to home page
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("Login failed. Please try again later.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <Card
        className={cn(
          "w-full max-w-md shadow-lg animate-fade-in border-border bg-background/95"
        )}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          className="w-full bg-muted text-foreground border-input"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="w-full pr-10 bg-muted text-foreground border-input"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground hover:text-muted-foreground"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {showPassword
                                  ? "Hide password"
                                  : "Show password"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between text-sm">
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary p-0"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </Button>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary p-0"
                  onClick={() => navigate("/auth")}
                >
                  Don't have an account? Sign Up
                </Button>
              </div>

              <Button
                type="submit"
                className={cn(
                  "w-full transition-transform duration-200 hover:scale-105",
                  "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
