import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RoutesIndex, RoutesSignIn, RoutesSignUp } from "@/helpers/routeName";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";

function SignIn() {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`,
          {
            method : "POST",
            headers :{
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(values),
            credentials : 'include'
          });
          const data = await response.json()
            if(!response.ok){
              return showToast('error', data.message)
            }
            navigate(RoutesIndex);
            showToast('success', data.message)
        } catch (error) {
          showToast('error', error.message)
        }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[400px] p-5 ">
        <CardTitle className="text-2xl font-bold text-center">
          Login into Account
        </CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-5 ">
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center">
                <p>Don't have Account ? </p>
                <Link to={RoutesSignUp} className="hover:underline">SignUp</Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default SignIn;
