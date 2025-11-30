import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/Card";
import { useToast } from "../components/ui/ToastProvider";

const Signup = () => {
  const { signupStart, signupVerify } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [step, setStep] = useState("form"); // 'form' | 'otp'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    campus: "",
  });

  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Timer for resend OTP
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    let timer;
    if (step === "otp" && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, secondsLeft]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Step 1: request OTP
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signupStart(formData);
      // res: { message, email, expiresIn }
      setEmailForOtp(res.email || formData.email);
      setStep("otp");
      setSecondsLeft((res.expiresIn || 10) * 60); // in seconds

      addToast({
        title: "OTP Sent",
        description: "We’ve sent a verification code to your college email.",
        variant: "success",
      });
    } catch (err) {
      addToast({
        title: "Signup Failed",
        description: err.message || "Could not send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      addToast({
        title: "Invalid OTP",
        description: "Please enter the code sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await signupVerify(emailForOtp || formData.email, otp);
      addToast({
        title: "Account Created",
        description: "Your email is verified. Welcome to CampKart!",
        variant: "success",
      });
      navigate("/marketplace"); // or '/dashboard' if you have it
    } catch (err) {
      addToast({
        title: "Verification Failed",
        description: err.message || "Could not verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (secondsLeft > 0) return;
    setLoading(true);
    try {
      const res = await signupStart(formData);
      setEmailForOtp(res.email || formData.email);
      setSecondsLeft((res.expiresIn || 10) * 60);
      addToast({
        title: "OTP Resent",
        description: "We’ve sent a new code to your email.",
        variant: "success",
      });
    } catch (err) {
      addToast({
        title: "Resend Failed",
        description: err.message || "Could not resend OTP.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isOtpStep = step === "otp";

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isOtpStep ? "Verify Your Email" : "Create an Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isOtpStep
              ? "Enter the verification code sent to your college email to complete signup."
              : "Join the campus marketplace community"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!isOtpStep ? (
            // STEP 1: SIGNUP FORM
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none"
                >
                  College Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@college.ac.in"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use your .ac.in or .edu email for student verification.
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="campus"
                  className="text-sm font-medium leading-none"
                >
                  Campus / College
                </label>
                <Input
                  id="campus"
                  name="campus"
                  placeholder="KLE Technological University"
                  value={formData.campus}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium leading-none"
                >
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Requesting OTP..." : "Sign Up & Get OTP"}
              </Button>
            </form>
          ) : (
            // STEP 2: OTP FORM
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  We&apos;ve sent a 6-digit verification code to{" "}
                  <span className="font-medium text-foreground">
                    {emailForOtp || formData.email}
                  </span>
                </p>
                <p>Please enter it below to verify your account.</p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="text-sm font-medium leading-none"
                >
                  Verification Code
                </label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {secondsLeft > 0
                    ? `You can resend OTP in ${formatTime(secondsLeft)}`
                    : "Didn’t receive the code?"}
                </span>
                <button
                  type="button"
                  disabled={secondsLeft > 0 || loading}
                  onClick={handleResendOtp}
                  className={`font-medium ${
                    secondsLeft > 0 || loading
                      ? "opacity-50 cursor-not-allowed"
                      : "text-primary hover:underline"
                  }`}
                >
                  Resend OTP
                </button>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Create Account"}
              </Button>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="w-full text-xs text-muted-foreground mt-2 hover:underline"
              >
                Go back and edit details
              </button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
