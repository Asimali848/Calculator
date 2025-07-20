// // import { useEffect, useState } from "react";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import {
// //   Calendar,
// //   Camera,
// //   Edit,
// //   Landmark,
// //   LockKeyholeOpen,
// //   Mail,
// //   Save,
// //   Star,
// //   X,
// // } from "lucide-react";
// // import { useForm } from "react-hook-form";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "sonner";
// // import * as z from "zod";
// // import { Avatar, AvatarImage } from "@/components/ui/avatar";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import {
// //   useGetProfileQuery,
// //   useUpdateUserMutation,
// // } from "@/store/services/auth";
// // const userProfileSchema = z.object({
// //   name: z.string().min(2, "Name must be at least 2 characters"),
// //   email: z.string().email("Please enter a valid email address"),
// //   bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
// //   company: z.string().min(1, "Company is required"),
// //   location: z.string().min(1, "Location is required"),
// //   phone: z.string().min(10, "Please enter a valid phone number"),
// //   website: z
// //     .string()
// //     .url("Please enter a valid website URL")
// //     .optional()
// //     .or(z.literal("")),
// //   specialties: z.array(z.string()).min(1, "At least one specialty is required"),
// // });
// // const passwordSchema = z
// //   .object({
// //     currentPassword: z.string().min(1, "Current password is required"),
// //     newPassword: z.string().min(8, "Password must be at least 8 characters"),
// //     confirmPassword: z.string().min(1, "Please confirm your password"),
// //   })
// //   .refine((data) => data.newPassword === data.confirmPassword, {
// //     message: "Passwords don't match",
// //     path: ["confirmPassword"],
// //   });
// // type UserProfileFormData = z.infer<typeof userProfileSchema>;
// // type PasswordFormData = z.infer<typeof passwordSchema>;
// // const Profile = () => {
// //   const navigate = useNavigate();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// //   const [image, setImage] = useState<string | null>(null);
// //   const [editableProfile, setEditableProfile] = useState({
// //     full_name: "",
// //     email: "",
// //     company: "",
// //     location: "",
// //     phone_number: "",
// //     website: "",
// //     subscription_plan: "",
// //     member_since: "",
// //   });
// //   const token = localStorage.getItem("access");
// //   const { data: profileData } = useGetProfileQuery({
// //     token: token || "",
// //   });
// //   const [updateUser] = useUpdateUserMutation();
// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImage(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };
// //   const form = useForm<UserProfileFormData>({
// //     resolver: zodResolver(userProfileSchema),
// //     defaultValues: {
// //       name: "Judgment Calculator",
// //       email: "example@gmail.com",
// //       bio: "Experienced task creator focused on quality content and social media projects.",
// //       company: "Digital Marketing Agency",
// //       location: "New York, NY",
// //       phone: "+1 (555) 987-6543",
// //       website: "https://myagency.com",
// //       specialties: ["Content Creation", "Social Media", "Marketing"],
// //     },
// //   });
// //   const passwordForm = useForm<PasswordFormData>({
// //     resolver: zodResolver(passwordSchema),
// //     defaultValues: {
// //       currentPassword: "",
// //       newPassword: "",
// //       confirmPassword: "",
// //     },
// //   });
// //   const handleSubmit = async (data: UserProfileFormData) => {
// //     // Get data from form
// //     try {
// //       if (!token) return;
// //       await updateUser({
// //         token,
// //         body: {
// //           full_name: data.name,
// //           email: data.email,
// //           company: data.company,
// //           location: data.location,
// //           phone_number: data.phone,
// //           website: data.website || "", // Handle optional
// //           // Add these if required by backend:
// //           subscription_plan: editableProfile.subscription_plan,
// //           member_since: editableProfile.member_since,
// //         },
// //       }).unwrap(); // Important for proper error handling
// //       toast.success("Profile updated successfully");
// //       setIsEditing(false);
// //     } catch (error) {
// //       toast.error("Failed to update profile");
// //     }
// //   };
// //   const handlePasswordSubmit = (data: PasswordFormData) => {
// //     console.log("Password change requested:", {
// //       currentPassword: data.currentPassword,
// //     });
// //     toast.success("Password changed successfully", {
// //       className: "bg-primary text-white p-3",
// //     });
// //     passwordForm.reset();
// //     setIsPasswordDialogOpen(false);
// //   };
// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setEditableProfile((prev) => ({ ...prev, [name]: value }));
// //   };
// //   const handleCancel = () => {
// //     if (profileData?.profile) {
// //       setEditableProfile(profileData.profile);
// //     }
// //     setIsEditing(false);
// //   };
// //   useEffect(() => {
// //     if (profileData?.profile) {
// //       setEditableProfile(profileData.profile);
// //       form.reset({
// //         name: profileData.profile.full_name,
// //         email: profileData.profile.email,
// //         company: profileData.profile.company,
// //         location: profileData.profile.location,
// //         phone: profileData.profile.phone_number,
// //         website: profileData.profile.website || "",
// //         // Add these if using them:
// //         bio: "",
// //         specialties: [],
// //       });
// //     }
// //   }, [profileData, form]);
// //   return (
// //     <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-10">
// //       <div className="max-w-8xl mx-auto space-y-6">
// //         <div className="mx-auto w-full space-y-6">
// //           <div className="flex items-center justify-end">
// //             {!isEditing ? (
// //               <Button
// //                 onClick={() => setIsEditing(true)}
// //                 className="flex items-center gap-2"
// //               >
// //                 <Edit className="h-4 w-4" />
// //                 Edit Profile
// //               </Button>
// //             ) : (
// //               <div className="flex items-center gap-2">
// //                 <Button
// //                   variant="outline"
// //                   onClick={handleCancel}
// //                   className="flex items-center gap-2"
// //                 >
// //                   <X className="h-4 w-4" />
// //                   Cancel
// //                 </Button>
// //                 <Button type="submit" className="flex items-center gap-2">
// //                   Save Changes
// //                 </Button>
// //               </div>
// //             )}
// //           </div>
// //           <Form {...form}>
// //             {/* <form
// //               onSubmit={form.handleSubmit(handleSubmit)}
// //               className="space-y-6"
// //             > */}
// //             <form
// //               onSubmit={form.handleSubmit(handleSubmit)}
// //               className="space-y-6"
// //             >
// //               <div className="grid h-[calc(100dvh-80px)] grid-cols-1 gap-6 lg:grid-cols-3">
// //                 <div className="space-y-4 lg:col-span-1">
// //                   <Card>
// //                     <CardContent className="pt-6">
// //                       <div className="flex flex-col items-center space-y-3 text-center">
// //                         <div className="relative">
// //                           <Avatar className="h-24 w-24">
// //                             {image ? (
// //                               <AvatarImage src={image} />
// //                             ) : (
// //                               <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
// //                                 <Landmark className="h-10 w-10 text-muted-foreground" />
// //                               </div>
// //                             )}
// //                           </Avatar>
// //                           {isEditing && (
// //                             <>
// //                               <input
// //                                 type="file"
// //                                 accept="image/*"
// //                                 id="profile-pic-upload"
// //                                 className="hidden"
// //                                 onChange={handleImageChange}
// //                               />
// //                               <label
// //                                 htmlFor="profile-pic-upload"
// //                                 className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-primary p-1 text-white shadow-md"
// //                                 title="Change profile picture"
// //                               >
// //                                 <Camera className="h-4 w-4" />
// //                               </label>
// //                             </>
// //                           )}
// //                         </div>
// //                         <div className="space-y-2">
// //                           <h1 className="text-2xl font-bold text-foreground">
// //                             {form.watch("name")}
// //                           </h1>
// //                           <div className="flex items-center justify-center gap-2 text-muted-foreground">
// //                             <Mail className="h-4 w-4" />
// //                             <span className="text-sm">
// //                               {form.watch("email")}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                   {/* Account Details card remains unchanged — you can copy from original */}
// //                   {/* ... Account Details Dialog for Password Change ... */}
// //                   <Card>
// //                     <CardHeader>
// //                       <CardTitle className="text-lg">Account Details</CardTitle>
// //                     </CardHeader>
// //                     <CardContent className="space-y-5">
// //                       <div className="">
// //                         <div className="flex items-center justify-between">
// //                           <h4 className="mb-2 font-medium text-foreground">
// //                             Subscription Plan
// //                           </h4>
// //                           <Badge
// //                             variant="outline"
// //                             className="border-blue-200 text-blue-600"
// //                           >
// //                             <Star className="mr-1 h-3 w-3" />
// //                             {profileData?.profile.subscription_plan}
// //                           </Badge>
// //                         </div>
// //                         <Button
// //                           onClick={() => {
// //                             navigate("/billing");
// //                           }}
// //                           type="button"
// //                           variant="default"
// //                           className=""
// //                         >
// //                           Upgrade the Plan
// //                         </Button>
// //                       </div>
// //                       <div>
// //                         <h4 className="mb-2 font-medium text-foreground">
// //                           Member Since
// //                         </h4>
// //                         <div className="flex items-center gap-2 text-muted-foreground">
// //                           <Calendar className="h-4 w-4" />
// //                           <span className="text-sm">
// //                             {profileData?.profile.member_since}
// //                           </span>
// //                         </div>
// //                       </div>
// //                       <div>
// //                         <h4 className="mb-2 font-medium text-foreground">
// //                           Security
// //                         </h4>
// //                         <div className="flex items-center justify-between">
// //                           <span className="text-sm text-muted-foreground">
// //                             Password protected
// //                           </span>
// //                           <Dialog
// //                             open={isPasswordDialogOpen}
// //                             onOpenChange={setIsPasswordDialogOpen}
// //                           >
// //                             <DialogTrigger asChild>
// //                               <Button
// //                                 variant="outline"
// //                                 size="sm"
// //                                 className="hover:bg-primary hover:text-white"
// //                               >
// //                                 <LockKeyholeOpen className="mr-2 h-4 w-4" />
// //                                 Change Password
// //                               </Button>
// //                             </DialogTrigger>
// //                             <DialogContent className="sm:max-w-md">
// //                               <DialogHeader>
// //                                 <DialogTitle>Change Password</DialogTitle>
// //                                 <DialogDescription>
// //                                   Enter your current password and choose a new
// //                                   one.
// //                                 </DialogDescription>
// //                               </DialogHeader>
// //                               <Form {...passwordForm}>
// //                                 <form
// //                                   onSubmit={passwordForm.handleSubmit(
// //                                     handlePasswordSubmit
// //                                   )}
// //                                   className="space-y-4"
// //                                 >
// //                                   <FormField
// //                                     control={passwordForm.control}
// //                                     name="currentPassword"
// //                                     render={({ field }) => (
// //                                       <FormItem>
// //                                         <FormLabel>Current Password</FormLabel>
// //                                         <FormControl>
// //                                           <Input
// //                                             {...field}
// //                                             type="input"
// //                                             placeholder="Enter current password"
// //                                           />
// //                                         </FormControl>
// //                                         <FormMessage />
// //                                       </FormItem>
// //                                     )}
// //                                   />
// //                                   <FormField
// //                                     control={passwordForm.control}
// //                                     name="newPassword"
// //                                     render={({ field }) => (
// //                                       <FormItem>
// //                                         <FormLabel>New Password</FormLabel>
// //                                         <FormControl>
// //                                           <Input
// //                                             {...field}
// //                                             type="input"
// //                                             placeholder="Enter new password"
// //                                           />
// //                                         </FormControl>
// //                                         <FormMessage />
// //                                       </FormItem>
// //                                     )}
// //                                   />
// //                                   <FormField
// //                                     control={passwordForm.control}
// //                                     name="confirmPassword"
// //                                     render={({ field }) => (
// //                                       <FormItem>
// //                                         <FormLabel>
// //                                           Confirm New Password
// //                                         </FormLabel>
// //                                         <FormControl>
// //                                           <Input
// //                                             {...field}
// //                                             type="input"
// //                                             placeholder="Confirm new password"
// //                                           />
// //                                         </FormControl>
// //                                         <FormMessage />
// //                                       </FormItem>
// //                                     )}
// //                                   />
// //                                   <div className="flex justify-end space-x-2 pt-4">
// //                                     <Button
// //                                       type="button"
// //                                       variant="outline"
// //                                       onClick={() => {
// //                                         passwordForm.reset();
// //                                         setIsPasswordDialogOpen(false);
// //                                       }}
// //                                     >
// //                                       Cancel
// //                                     </Button>
// //                                     <Button type="submit">
// //                                       Change Password
// //                                     </Button>
// //                                   </div>
// //                                 </form>
// //                               </Form>
// //                             </DialogContent>
// //                           </Dialog>
// //                         </div>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 </div>
// //                 {/* Personal Information Form (unchanged) */}
// //                 <div className="space-y-6 lg:col-span-2">
// //                   <Card>
// //                     <CardHeader>
// //                       <CardTitle className="text-2xl font-semibold">
// //                         Personal Information
// //                       </CardTitle>
// //                     </CardHeader>
// //                     <CardContent className="space-y-4">
// //                       {/* Full Name */}
// //                       <div className="grid gap-2">
// //                         <Label htmlFor="full_name">Full Name</Label>
// //                         <Input
// //                           id="full_name"
// //                           name="full_name"
// //                           value={editableProfile.full_name}
// //                           onChange={handleChange}
// //                           disabled={!isEditing}
// //                         />
// //                       </div>
// //                       {/* Email */}
// //                       <div className="grid gap-2">
// //                         <Label htmlFor="email">Email</Label>
// //                         <Input
// //                           id="email"
// //                           name="email"
// //                           value={editableProfile.email}
// //                           onChange={handleChange}
// //                           disabled={!isEditing}
// //                         />
// //                       </div>
// //                       {/* Company */}
// //                       <div className="grid gap-2">
// //                         <Label htmlFor="company">Company</Label>
// //                         <Input
// //                           id="company"
// //                           name="company"
// //                           value={editableProfile.company}
// //                           onChange={handleChange}
// //                           disabled={!isEditing}
// //                         />
// //                       </div>
// //                       {/* Location */}
// //                       <div className="grid gap-2">
// //                         <Label htmlFor="location">Location</Label>
// //                         <Input
// //                           id="location"
// //                           name="location"
// //                           value={editableProfile.location}
// //                           onChange={handleChange}
// //                           disabled={!isEditing}
// //                         />
// //                       </div>
// //                       {/* Phone Number */}
// //                       <div className="grid gap-2">
// //                         <Label htmlFor="phone_number">Phone Number</Label>
// //                         <Input
// //                           id="phone_number"
// //                           name="phone_number"
// //                           value={editableProfile.phone_number}
// //                           onChange={handleChange}
// //                           disabled={!isEditing}
// //                         />
// //                       </div>
// //                       {/* Website */}
// //                       <div className="grid gap-2">
// //                         <Label htmlFor="website">Website</Label>
// //                         <Input
// //                           id="website"
// //                           name="website"
// //                           value={editableProfile.website}
// //                           onChange={handleChange}
// //                           disabled={!isEditing}
// //                         />
// //                         <FormField
// //                           control={form.control}
// //                           name="bio"
// //                           //@ts-ignore
// //                           render={({ field }) => (
// //                             <FormItem className="pt-4 md:col-span-2">
// //                               <FormLabel></FormLabel>
// //                               <FormControl className="flex flex-col gap-4 md:min-h-[90px]">
// //                                 <div className=""></div>
// //                               </FormControl>
// //                               <FormMessage />
// //                             </FormItem>
// //                           )}
// //                         />
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 </div>
// //               </div>
// //             </form>
// //           </Form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Profile;
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Camera,
  Edit,
  Landmark,
  LockKeyholeOpen,
  Mail,
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
import {
  useGetProfileQuery,
  useUpdateUserMutation,
} from "@/store/services/auth";

