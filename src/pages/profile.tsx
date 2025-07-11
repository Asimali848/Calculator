import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building,
  Calendar,
  Camera,
  Edit,
  Globe,
  Landmark,
  LockKeyholeOpen,
  Mail,
  MapPin,
  Phone,
  Save,
  Star,
  X,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  website: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
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
  });

type UserProfileFormData = z.infer<typeof userProfileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "Judgment Calculator",
      email: "example@gmail.com",
      bio: "Experienced task creator focused on quality content and social media projects.",
      company: "Digital Marketing Agency",
      location: "New York, NY",
      phone: "+1 (555) 987-6543",
      website: "https://myagency.com",
      specialties: ["Content Creation", "Social Media", "Marketing"],
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

  const handleSubmit = (data: UserProfileFormData) => {
    console.log("Profile updated:", data);
    toast.success("Profile updated successfully", {
      className: "bg-primary text-white p-3",
    });
    setIsEditing(false);
  };

  const handlePasswordSubmit = (data: PasswordFormData) => {
    console.log("Password change requested:", {
      currentPassword: data.currentPassword,
    });
    toast.success("Password changed successfully", {
      className: "bg-primary text-white p-3",
    });
    passwordForm.reset();
    setIsPasswordDialogOpen(false);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-10">
      <div className="max-w-8xl mx-auto space-y-6">
        <div className="mx-auto w-full space-y-6">
          <div className="flex items-center justify-end">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
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
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={form.handleSubmit(handleSubmit)}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
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
                            {image ? (
                              <AvatarImage src={image} />
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
                            {form.watch("name")}
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

                  {/* Account Details card remains unchanged — you can copy from original */}
                  {/* ... Account Details Dialog for Password Change ... */}
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
                            Starter
                          </Badge>
                        </div>
                        <Button
                          onClick={() => {
                            navigate("/billing");
                          }}
                          type="button"
                          variant="default"
                          className=""
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
                          <span className="text-sm">1/15/2024</span>
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
                                  <FormField
                                    control={passwordForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="input"
                                            placeholder="Enter current password"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={passwordForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="input"
                                            placeholder="Enter new password"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={passwordForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Confirm New Password
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="input"
                                            placeholder="Confirm new password"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <div className="flex justify-end space-x-2 pt-4">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => {
                                        passwordForm.reset();
                                        setIsPasswordDialogOpen(false);
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button type="submit">
                                      Change Password
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

                {/* Personal Information Form (unchanged) */}
                <div className="space-y-6 lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold">
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-10 py-8">
                      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={!isEditing}
                                  className={cn(!isEditing && "bg-muted")}
                                />
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
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  disabled={!isEditing}
                                  className={cn(!isEditing && "bg-muted")}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    disabled={!isEditing}
                                    className={cn(
                                      !isEditing && "bg-muted",
                                      "pl-10"
                                    )}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    disabled={!isEditing}
                                    className={cn(
                                      !isEditing && "bg-muted",
                                      "pl-10"
                                    )}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    disabled={!isEditing}
                                    className={cn(
                                      !isEditing && "bg-muted",
                                      "pl-10"
                                    )}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    disabled={!isEditing}
                                    className={cn(
                                      !isEditing && "bg-muted",
                                      "pl-10"
                                    )}
                                    placeholder="https://example.com"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bio"
                          //@ts-ignore
                          render={({ field }) => (
                            <FormItem className="col-span-2 pt-4">
                              <FormLabel></FormLabel>
                              <FormControl className="flex min-h-[90px] flex-col gap-4">
                                <div className=""></div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
