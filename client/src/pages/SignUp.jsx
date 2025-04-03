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
import { Link } from "react-router-dom";
import { RoutesSignIn } from "@/helpers/routeName";
import { getEnv } from "@/helpers/getEnv";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "@/components/GoogleLogin";
function SignUp() {
  const navigate = useNavigate();
  const formSchema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters long."),
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"],
          message: "Passwords do not match",
          code: z.ZodIssueCode.custom,
        });
      }
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
        const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`,
      {
        method : "POST",
        headers :{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(values)
      });
      const data = await response.json()
        if(!response.ok){
          return showToast('error', data.message)
        } 
        navigate(RoutesSignIn);
        showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[400px] p-5">
        <CardTitle className="text-2xl font-bold text-center">
          Create Your Account
        </CardTitle>
        <div className="">
          <GoogleLogin/>
          <div className="border my-5 flex justify-center items-center">
            <span className="absolute bg-white text-sm">Or</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>

            <div className="mt-5 text-sm flex justify-center">
              <p>Already have an Account?</p>
              <Link to={RoutesSignIn} className="ml-1 text-blue-600 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default SignUp;