// Updated schema to match backend fields
const userProfileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string(),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  phone_number: z.string().min(10, "Please enter a valid phone number"),
  website: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
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

  const token = localStorage.getItem("access");
  const { data: profileData } = useGetProfileQuery({
    token: token || "",
  });

  const [updateUser] = useUpdateUserMutation();

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      full_name: "",
      email: "",
      image: "",
      company: "",
      location: "",
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Updated submit handler
  const handleSubmit = async (data: UserProfileFormData) => {
    try {
      if (!token || !profileData?.profile) return;

      // Prepare payload with required backend fields
      const payload = {
        ...profileData.profile,
        ...data,
        subscription_plan: profileData.profile.subscription_plan,
        member_since: profileData.profile.member_since,
      };

      // Call update mutation
      await updateUser({
        token,
        body: payload,
      }).unwrap();

      toast.success("Profile updated successfully", {
        className: "bg-primary text-white p-3",
      });
      setIsEditing(false);
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.data?.message || "Failed to update profile", {
        className: "bg-red-500 text-white p-3",
      });
    }
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
    if (profileData?.profile) {
      form.reset(profileData.profile);
    }
    setIsEditing(false);
  };

  // Initialize form with profile data
  useEffect(() => {
    if (profileData?.profile) {
      form.reset(profileData.profile);
    }
  }, [profileData, form]);

  return (
    <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-10">
      <div className="max-w-8xl mx-auto space-y-6">
        <div className="mx-auto w-full space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Move buttons inside form */}
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
                    <Button type="submit" className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

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
                            {form.watch("full_name")}
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
                                  <FormField
                                    control={passwordForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="password"
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
                                            type="password"
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
                                            type="password"
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

                <div className="space-y-6 lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold">
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Full Name */}
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
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
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Location */}
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone Number */}
                      <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
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
                              <Input {...field} disabled={!isEditing} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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

