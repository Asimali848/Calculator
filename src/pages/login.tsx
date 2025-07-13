import { useState } from "react";

import { Eye, EyeOff, LogIn, Mail } from "lucide-react";

import Logo from "@/assets/img/logo.jpeg";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [authMode, setAuthMode] = useState<
    "login" | "register" | "forgot" | "otp" | "reset"
  >("login");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLogin = authMode === "login";
  const isRegister = authMode === "register";
  const isForgot = authMode === "forgot";
  const isOtp = authMode === "otp";
  const isReset = authMode === "reset";

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center md:w-1/2">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <form className="flex w-full flex-col items-center justify-center p-10 md:w-1/2 md:p-0">
        <img src={Logo} alt="logo" className="w-24 rounded-xl" />
        <div className="my-10 flex w-full flex-col items-center justify-center gap-2.5">
          <span className="w-full text-center text-[30px] font-bold leading-[30px]">
            {isLogin
              ? "Login"
              : isRegister
                ? "Register"
                : isForgot
                  ? "Forgot Password"
                  : isOtp
                    ? "Verify OTP"
                    : "Reset Password"}
          </span>
          <span className="w-full text-center text-[12px] leading-[12px] text-muted-foreground">
            {isForgot
              ? "Enter your email to receive reset instructions."
              : isOtp
                ? "We’ve sent a code to your email."
                : isReset
                  ? "Set your new password below."
                  : "Enter your details below to proceed."}
          </span>
        </div>

        {/* Email Field */}
        {(isLogin || isRegister || isForgot) && (
          <div className="mb-5 flex w-full flex-col items-center justify-center gap-2">
            <Label htmlFor="email" className="w-full text-left">
              Email
            </Label>
            <Input
              type="email"
              className="w-full"
              placeholder="johndoe@example.com"
            />
          </div>
        )}

        {/* Password Field */}
        {!isForgot && !isOtp && !isReset && (
          <div className="mb-5 flex w-full flex-col items-center justify-center gap-2">
            <Label htmlFor="password" className="w-full text-left">
              Password
            </Label>
            <Input
              type="password"
              className="w-full"
              placeholder="Enter your password"
            />
          </div>
        )}

        {/* OTP Field */}
        {isOtp && (
          <div className="mb-5 flex w-full flex-col items-center justify-center gap-2">
            <Label htmlFor="otp" className="w-full text-left">
              OTP Code
            </Label>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        )}

        {/* New Password Fields */}
        {isReset && (
          <>
            <div className="mb-5 flex w-full flex-col items-center justify-center gap-2">
              <Label htmlFor="newPassword" className="w-full text-left">
                New Password
              </Label>
              <div className="relative w-full">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full pr-10"
                  placeholder="Enter new password"
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-muted-foreground"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <div className="mb-5 flex w-full flex-col items-center justify-center gap-2">
              <Label htmlFor="confirmPassword" className="w-full text-left">
                Confirm Password
              </Label>
              <div className="relative w-full">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pr-10"
                  placeholder="Re-enter new password"
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-muted-foreground"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Forgot Link */}
        {isLogin && (
          <div className="w-full pb-4 text-right text-sm">
            <span
              className="mb-2 cursor-pointer text-primary underline"
              onClick={() => setAuthMode("forgot")}
            >
              Forgot Password?
            </span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          className="w-full gap-2"
          variant="default"
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            if (isForgot) setAuthMode("otp");
            else if (isOtp) setAuthMode("reset");
            else if (isReset) setAuthMode("login");
          }}
        >
          {isForgot || isOtp ? <Mail /> : <LogIn />}
          {isLogin
            ? "Login"
            : isRegister
              ? "Register"
              : isForgot
                ? "Send Reset Link"
                : isOtp
                  ? "Verify OTP"
                  : "Reset Password"}
        </Button>

        {/* Switch Auth Mode */}
        <div className="mt-5 flex w-full flex-col items-center text-center text-[16px] leading-[12px] text-muted-foreground">
          {isLogin && (
            <span>
              Don’t have an account?{" "}
              <span
                className="cursor-pointer text-primary underline"
                onClick={() => setAuthMode("register")}
              >
                Register
              </span>
            </span>
          )}

          {isRegister && (
            <span>
              Already have an account?{" "}
              <span
                className="cursor-pointer text-primary underline"
                onClick={() => setAuthMode("login")}
              >
                Login
              </span>
            </span>
          )}

          {(isForgot || isOtp || isReset) && (
            <span>
              Back to{" "}
              <span
                className="cursor-pointer text-primary underline"
                onClick={() => setAuthMode("login")}
              >
                Login
              </span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
