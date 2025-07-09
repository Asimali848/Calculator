import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building,
  Calendar,
  Edit,
  Globe,
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
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
  // const [newSpecialty, setNewSpecialty] = useState("");
  // const [availableSpecialties] = useState([
  //   "Content Creation",
  //   "Social Media",
  //   "Marketing",
  //   "SEO",
  //   "Analytics",
  //   "Strategy",
  //   "Design",
  //   "Copywriting",
  // ]);

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
  // const watchedSpecialties = form.watch("specialties") || [];

  // const handleSpecialtyToggle = (specialty: string) => {
  //   const currentSpecialties = watchedSpecialties;
  //   const updatedSpecialties = currentSpecialties.includes(specialty)
  //     ? currentSpecialties.filter((s) => s !== specialty)
  //     : [...currentSpecialties, specialty];

  //   form.setValue("specialties", updatedSpecialties);
  // };

  // const handleAddSpecialty = () => {
  //   if (
  //     newSpecialty.trim() &&
  //     !watchedSpecialties.includes(newSpecialty.trim())
  //   ) {
  //     const updatedSpecialties = [...watchedSpecialties, newSpecialty.trim()];
  //     form.setValue("specialties", updatedSpecialties);
  //     setNewSpecialty("");
  //     toast.success("Specialty added successfully", {
  //       className: "bg-primary text-white p-3",
  //     });
  //   }
  // };

  // const handleRemoveSpecialty = (specialty: string) => {
  //   const updatedSpecialties = watchedSpecialties.filter(
  //     (s) => s !== specialty
  //   );
  //   form.setValue("specialties", updatedSpecialties);
  //   toast.success("Specialty removed successfully", {
  //     className: "bg-primary text-white p-3",
  //   });
  // };
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-10">
      <div className="max-w-8xl mx-auto space-y-6">
        <div className="mx-auto w-full space-y-6">
          {/* Header */}
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
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column - Profile Header */}
                <div className="space-y-4 lg:col-span-1">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center space-y-3 text-center">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="https://github.com/leerob.png" />
                          <AvatarFallback className="bg-primary/10 text-2xl text-primary">
                            {getInitials(form.watch("name") || "TC")}
                          </AvatarFallback>
                        </Avatar>

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

                  {/* Account Details */}
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

                {/* Right Column - Personal Information */}
                <div className="h-full space-y-6 lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-10 pb-8">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                          render={({ field }) => (
                            <FormItem className="col-span-2 pt-4">
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Tell us about yourself..."
                                  disabled={!isEditing}
                                  className={cn(
                                    !isEditing && "bg-muted",
                                    "min-h-[100px]"
                                  )}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Specialties */}
                  {/* <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Specialties</CardTitle>
                        {isEditing && (
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Add new specialty..."
                              value={newSpecialty}
                              onChange={(e) => setNewSpecialty(e.target.value)}
                              className="w-48"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddSpecialty();
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={handleAddSpecialty}
                              disabled={!newSpecialty.trim()}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="specialties"
                        render={() => (
                          <FormItem>
                            <div className="flex flex-wrap gap-2">
                              {watchedSpecialties.map((specialty) => (
                                <Badge
                                  key={specialty}
                                  variant="default"
                                  className={cn(
                                    "group relative bg-primary text-primary-foreground",
                                    isEditing && "pr-8"
                                  )}
                                >
                                  {specialty}
                                  {isEditing && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveSpecialty(specialty)
                                      }
                                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  )}
                                </Badge>
                              ))}

                              {isEditing &&
                                availableSpecialties
                                  .filter(
                                    (specialty) =>
                                      !watchedSpecialties.includes(specialty)
                                  )
                                  .map((specialty) => (
                                    <Badge
                                      key={specialty}
                                      variant="outline"
                                      className="cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-primary/10"
                                      onClick={() =>
                                        handleSpecialtyToggle(specialty)
                                      }
                                    >
                                      {specialty}
                                      <Plus className="ml-1 h-3 w-3" />
                                    </Badge>
                                  ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card> */}
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