// import { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Calendar,
//   Camera,
//   Edit,
//   Landmark,
//   LockKeyholeOpen,
//   Mail,
//   Save,
//   Star,
//   X,
// } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import * as z from "zod";

// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   useGetProfileQuery,
//   useUpdateUserMutation,
// } from "@/store/services/auth";

// // Updated schema with image field
// const userProfileSchema = z.object({
//   full_name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   company: z.string().min(1, "Company is required"),
//   location: z.string().min(1, "Location is required"),
//   phone_number: z.string().min(10, "Please enter a valid phone number"),
//   website: z
//     .string()
//     .url("Please enter a valid website URL")
//     .optional()
//     .or(z.literal("")),
//   image: z.any().optional(), // More flexible handling for image
// });

// const passwordSchema = z
//   .object({
//     currentPassword: z.string().min(1, "Current password is required"),
//     newPassword: z.string().min(8, "Password must be at least 8 characters"),
//     confirmPassword: z.string().min(1, "Please confirm your password"),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// type UserProfileFormData = z.infer<typeof userProfileSchema>;
// type PasswordFormData = z.infer<typeof passwordSchema>;

// const Profile = () => {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const token = localStorage.getItem("access");
//   const { data: profileData } = useGetProfileQuery({
//     token: token || "",
//   });

