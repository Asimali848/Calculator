import { useState } from "react";

import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
import {
  useLoginMutation,
  usePasswordResetRequestMutation,
  usePasswordResetVerifyMutation,
  useRegisterMutation,
  useVerfyEmailMutation,
} from "@/store/services/auth";

const Login = () => {
  const [authMode, setAuthMode] = useState<
    "login" | "register" | "verify-user" | "forgot" | "otp" | "reset"
  >("login");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLogin = authMode === "login";
  const isVerifyUser = authMode === "verify-user";
  const isRegister = authMode === "register";
  const isForgot = authMode === "forgot";
  const isOtp = authMode === "otp";
  const isReset = authMode === "reset";

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [verifyEmail, { isLoading: isVerifyEmailLoading }] =
    useVerfyEmailMutation();
  const [passwordResetRequest, { isLoading: isPasswordResetRequestLoading }] =
    usePasswordResetRequestMutation();
  const [passwordResetVerify, { isLoading: isPasswordResetVerifyLoading }] =
    usePasswordResetVerifyMutation();

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       if (isLogin) {
  //         if (!email || !password)
  //           return toast.error("Enter email and password", {
  //             className: "bg-destructive text-white p-3",
  //           });
  //         const loginResponse = await login({
  //           token: "",
  //           data: { email, password },
  //         }).unwrap();
  //         // Try to find the token in several common places
  //         let token =
  //           loginResponse?.access ||
  //           loginResponse?.data?.access ||
  //           loginResponse?.refresh ||
  //           loginResponse?.data?.refresh ||
  //           loginResponse?.data?.user?.username ||
  //           loginResponse?.data?.user?.email;

  //         if (token) {
  //           // Always store access token as 'authToken' and 'access' for compatibility
  //           localStorage.setItem("authToken", token);
  //           localStorage.setItem("access", token);
  //           localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
  //           localStorage.setItem("email", loginResponse.data.user.email);

  //           console.log("authToken:", token);
  //         } else {
  //           console.log("No token found in login response:", loginResponse);
  //         }
  //         toast.success("Login successful", {
  //           className: "bg-primary text-white p-3",
  //         });
  //         navigate("/home"); // Redirect to dashboard or home page
  //         return;
  //       }catch (error: any) {
  //     const errorMessage =
  //       error?.data?.message || error?.message || "Login failed. Please try again.";

  //     toast.error(errorMessage, {
  //       className: "bg-destructive text-white p-3",
  //     });

  //     console.error("Login error:", error);
  //   }
  // }
  //       if (isRegister) {
  //         if (!email || !username || !password)
  //           return toast.error("All fields required", {
  //             className: "bg-destructive text-white p-3",
  //           });
  //         await register({
  //           token: "",
  //           data: { email, username, password },
  //         }).unwrap();
  //         toast.success("Registration successful! Please verify your email.", {
  //           className: "bg-primary text-white p-3",
  //         });
  //         setAuthMode("verify-user");
  //         return;
  //       }
  //       if (isVerifyUser) {
  //         if (!email || !otp)
  //           return toast.error("Provide email and OTP", {
  //             className: "bg-destructive text-white p-3",
  //           });
  //         await verifyEmail({ token: "", data: { email, otp } }).unwrap();
  //         toast.success("OTP verified. Set your new password.", {
  //           className: "bg-primary text-white p-3",
  //         });
  //         setAuthMode("login");
  //         return;
  //       }
  //       if (isForgot) {
  //         if (!email)
  //           return toast.error("Email is required", {
  //             className: "bg-destructive text-white p-3",
  //           });
  //         await passwordResetRequest({ token: "", data: { email } }).unwrap();
  //         toast.success("Reset link sent to your email.", {
  //           className: "bg-primary text-white p-3",
  //         });
  //         setAuthMode("otp");
  //         return;
  //       }
  //       if (isOtp) {
  //         if (!email || !otp)
  //           return toast.error("Provide email and OTP", {
  //             className: "bg-destructive text-white p-3",
  //           });
  //         await verifyEmail({ token: "", data: { email, otp } }).unwrap();
  //         toast.success("OTP verified. Set your new password.", {
  //           className: "bg-primary text-white p-3",
  //         });
  //         setAuthMode("reset");
  //         return;
  //       }
  //       if (isReset) {
  //         if (!newPassword || !confirmPassword)
  //           return toast.error("All password fields required", {
  //             className: "bg-destructive text-white p-3",
  //           });
  //         if (newPassword !== confirmPassword)
  //           return toast.error("Passwords do not match", {
  //             className: "bg-destructive text-white p-3",
  //           });
  //         await passwordResetVerify({
  //           token: "",
  //           //@ts-ignore
  //           data: { email, code: otp, new_password: newPassword },
  //         }).unwrap();
  //         toast.success("Password reset successful. Please login.", {
  //           className: "bg-primary text-white p-3",
  //         });
  //         setAuthMode("login");
  //         return;
  //       }
  //     } catch (err: any) {
  //       console.error(err);
  //       const message =
  //         err?.data?.detail ||
  //         Object.values(err?.data || {})?.[0] ||
  //         "An error occurred. Please try again.";
  //       toast.error(
  //         typeof message === "string" ? message : "An unexpected error occurred."
  //       );
  //     }
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        if (!email || !password)
          return toast.error("Enter email and password", {
            className: "bg-destructive text-white p-3",
          });

        try {
          const loginResponse = await login({
            token: "",
            data: { email, password },
          }).unwrap();

          // Get token
          let token =
            loginResponse?.access ||
            loginResponse?.data?.access ||
            loginResponse?.refresh ||
            loginResponse?.data?.refresh;

          if (token) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("access", token);
            localStorage.setItem(
              "user",
              JSON.stringify(loginResponse.data?.user || {})
            );
            localStorage.setItem(
              "email",
              loginResponse.data?.user?.email || ""
            );

            console.log("authToken:", token);
          } else {
            console.log("No token found in login response:", loginResponse);
          }

          toast.success("Login successful", {
            className: "bg-primary text-white p-3",
          });

          navigate("/home");
          return;
        } catch (error: any) {
          const errorMessage =
            error?.data?.message ||
            error?.data?.detail ||
            error?.message ||
            "Login failed. Please try again.";

          toast.error(errorMessage, {
            className: "bg-destructive text-white p-3",
          });

          console.error("Login error:", error);
          return;
        }
      }

      // Continue with other auth modes...
      if (isRegister) {
        if (!email || !username || !password)
          return toast.error("All fields required", {
            className: "bg-destructive text-white p-3",
          });
        await register({
          token: "",
          data: { email, username, password },
        }).unwrap();
        toast.success("Registration successful! Please verify your email.", {
          className: "bg-primary text-white p-3",
        });
        setAuthMode("verify-user");
        return;
      }

      if (isVerifyUser) {
        if (!email || !otp)
          return toast.error("Provide email and OTP", {
            className: "bg-destructive text-white p-3",
          });
        await verifyEmail({ token: "", data: { email, otp } }).unwrap();
        toast.success("OTP verified. Set your new password.", {
          className: "bg-primary text-white p-3",
        });
        setAuthMode("login");
        return;
      }

      // if (isForgot) {
      //   if (!email)
      //     return toast.error("Email is required", {
      //       className: "bg-destructive text-white p-3",
      //     });
      //   await passwordResetRequest({ token: "", data: { email } }).unwrap();
      //   toast.success("Reset link sent to your email.", {
      //     className: "bg-primary text-white p-3",
      //   });
      //   setAuthMode("otp");
      //   return;
      // }

      // if (isOtp) {
      //   if (!email || !otp)
      //     return toast.error("Provide email and OTP", {
      //       className: "bg-destructive text-white p-3",
      //     });
      //   await verifyEmail({ token: "", data: { email, otp } }).unwrap();
      //   toast.success("OTP verified. Set your new password.", {
      //     className: "bg-primary text-white p-3",
      //   });
      //   setAuthMode("reset");
      //   return;
      // }

      // if (isReset) {
      //   if (!newPassword || !confirmPassword)
      //     return toast.error("All password fields required", {
      //       className: "bg-destructive text-white p-3",
      //     });
      //   if (newPassword !== confirmPassword)
      //     return toast.error("Passwords do not match", {
      //       className: "bg-destructive text-white p-3",
      //     });
      //   await passwordResetVerify({
      //     token: "",
      //     //@ts-ignore
      //     data: { email, code: otp, new_password: newPassword },
      //   }).unwrap();
      //   toast.success("Password reset successful. Please login.", {
      //     className: "bg-primary text-white p-3",
      //   });
      //   setAuthMode("login");
      //   return;
      // }
      if (isForgot) {
        if (!email)
          return toast.error("Email is required", {
            className: "bg-destructive text-white p-3",
          });

        // Use passwordResetRequest for forgot password
        await passwordResetRequest({ token: "", data: { email } }).unwrap();
        toast.success("OTP sent to your email.", {
          className: "bg-primary text-white p-3",
        });
        setAuthMode("otp");
        return;
      }

      if (isOtp) {
        if (!email || !otp)
          return toast.error("Provide email and OTP", {
            className: "bg-destructive text-white p-3",
          });

        // No API call needed here - just transition to reset screen
        setAuthMode("reset");
        return;
      }

      if (isReset) {
        if (!newPassword || !confirmPassword)
          return toast.error("All password fields required", {
            className: "bg-destructive text-white p-3",
          });

        if (newPassword !== confirmPassword)
          return toast.error("Passwords do not match", {
            className: "bg-destructive text-white p-3",
          });

        // Use passwordResetVerify with correct payload
        await passwordResetVerify({
          token: "",
          data: {
            email,
            otp,
            password: newPassword, // Correct field name
          },
        }).unwrap();

        toast.success("Password reset successful. Please login.", {
          className: "bg-primary text-white p-3",
        });
        setAuthMode("login");
        return;
      }
    } catch (err: any) {
      console.error("Unhandled error:", err);
      const message =
        err?.data?.message ||
        err?.data?.detail ||
        Object.values(err?.data || {})?.[0] ||
        err?.message ||
        "An unexpected error occurred.";

      toast.error(
        typeof message === "string" ? message : "Something went wrong.",
        {
          className: "bg-destructive text-white p-3",
        }
      );
    }
  };

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center md:w-1/2">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center justify-center p-10 md:w-1/2 md:p-0"
      >
        <img src={Logo} alt="logo" className="w-24 rounded-xl" />
        <div className="my-10 flex w-full flex-col items-center justify-center gap-2.5">
          <span className="w-full text-center text-[30px] font-bold leading-[30px]">
            {isLogin
              ? "Login"
              : isRegister
                ? "Register"
                : isForgot
                  ? "Forgot Password"
                  : isVerifyUser
                    ? "Verify User"
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

        {isRegister && (
          <div className="mb-5 w-full">
            <Label htmlFor="username">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
        )}

        {isVerifyUser && (
          <div className="mb-5 w-full">
            <Label htmlFor="otp">OTP Code</Label>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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

        {(isLogin || isRegister || isForgot) && (
          <div className="mb-5 w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
            />
          </div>
        )}

        {!isForgot && !isOtp && !isReset && !isVerifyUser && (
          <div className="mb-5 w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
        )}

        {isOtp && (
          <div className="mb-5 w-full">
            <Label htmlFor="otp">Password Reset OTP</Label>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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

        {isReset && (
          <>
            <div className="mb-5 w-full">
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="pr-10"
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-muted-foreground"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <div className="mb-5 w-full">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="pr-10"
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

        {isLogin && (
          <div className="w-full pb-4 text-right text-sm">
            <span
              className="cursor-pointer text-primary underline"
              onClick={() => setAuthMode("forgot")}
            >
              Forgot Password?
            </span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full gap-2"
          disabled={
            isLoginLoading ||
            isRegisterLoading ||
            isPasswordResetRequestLoading ||
            isVerifyEmailLoading ||
            isPasswordResetVerifyLoading
          }
        >
          {isForgot || isOtp ? <Mail /> : <LogIn />}
          {isLogin
            ? "Login"
            : isRegister
              ? "Register"
              : isVerifyUser
                ? "Verify User"
                : isForgot
                  ? "Send Reset Link"
                  : isOtp
                    ? "Verify OTP"
                    : "Reset Password"}
        </Button>

        <div className="mt-5 text-center text-sm text-muted-foreground">
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
