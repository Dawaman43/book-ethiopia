import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-sm"
      >
        <TabsList className="flex justify-center w-full mb-4">
          <TabsTrigger value="login" className="w-1/2 text-center">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="w-1/2 text-center">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="register">
          <Register onRegisterSuccess={() => setActiveTab("login")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPage;