//   const [updateUser] = useUpdateUserMutation();

//   const form = useForm<UserProfileFormData>({
//     resolver: zodResolver(userProfileSchema),
//     defaultValues: {
//       full_name: "",
//       email: "",
//       company: "",
//       location: "",
//       phone_number: "",
//       website: "",
//     },
//   });

//   const passwordForm = useForm<PasswordFormData>({
//     resolver: zodResolver(passwordSchema),
//     defaultValues: {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);

//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (data: UserProfileFormData) => {
//   try {
//     if (!token || !profileData?.profile) return;

//     // Create FormData to handle file upload
//     const formData = new FormData();
//     formData.append("full_name", data.full_name);
//     formData.append("email", data.email);
//     formData.append("company", data.company);
//     formData.append("location", data.location);
//     formData.append("phone_number", data.phone_number);
//     formData.append("website", data.website || "");
//     formData.append("subscription_plan", profileData.profile.subscription_plan);
//     formData.append("member_since", profileData.profile.member_since);

//     if (selectedFile) {
//       formData.append("image", selectedFile);
//     }

//     // Call update mutation with FormData
//     await updateUser({
//       token,
//       body: formData
//     }).unwrap();

//     toast.success("Profile updated successfully");
//     setIsEditing(false);
//     setSelectedFile(null);
//   } catch (error: any) {
//     let errorMessage = "Failed to update profile";

