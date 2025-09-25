import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AuthPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="login" className="w-full">
        <TabsList>
          <TabsTrigger value="login" className="w-1/2">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="w-1/2">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <div>Login form goes here</div>
        </TabsContent>
        <TabsContent value="register">
          <div>Register form goes here</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPage;
