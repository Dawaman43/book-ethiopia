import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LogIn, UserPlus, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [alert, setAlert] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    // Sync with global theme
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme as "light" | "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleRegisterSuccess = () => {
    setActiveTab("login");
    setAlert({
      type: "success",
      message: "Registration successful! Please log in.",
    });
    setTimeout(() => setAlert({ type: null, message: "" }), 5000);
  };

  const handleAuthError = (message: string) => {
    setAlert({ type: "error", message });
    setTimeout(() => setAlert({ type: null, message: "" }), 5000);
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center p-4 transition-colors duration-300",
        theme === "light"
          ? "bg-gradient-to-b from-green-50 to-teal-100"
          : "bg-gradient-to-b from-gray-900 to-gray-700 dark:bg-gray-900"
      )}
    >
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={cn(
            "rounded-full w-10 h-10",
            theme === "light"
              ? "hover:bg-green-100 text-emerald-900"
              : "hover:bg-gray-800 text-gray-100 dark:hover:bg-gray-700 dark:text-gray-100"
          )}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card
          className={cn(
            "shadow-xl",
            theme === "light"
              ? "bg-white border-emerald-200"
              : "bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
          )}
        >
          <CardHeader className="text-center">
            <CardTitle
              className={cn(
                "text-3xl font-bold",
                theme === "light"
                  ? "text-emerald-900"
                  : "text-gray-100 dark:text-gray-100"
              )}
            >
              Welcome to Book Ethiopia
            </CardTitle>
            <CardDescription
              className={cn(
                theme === "light"
                  ? "text-gray-600"
                  : "text-gray-300 dark:text-gray-300"
              )}
            >
              Sign in or create an account to start booking your stay
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Alert for Success/Error Messages */}
            <AnimatePresence>
              {alert.type && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    variant={alert.type === "error" ? "destructive" : "default"}
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 dark:border-gray-600"
                    )}
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>
                      {alert.type === "error" ? "Error" : "Success"}
                    </AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <TabsList
                className={cn(
                  "grid grid-cols-2 w-full",
                  theme === "light"
                    ? "bg-emerald-100"
                    : "bg-gray-700 dark:bg-gray-700"
                )}
              >
                <TabsTrigger
                  value="login"
                  className={cn(
                    "flex items-center gap-2",
                    theme === "light"
                      ? "data-[state=active]:bg-white data-[state=active]:text-emerald-900"
                      : "data-[state=active]:bg-gray-800 data-[state=active]:text-gray-100 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-gray-100"
                  )}
                >
                  <LogIn className="h-4 w-4" /> Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className={cn(
                    "flex items-center gap-2",
                    theme === "light"
                      ? "data-[state=active]:bg-white data-[state=active]:text-emerald-900"
                      : "data-[state=active]:bg-gray-800 data-[state=active]:text-gray-100 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-gray-100"
                  )}
                >
                  <UserPlus className="h-4 w-4" /> Register
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Login onError={handleAuthError} />
                </motion.div>
              </TabsContent>
              <TabsContent value="register">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Register
                    onRegisterSuccess={handleRegisterSuccess}
                    onError={handleAuthError}
                  />
                </motion.div>
              </TabsContent>
            </Tabs>

            <Separator
              className={cn(
                "my-6",
                theme === "light"
                  ? "bg-emerald-300"
                  : "bg-gray-600 dark:bg-gray-600"
              )}
            />

            {/* Social Login Buttons */}
            <div className="space-y-4">
              <Button
                variant="outline"
                className={cn(
                  "w-full flex items-center gap-2",
                  theme === "light"
                    ? "border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                    : "border-gray-600 text-gray-100 hover:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                )}
                onClick={() => (window.location.href = "/auth/google")}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.854L12.545,10.239z" />
                </svg>
                Sign in with Google
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "w-full flex items-center gap-2",
                  theme === "light"
                    ? "border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                    : "border-gray-600 text-gray-100 hover:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                )}
                onClick={() => (window.location.href = "/auth/facebook")}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.326v21.348C0 23.407 0.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463 0.099 2.795 0.143v3.24l-1.918 0.001c-1.504 0-1.795 0.715-1.795 1.763v2.313h3.587l-0.467 3.622h-3.12V24h6.116c0.733 0 1.325-0.593 1.325-1.326V1.326C24 0.593 23.407 0 22.675 0z" />
                </svg>
                Sign in with Facebook
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default AuthPage;