//     if (error.data) {
//       // Handle different error formats
//       if (typeof error.data === "string") {
//         errorMessage = error.data;
//       } else if (error.data.message) {
//         errorMessage = error.data.message;
//       }
//     } else if (error.status) {
//       errorMessage = `Request failed with status ${error.status}`;
//     }

//     toast.error(errorMessage);
//   }
// };

//   const handlePasswordSubmit = (data: PasswordFormData) => {
//     console.log("Password change requested:", {
//       currentPassword: data.currentPassword,
//     });
//     toast.success("Password changed successfully", {
//       className: "bg-primary text-white p-3",
//     });
//     passwordForm.reset();
//     setIsPasswordDialogOpen(false);
//   };

//   const handleCancel = () => {
//     if (profileData?.profile) {
//       form.reset(profileData.profile);
//       setImagePreview(profileData.profile.image || null);
//       setSelectedFile(null);
//     }
//     setIsEditing(false);
//   };

//   // Initialize form with profile data
//   useEffect(() => {
//     if (profileData?.profile) {
//       form.reset(profileData.profile);

//       // Set image preview if profile has an image
//       if (profileData.profile.image) {
//         setImagePreview(profileData.profile.image);
//       }
//     }
//   }, [profileData, form]);

//   return (
//     <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-10">
//       <div className="max-w-8xl mx-auto space-y-6">
//         <div className="mx-auto w-full space-y-6">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleSubmit)}
//               className="space-y-6"
//               encType="multipart/form-data"
//             >
//               {/* Move buttons inside form */}
//               <div className="flex items-center justify-end">
//                 {!isEditing ? (
//                   <Button
//                     onClick={() => setIsEditing(true)}
//                     className="flex items-center gap-2"
//                     type="button"
//                   >
//                     <Edit className="h-4 w-4" />
//                     Edit Profile
//                   </Button>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="outline"
//                       onClick={handleCancel}
//                       className="flex items-center gap-2"
//                       type="button"
//                     >
//                       <X className="h-4 w-4" />
//                       Cancel
//                     </Button>
//                     <Button type="submit" className="flex items-center gap-2">
//                       <Save className="h-4 w-4" />
//                       Save Changes
//                     </Button>
//                   </div>
//                 )}
//               </div>

