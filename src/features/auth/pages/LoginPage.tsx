import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>

        <Input type="email" placeholder="Email" />
        <Input placeholder="Password" type="password" />

        <Button className="w-full">Login</Button>
      </Card>
    </div>
  );
};

export default LoginPage;
