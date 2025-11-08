"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Calendar,
  ArrowRight,
  Loader2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const formSchema = z.object({
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, { message: "Last name is required" }),
  gender: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z.string().min(11, { message: "Phone number must be at least 11 digits" }).regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  date_of_birth: z.string().optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type UserRegistrationData = z.infer<typeof formSchema>;

export default function UserRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const form = useForm<UserRegistrationData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "",
      email: "",
      phone_number: "",
      date_of_birth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchAllFields = form.watch();
  const isFormFilled = Object.values(watchAllFields).some(value => value && value.toString().length > 0);

  async function onSubmit(values: UserRegistrationData) {
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        console.log("Registration successful:", values);
        // Handle success - redirect or show success message
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "w-full max-w-2xl mx-auto rounded-2xl overflow-hidden transition-all duration-500 transform",
          animateIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        <div className="bg-gradient-to-br from-primary/80 to-primary p-6 text-white">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="mt-1 text-sm text-primary-foreground/80">
            Join us today and get started
          </p>
        </div>

        <div className="bg-card p-6 shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <div
                          className={cn(
                            "group relative border rounded-xl transition-all duration-300",
                            focused === "first_name"
                              ? "border-primary shadow-sm ring-1 ring-primary/20"
                              : "border-border",
                            form.formState.errors.first_name ? "border-destructive" : ""
                          )}
                        >
                          <FormControl>
                            <Input
                              placeholder="Juan"
                              className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                              onFocus={() => setFocused("first_name")}
                              {...field}
                              onBlur={(e) => {
                                field.onBlur();
                                setFocused(null);
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 px-1 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Middle Name */}
                  <FormField
                    control={form.control}
                    name="middle_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <div
                          className={cn(
                            "group relative border rounded-xl transition-all duration-300",
                            focused === "middle_name"
                              ? "border-primary shadow-sm ring-1 ring-primary/20"
                              : "border-border"
                          )}
                        >
                          <FormControl>
                            <Input
                              placeholder="Santos"
                              className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                              onFocus={() => setFocused("middle_name")}
                              {...field}
                              onBlur={(e) => {
                                field.onBlur();
                                setFocused(null);
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 px-1 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Last Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <div
                          className={cn(
                            "group relative border rounded-xl transition-all duration-300",
                            focused === "last_name"
                              ? "border-primary shadow-sm ring-1 ring-primary/20"
                              : "border-border",
                            form.formState.errors.last_name ? "border-destructive" : ""
                          )}
                        >
                          <FormControl>
                            <Input
                              placeholder="Dela Cruz"
                              className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                              onFocus={() => setFocused("last_name")}
                              {...field}
                              onBlur={(e) => {
                                field.onBlur();
                                setFocused(null);
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 px-1 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <div
                          className={cn(
                            "group relative border rounded-xl transition-all duration-300",
                            focused === "gender"
                              ? "border-primary shadow-sm ring-1 ring-primary/20"
                              : "border-border"
                          )}
                        >
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger 
                                className="h-12 border-0 bg-transparent focus:ring-0 focus:ring-offset-0"
                                onFocus={() => setFocused("gender")}
                                onBlur={() => setFocused(null)}
                              >
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 px-1 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Date of Birth */}
                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Date of Birth
                        </FormLabel>
                        <div
                          className={cn(
                            "group relative border rounded-xl transition-all duration-300",
                            focused === "date_of_birth"
                              ? "border-primary shadow-sm ring-1 ring-primary/20"
                              : "border-border"
                          )}
                        >
                          <FormControl>
                            <Input
                              type="date"
                              className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                              onFocus={() => setFocused("date_of_birth")}
                              {...field}
                              onBlur={(e) => {
                                field.onBlur();
                                setFocused(null);
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 px-1 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address (use your email)<span className="text-destructive">*</span>
                        </FormLabel>
                        <div
                          className={cn(
                            "group relative border rounded-xl transition-all duration-300",
                            focused === "email"
                              ? "border-primary shadow-sm ring-1 ring-primary/20"
                              : "border-border",
                            form.formState.errors.email ? "border-destructive" : ""
                          )}
                        >
                          <FormControl>
                            <Input
                              placeholder="juan.delacruz@email.com"
                              type="email"
                              className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                              onFocus={() => setFocused("email")}
                              {...field}
                              onBlur={(e) => {
                                field.onBlur();
                                setFocused(null);
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 px-1 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone Number */}
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number <span className="text-destructive">*</span>
                        </FormLabel>
                        <div
                          className={cn(
                            "group relative border rounded-xl transition-all duration-300",
                            focused === "phone_number"
                              ? "border-primary shadow-sm ring-1 ring-primary/20"
                              : "border-border",
                            form.formState.errors.phone_number ? "border-destructive" : ""
                          )}
                        >
                          <FormControl>
                            <Input
                              placeholder="09123456789"
                              maxLength={11}
                              className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                              onFocus={() => setFocused("phone_number")}
                              {...field}
                              onBlur={(e) => {
                                field.onBlur();
                                setFocused(null);
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 px-1 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Password Section */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Account Security
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Password <span className="text-destructive">*</span>
                        </FormLabel>
                        <div
                          className={cn(
                            "group relative border rounded-xl transition-all duration-300",
                            focused === "password"
                              ? "border-primary shadow-sm ring-1 ring-primary/20"
                              : "border-border",
                            form.formState.errors.password ? "border-destructive" : ""
                          )}
                        >
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                                onFocus={() => setFocused("password")}
                                {...field}
                                onBlur={(e) => {
                                  field.onBlur();
                                  setFocused(null);
                                }}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 px-1 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Confirm Password <span className="text-destructive">*</span>
                        </FormLabel>
                        <div
                          className={cn(
                            "group relative border rounded-xl transition-all duration-300",
                            focused === "confirmPassword"
                              ? "border-primary shadow-sm ring-1 ring-primary/20"
                              : "border-border",
                            form.formState.errors.confirmPassword ? "border-destructive" : ""
                          )}
                        >
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                                onFocus={() => setFocused("confirmPassword")}
                                {...field}
                                onBlur={(e) => {
                                  field.onBlur();
                                  setFocused(null);
                                }}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage className="mt-1 px-1 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className={cn(
                  "w-full h-12 mt-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-2",
                  isFormFilled && !isLoading
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-primary/80"
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isFormFilled ? "translate-x-1" : ""
                      )}
                    />
                  </>
                )}
              </Button>

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:text-primary/80 font-semibold">
                  Sign in here
                </a>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}