//               <div className="grid h-[calc(100dvh-80px)] grid-cols-1 gap-6 lg:grid-cols-3">
//                 <div className="space-y-4 lg:col-span-1">
//                   <Card>
//                     <CardContent className="pt-6">
//                       <div className="flex flex-col items-center space-y-3 text-center">
//                         <div className="relative">
//                           <Avatar className="h-24 w-24">
//                             {imagePreview ? (
//                               <AvatarImage src={imagePreview} />
//                             ) : (
//                               <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
//                                 <Landmark className="h-10 w-10 text-muted-foreground" />
//                               </div>
//                             )}
//                           </Avatar>

//                           {isEditing && (
//                             <>
//                               <input
//                                 type="file"
//                                 accept="image/*"
//                                 id="profile-pic-upload"
//                                 className="hidden"
//                                 onChange={handleImageChange}
//                               />
//                               <label
//                                 htmlFor="profile-pic-upload"
//                                 className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-primary p-1 text-white shadow-md"
//                                 title="Change profile picture"
//                               >
//                                 <Camera className="h-4 w-4" />
//                               </label>
//                             </>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <h1 className="text-2xl font-bold text-foreground">
//                             {form.watch("full_name")}
//                           </h1>
//                           <div className="flex items-center justify-center gap-2 text-muted-foreground">
//                             <Mail className="h-4 w-4" />
//                             <span className="text-sm">
//                               {form.watch("email")}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Account Details</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-5">
//                       <div className="">
//                         <div className="flex items-center justify-between">
//                           <h4 className="mb-2 font-medium text-foreground">
//                             Subscription Plan
//                           </h4>
//                           <Badge
//                             variant="outline"
//                             className="border-blue-200 text-blue-600"
//                           >
//                             <Star className="mr-1 h-3 w-3" />
//                             {profileData?.profile.subscription_plan}
//                           </Badge>
//                         </div>
//                         <Button
//                           onClick={() => navigate("/billing")}
//                           type="button"
//                           variant="default"
//                         >
//                           Upgrade the Plan
//                         </Button>
//                       </div>

