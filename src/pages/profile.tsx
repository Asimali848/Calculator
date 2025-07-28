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
//   useChangePasswordMutation,
//   // Added import
//   useGetProfileQuery,
//   useUpdateUserMutation,
// } from "@/store/services/auth";

// const userProfileSchema = z.object({
//   full_name: z.string().min(2, "Name must be at least 2 characters"),
//   image: z.string(),
//   email: z.string().email("Please enter a valid email address"),
//   company: z.string().min(1, "Company is required"),
//   location: z.string().min(1, "Location is required"),
//   phone_number: z.string().min(10, "Please enter a valid phone number"),
//   website: z
//     .string()
//     .url("Please enter a valid website URL")
//     .optional()
//     .or(z.literal("")),
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
//   })
//   .refine((data) => data.newPassword !== data.currentPassword, {
//     message: "New password must be different from current password",
//     path: ["newPassword"],
//   });

// type UserProfileFormData = z.infer<typeof userProfileSchema>;
// type PasswordFormData = z.infer<typeof passwordSchema>;

// const Profile = () => {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
//   const [image, setImage] = useState<string | null>(null);

//   const token = localStorage.getItem("access");
//   const { data: profileData } = useGetProfileQuery({
//     token: token || "",
//   });

//   const [updateUser] = useUpdateUserMutation();
//   const [changePassword, { isLoading: isChangingPassword }] =
//     useChangePasswordMutation(); // Added hook

//   const form = useForm<UserProfileFormData>({
//     resolver: zodResolver(userProfileSchema),
//     defaultValues: {
//       full_name: "",
//       email: "",
//       image: "",
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
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64Image = reader.result as string;
//         setImage(base64Image);
//         form.setValue("image", base64Image, { shouldValidate: true });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (data: UserProfileFormData) => {
//     try {
//       if (!token || !profileData?.profile) {
//         toast.error("Authentication required", {
//           className: "bg-red-500 text-white p-3",
//         });
//         return;
//       }

//       const payload = {
//         ...profileData.profile,
//         ...data,
//         image: data.image,
//         subscription_plan: profileData.profile.subscription_plan,
//         member_since: profileData.profile.member_since,
//       };

//       await updateUser({
//         token,
//         body: payload,
//       }).unwrap();

//       toast.success("Profile updated successfully", {
//         className: "bg-primary text-white p-3",
//       });
//       setIsEditing(false);
//     } catch (error: any) {
//       console.error("Update error:", error);
//       toast.error(error.data?.message || "Failed to update profile", {
//         className: "bg-red-500 text-white p-3",
//       });
//     }
//   };

//   const handlePasswordSubmit = async (data: PasswordFormData) => {
//     try {
//       if (!token) {
//         toast.error("Authentication required", {
//           className: "bg-red-500 text-white p-3",
//         });
//         return;
//       }

//       // Call the password change API
//       await changePassword({
//         token,
//         body: {
//           current_password: data.currentPassword,
//           new_password: data.newPassword,
//         },
//       }).unwrap();

//       toast.success("Password changed successfully", {
//         className: "bg-primary text-white p-3",
//       });
//       passwordForm.reset();
//       setIsPasswordDialogOpen(false);
//     } catch (error: any) {
//       console.error("Password change error:", error);
//       toast.error(
//         error.data?.detail ||
//           error.data?.message ||
//           "Failed to change password. Please try again.",
//         { className: "bg-red-500 text-white p-3" }
//       );
//     }
//   };

//   const handleCancel = () => {
//     if (profileData?.profile) {
//       form.reset(profileData.profile);
//       setImage(null);
//     }
//     setIsEditing(false);
//   };

//   useEffect(() => {
//     if (profileData?.profile) {
//       form.reset(profileData.profile);
//       setImage(profileData.profile.image || null);
//     }
//   }, [profileData, form]);

//   return (
//     <div className="mx-auto h-screen w-full overflow-auto bg-background p-4 md:p-10">
//       <div className="max-w-8xl mx-auto space-y-6">
//         <div className="mx-auto w-full space-y-6">
//           <div className="flex items-center justify-end">
//             {!isEditing ? (
//               <Button
//                 onClick={() => setIsEditing(true)}
//                 className="flex items-center gap-2"
//                 type="button"
//               >
//                 <Edit className="h-4 w-4" />
//                 Edit Profile
//               </Button>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={handleCancel}
//                   className="flex items-center gap-2"
//                   type="button"
//                 >
//                   <X className="h-4 w-4" />
//                   Cancel
//                 </Button>
//               </div>
//             )}
//           </div>

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleSubmit)}
//               className="space-y-6"
//             >
//               <div className="grid h-[calc(100dvh-80px)] grid-cols-1 gap-6 lg:grid-cols-3">
//                 <div className="space-y-4 lg:col-span-1">
//                   <Card>
//                     <CardContent className="pt-6">
//                       <div className="flex flex-col items-center space-y-3 text-center">
//                         <div className="relative">
//                           <Avatar className="h-24 w-24">
//                             {image ? (
//                               <AvatarImage
//                                 src={image}
//                                 alt="Profile"
//                                 className="object-cover"
//                               />
//                             ) : profileData?.profile?.image ? (
//                               <AvatarImage
//                                 src={profileData?.profile.image}
//                                 alt="Profile"
//                                 className="object-cover"
//                               />
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
//                                       disabled={isChangingPassword}
//                                     >
//                                       Cancel
//                                     </Button>
//                                     <Button
//                                       type="submit"
//                                       disabled={isChangingPassword}
//                                     >
//                                       {isChangingPassword
//                                         ? "Changing..."
//                                         : "Change Password"}
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
//                               <Input {...field} disabled={!isEditing} />
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
//                               <Input {...field} disabled />
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
//                             <FormLabel>Firm Name</FormLabel>
//                             <FormControl>
//                               <Input {...field} disabled={!isEditing} />
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
//                               <Input {...field} disabled={!isEditing} />
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
//                               <Input {...field} disabled={!isEditing} />
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
//                               <Input placeholder="https://www.example.com  ||   http://example.com" {...field} disabled={!isEditing} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {isEditing && (
//                         <div className="flex justify-end pt-6">
//                           <Button
//                             type="submit"
//                             className="flex items-center gap-2"
//                           >
//                             <Save className="h-4 w-4" />
//                             Save Changes
//                           </Button>
//                         </div>
//                       )}
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
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateUserMutation,
} from "@/store/services/auth";

const userProfileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  image: z.string(),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company is required"),
  street_address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip_code: z.string().min(1, "Zip code is required"),
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
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type UserProfileFormData = z.infer<typeof userProfileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

// Helper function to parse location string
const parseLocation = (location: string) => {
  const parts = location.split(',').map(part => part.trim());
  const n = parts.length;
  
  // Initialize with empty values
  let street_address = '';
  let city = '';
  let state = '';
  let zip_code = '';

  if (n >= 4) {
    // Case: Street, Area, City, State Zip
    street_address = parts.slice(0, n - 3).join(', ');
    city = parts[n - 3] || '';
    
    const stateZip = parts[n - 1] || '';
    const stateZipParts = stateZip.split(' ');
    zip_code = stateZipParts.pop() || '';
    state = stateZipParts.join(' ') || parts[n - 2] || '';
  } 
  else if (n === 3) {
    // Case: Street, City, State Zip
    street_address = parts[0] || '';
    city = parts[1] || '';
    
    const stateZip = parts[2] || '';
    const stateZipParts = stateZip.split(' ');
    zip_code = stateZipParts.pop() || '';
    state = stateZipParts.join(' ');
  } 
  else if (n === 2) {
    // Case: City, State Zip
    city = parts[0] || '';
    
    const stateZip = parts[1] || '';
    const stateZipParts = stateZip.split(' ');
    zip_code = stateZipParts.pop() || '';
    state = stateZipParts.join(' ');
  } 
  else if (n === 1) {
    // Case: Everything in one string
    const singlePart = parts[0] || '';
    const singleParts = singlePart.split(' ');
    
    // Try to extract zip code (last word)
    zip_code = singleParts.pop() || '';
    state = singleParts.pop() || '';
    
    // The rest is city
    city = singleParts.join(' ');
  }

  return { street_address, city, state, zip_code };
};

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
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImage(base64Image);
        form.setValue("image", base64Image, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
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

      // Combine address components for backend
      const location = `${data.street_address}, ${data.city}, ${data.state} ${data.zip_code}`.trim();

      const payload = {
        ...profileData.profile,
        ...data,
        full_name: `${data.first_name} ${data.last_name}`,
        location,
        image: data.image,
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
      const [first_name, ...last_nameParts] = profileData.profile.full_name.split(' ');
      const last_name = last_nameParts.join(' ');
      
      // Parse location
      const location = profileData.profile.location || '';
      const { street_address, city, state, zip_code } = parseLocation(location);
      
      form.reset({
        ...profileData.profile,
        first_name,
        last_name,
        street_address,
        city,
        state,
        zip_code
      });
      setImage(profileData.profile.image || null);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (profileData?.profile) {
      // Split full name into first/last
      const [first_name, ...last_nameParts] = profileData.profile.full_name.split(' ');
      const last_name = last_nameParts.join(' ');
      
      // Parse location
      const location = profileData.profile.location || '';
      const { street_address, city, state, zip_code } = parseLocation(location);
      
      form.reset({
        ...profileData.profile,
        first_name,
        last_name,
        street_address,
        city,
        state,
        zip_code
      });
      setImage(profileData.profile.image || null);
    }
  }, [profileData, form]);

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
                            {image ? (
                              <AvatarImage
                                src={image}
                                alt="Profile"
                                className="object-cover"
                              />
                            ) : profileData?.profile?.image ? (
                              <AvatarImage
                                src={profileData?.profile.image}
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
                                <Input {...field} disabled={!isEditing} />
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
                                <Input {...field} disabled={!isEditing} />
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
                              <Input {...field} disabled={!isEditing} />
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
                              <Input {...field} disabled={!isEditing} />
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
                                <Input {...field} disabled={!isEditing} />
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
                                <Input {...field} disabled={!isEditing} />
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
                                <Input {...field} disabled={!isEditing} />
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
                              <Input placeholder="https://www.example.com  ||   http://example.com" {...field} disabled={!isEditing} />
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
                          >
                            <Save className="h-4 w-4" />
                            Save Changes
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