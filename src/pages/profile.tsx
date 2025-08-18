import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Camera,
  Edit,
  Landmark,
  Loader2,
  LockKeyholeOpen,
  Mail,
  Save,
  Star,
  X,
} from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateUserMutation,
} from "@/store/services/auth";

const userProfileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  image: z.string(),
  email: z.string().optional(),
  company: z.string().optional(),
  street_address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  phone_number: z.string().optional(),
  website: z.string().url("Please enter a valid website URL").optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type UserProfileFormData = z.infer<typeof userProfileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const parseLocation = (location: string) => {
  const parts = location.split(",").map((part) => part.trim());
  const n = parts.length;

  let street_address = "";
  let city = "";
  let state = "";
  let zip_code = "";

  if (n >= 4) {
    street_address = parts.slice(0, n - 3).join(", ");
    city = parts[n - 3] || "";

    const stateZip = parts[n - 1] || "";
    const stateZipParts = stateZip.split(" ");
    zip_code = stateZipParts.pop() || "";
    state = stateZipParts.join(" ") || parts[n - 2] || "";
  } else if (n === 3) {
    street_address = parts[0] || "";
    city = parts[1] || "";

    const stateZip = parts[2] || "";
    const stateZipParts = stateZip.split(" ");
    zip_code = stateZipParts.pop() || "";
    state = stateZipParts.join(" ");
  } else if (n === 2) {
    city = parts[0] || "";

    const stateZip = parts[1] || "";
    const stateZipParts = stateZip.split(" ");
    zip_code = stateZipParts.pop() || "";
    state = stateZipParts.join(" ");
  } else if (n === 1) {
    const singlePart = parts[0] || "";
    const singleParts = singlePart.split(" ");

    zip_code = singleParts.pop() || "";
    state = singleParts.pop() || "";

    city = singleParts.join(" ");
  }

  return { street_address, city, state, zip_code };
};

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const token = localStorage.getItem("access");
  const { data: profileData } = useGetProfileQuery({
    token: token || "",
  });

  const [updateUser] = useUpdateUserMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      image: "",
      company: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
      website: "",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (data: UserProfileFormData) => {
    try {
      if (!token || !profileData?.profile) {
        toast.error("Authentication required", {
          className: "bg-red-500 text-white p-3",
        });
        return;
      }

      setIsUpdatingProfile(true);

      // Combine address components for backend
      const location =
        `${data.street_address}, ${data.city}, ${data.state} ${data.zip_code}`.trim();

      const payload = {
        full_name: `${data.first_name} ${data.last_name}`,
        email: data.email || "",
        image: image || undefined,
        company: data.company ?? "",
        location,
        phone_number: data.phone_number ?? "",
        website: data.website ?? "",
        subscription_plan: profileData.profile.subscription_plan,
        member_since: profileData.profile.member_since,
      };

      await updateUser({
        token,
        body: payload,
      }).unwrap();

      toast.success("Profile updated successfully", {
        className: "bg-primary text-white p-3",
      });

      setIsEditing(false);
      setIsUpdatingProfile(false);
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.data?.message || "Failed to update profile", {
        className: "bg-red-500 text-white p-3",
      });
    }
  };

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    try {
      if (!token) {
        toast.error("Authentication required", {
          className: "bg-red-500 text-white p-3",
        });
        return;
      }

      await changePassword({
        token,
        body: {
          current_password: data.currentPassword,
          new_password: data.newPassword,
        },
      }).unwrap();

      toast.success("Password changed successfully", {
        className: "bg-primary text-white p-3",
      });
      passwordForm.reset();
      setIsPasswordDialogOpen(false);
    } catch (error: any) {
      console.error("Password change error:", error);
      toast.error(
        error.data?.detail ||
          error.data?.message ||
          "Failed to change password. Please try again.",
        { className: "bg-red-500 text-white p-3" }
      );
    }
  };

  const handleCancel = () => {
    if (profileData?.profile) {
      // Split full name back into first/last
      const [first_name, ...last_nameParts] =
        profileData.profile.full_name.split(" ");
      const last_name = last_nameParts.join(" ");

      // Parse location
      const location = profileData.profile.location || "";
      const { street_address, city, state, zip_code } = parseLocation(location);

      form.reset({
        first_name,
        last_name,
        email: profileData.profile.email ?? "",
        image: profileData.profile.image ?? "",
        company: profileData.profile.company ?? "",
        street_address,
        city,
        state,
        zip_code,
        phone_number: profileData.profile.phone_number ?? "",
        website: profileData.profile.website ?? "",
      });

      setImage(null);
      setPreview(null);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (profileData?.profile) {
      const [first_name, ...last_nameParts] =
        profileData.profile.full_name.split(" ");
      const last_name = last_nameParts.join(" ");

      const location = profileData.profile.location || "";
      const { street_address, city, state, zip_code } = parseLocation(location);

      form.reset({
        first_name,
        last_name,
        email: profileData.profile.email ?? "",
        image: profileData.profile.image ?? "",
        company: profileData.profile.company ?? "",
        street_address,
        city,
        state,
        zip_code,
        phone_number: profileData.profile.phone_number ?? "",
        website: profileData.profile.website ?? "",
      });
    }
  }, [profileData, form]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-10">
      <div className="max-w-8xl mx-auto space-y-6">
        <div className="mx-auto w-full space-y-6">
          <div className="flex items-center justify-end">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
                type="button"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex items-center gap-2"
                  type="button"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid h-[calc(100dvh-80px)] grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-1">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center space-y-3 text-center">
                        <div className="relative">
                          <Avatar className="h-24 w-24">
                            {preview ? (
                              <AvatarImage
                                src={preview}
                                alt="Profile"
                                className="object-cover"
                              />
                            ) : profileData?.profile?.image ? (
                              <AvatarImage
                                src={profileData.profile.image}
                                alt="Profile"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                <Landmark className="h-10 w-10 text-muted-foreground" />
                              </div>
                            )}
                          </Avatar>

                          {isEditing && (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                id="profile-pic-upload"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                              <label
                                htmlFor="profile-pic-upload"
                                className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-primary p-1 text-white shadow-md"
                                title="Change profile picture"
                              >
                                <Camera className="h-4 w-4" />
                              </label>
                            </>
                          )}
                        </div>

                        <div className="space-y-2">
                          <h1 className="text-2xl font-bold text-foreground">
                            {form.watch("first_name")} {form.watch("last_name")}
                          </h1>
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">
                              {form.watch("email")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="">
                        <div className="flex items-center justify-between">
                          <h4 className="mb-2 font-medium text-foreground">
                            Subscription Plan
                          </h4>
                          <Badge
                            variant="outline"
                            className="border-blue-200 text-blue-600"
                          >
                            <Star className="mr-1 h-3 w-3" />
                            {profileData?.profile.subscription_plan}
                          </Badge>
                        </div>
                        <Button
                          onClick={() => navigate("/billing")}
                          type="button"
                          variant="default"
                        >
                          Upgrade the Plan
                        </Button>
                      </div>

                      <div>
                        <h4 className="mb-2 font-medium text-foreground">
                          Member Since
                        </h4>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            {profileData?.profile.member_since}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 font-medium text-foreground">
                          Security
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Password protected
                          </span>
                          <Dialog
                            open={isPasswordDialogOpen}
                            onOpenChange={setIsPasswordDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-primary hover:text-white"
                                type="button"
                              >
                                <LockKeyholeOpen className="mr-2 h-4 w-4" />
                                Change Password
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Change Password</DialogTitle>
                                <DialogDescription>
                                  Enter your current password and choose a new
                                  one.
                                </DialogDescription>
                              </DialogHeader>
                              <Form {...passwordForm}>
                                <form
                                  onSubmit={passwordForm.handleSubmit(
                                    handlePasswordSubmit
                                  )}
                                  className="space-y-4"
                                >
                                  {/* Current Password */}
                                  <FormField
                                    control={passwordForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                          <div className="relative">
                                            <Input
                                              {...field}
                                              type={
                                                showCurrent
                                                  ? "text"
                                                  : "password"
                                              }
                                              placeholder="Enter current password"
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setShowCurrent(!showCurrent)
                                              }
                                              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                            >
                                              {showCurrent ? (
                                                <EyeOff className="ml-2 h-4 w-4 bg-white" />
                                              ) : (
                                                <Eye className="ml-2 h-4 w-4 bg-white" />
                                              )}
                                            </button>
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {/* New Password */}
                                  <FormField
                                    control={passwordForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                          <div className="relative">
                                            <Input
                                              {...field}
                                              type={
                                                showNew ? "text" : "password"
                                              }
                                              placeholder="Enter new password"
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setShowNew(!showNew)
                                              }
                                              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                            >
                                              {showNew ? (
                                                <EyeOff className="ml-2 h-4 w-4 bg-white" />
                                              ) : (
                                                <Eye className="ml-2 h-4 w-4 bg-white" />
                                              )}
                                            </button>
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {/* Confirm Password */}
                                  <FormField
                                    control={passwordForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Confirm New Password
                                        </FormLabel>
                                        <FormControl>
                                          <div className="relative">
                                            <Input
                                              {...field}
                                              type={
                                                showConfirm
                                                  ? "text"
                                                  : "password"
                                              }
                                              placeholder="Confirm new password"
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setShowConfirm(!showConfirm)
                                              }
                                              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                            >
                                              {showConfirm ? (
                                                <EyeOff className="ml-2 h-4 w-4 bg-white" />
                                              ) : (
                                                <Eye className="ml-2 h-4 w-4 bg-white" />
                                              )}
                                            </button>
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {/* Actions */}
                                  <div className="flex justify-end space-x-2 pt-4">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => {
                                        passwordForm.reset();
                                        setIsPasswordDialogOpen(false);
                                      }}
                                      disabled={isChangingPassword}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      type="submit"
                                      disabled={isChangingPassword}
                                    >
                                      {isChangingPassword
                                        ? "Changing..."
                                        : "Change Password"}
                                    </Button>
                                  </div>
                                </form>
                              </Form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6 lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold">
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* First Name */}
                        <FormField
                          control={form.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter first name"
                                  {...field}
                                  disabled={!isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Last Name */}
                        <FormField
                          control={form.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter last name"
                                  {...field}
                                  disabled={!isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Company */}
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Firm Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter firm name"
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Street Address */}
                      <FormField
                        control={form.control}
                        name="street_address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter street address"
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* City */}
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter city"
                                  {...field}
                                  disabled={!isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* State */}
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter state"
                                  {...field}
                                  disabled={!isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Zip Code */}
                        <FormField
                          control={form.control}
                          name="zip_code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter zip code"
                                  {...field}
                                  disabled={!isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Phone Number */}
                      <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter phone number"
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Website */}
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://www.example.com  ||   http://example.com"
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {isEditing && (
                        <div className="flex justify-end pt-6">
                          <Button
                            type="submit"
                            className="flex items-center gap-2"
                            disabled={isUpdatingProfile}
                          >
                            {isUpdatingProfile ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