//                       <div>
//                         <h4 className="mb-2 font-medium text-foreground">
//                           Member Since
//                         </h4>
//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <Calendar className="h-4 w-4" />
//                           <span className="text-sm">
//                             {profileData?.profile.member_since}
//                           </span>
//                         </div>
//                       </div>

//                       <div>
//                         <h4 className="mb-2 font-medium text-foreground">
//                           Security
//                         </h4>
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-muted-foreground">
//                             Password protected
//                           </span>
//                           <Dialog
//                             open={isPasswordDialogOpen}
//                             onOpenChange={setIsPasswordDialogOpen}
//                           >
//                             <DialogTrigger asChild>
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 className="hover:bg-primary hover:text-white"
//                                 type="button"
//                               >
//                                 <LockKeyholeOpen className="mr-2 h-4 w-4" />
//                                 Change Password
//                               </Button>
//                             </DialogTrigger>
//                             <DialogContent className="sm:max-w-md">
//                               <DialogHeader>
//                                 <DialogTitle>Change Password</DialogTitle>
//                                 <DialogDescription>
//                                   Enter your current password and choose a new
//                                   one.
//                                 </DialogDescription>
//                               </DialogHeader>
//                               <Form {...passwordForm}>
//                                 <form
//                                   onSubmit={passwordForm.handleSubmit(
//                                     handlePasswordSubmit
//                                   )}
//                                   className="space-y-4"
//                                 >
//                                   <FormField
//                                     control={passwordForm.control}
//                                     name="currentPassword"
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>Current Password</FormLabel>
//                                         <FormControl>
//                                           <Input
//                                             {...field}
//                                             type="password"
//                                             placeholder="Enter current password"
//                                           />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <FormField
//                                     control={passwordForm.control}
//                                     name="newPassword"
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>New Password</FormLabel>
//                                         <FormControl>
//                                           <Input
//                                             {...field}
//                                             type="password"
//                                             placeholder="Enter new password"
//                                           />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <FormField
//                                     control={passwordForm.control}
//                                     name="confirmPassword"
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>
//                                           Confirm New Password
//                                         </FormLabel>
//                                         <FormControl>
//                                           <Input
//                                             {...field}
//                                             type="password"
//                                             placeholder="Confirm new password"
//                                           />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <div className="flex justify-end space-x-2 pt-4">
//                                     <Button
//                                       type="button"
//                                       variant="outline"
//                                       onClick={() => {
//                                         passwordForm.reset();
//                                         setIsPasswordDialogOpen(false);
//                                       }}
//                                     >
//                                       Cancel
//                                     </Button>
//                                     <Button type="submit">
//                                       Change Password
//                                     </Button>
//                                   </div>
//                                 </form>
//                               </Form>
//                             </DialogContent>
//                           </Dialog>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 <div className="space-y-6 lg:col-span-2">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-2xl font-semibold">
//                         Personal Information
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       {/* Full Name */}
//                       <FormField
//                         control={form.control}
//                         name="full_name"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Full Name</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 disabled={!isEditing}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Email */}
//                       <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Email</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 disabled={!isEditing}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Company */}
//                       <FormField
//                         control={form.control}
//                         name="company"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Company</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 disabled={!isEditing}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Location */}
//                       <FormField
//                         control={form.control}
//                         name="location"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Location</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 disabled={!isEditing}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Phone Number */}
//                       <FormField
//                         control={form.control}
//                         name="phone_number"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Phone Number</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 disabled={!isEditing}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Website */}
//                       <FormField
//                         control={form.control}
//                         name="website"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Website</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 disabled={!isEditing}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Hidden image field for form submission */}
//                       <FormField
//                         control={form.control}
//                         name="image"
//                         render={({ field }) => (
//                           <FormItem className="hidden">
//                             <FormControl>
//                               <Input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 ref={field.ref}
//                                 name={field.name}
//                                 onBlur={field.onBlur}
//                               />
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
