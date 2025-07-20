// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Textarea } from "@/components/ui/textarea"
// import { Settings, Bell, Shield, CreditCard } from "lucide-react"
// import { Separator } from "@/components/ui/separator"

// export default function AdminSettings() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [showSuccess, setShowSuccess] = useState(false)

//   const handleSave = async () => {
//     setIsLoading(true)
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     setIsLoading(false)
//     setShowSuccess(true)
//     setTimeout(() => setShowSuccess(false), 3000)
//   }

//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue="general" className="space-y-6">
//         <TabsList>
//           <TabsTrigger value="general">
//             <Settings className="mr-2 h-4 w-4" />
//             General
//           </TabsTrigger>
//           <TabsTrigger value="security">
//             <Shield className="mr-2 h-4 w-4" />
//             Security
//           </TabsTrigger>
//           <TabsTrigger value="notifications">
//             <Bell className="mr-2 h-4 w-4" />
//             Notifications
//           </TabsTrigger>
//           <TabsTrigger value="payments">
//             <CreditCard className="mr-2 h-4 w-4" />
//             Payments
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="general">
//           <Card>
//             <CardHeader>
//               <CardTitle>General Settings</CardTitle>
//               <CardDescription>Manage your platform's general settings</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="platform-name">Platform Name</Label>
//                 <Input id="platform-name" defaultValue="AgroMat" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="contact-email">Contact Email</Label>
//                 <Input id="contact-email" type="email" defaultValue="support@agromat.com" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="platform-description">Platform Description</Label>
//                 <Textarea
//                   id="platform-description"
//                   defaultValue="An innovative agricultural investment platform designed to empower individuals and businesses to profit from agriculture without traditional farming hassles."
//                   rows={4}
//                 />
//               </div>
//               <Separator />
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Features</h3>
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="seller-registration">Seller Registration</Label>
//                     <p className="text-sm text-muted-foreground">Allow new sellers to register</p>
//                   </div>
//                   <Switch id="seller-registration" defaultChecked />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="buyer-registration">Buyer Registration</Label>
//                     <p className="text-sm text-muted-foreground">Allow new buyers to register</p>
//                   </div>
//                   <Switch id="buyer-registration" defaultChecked />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
//                     <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
//                   </div>
//                   <Switch id="maintenance-mode" />
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button variant="outline">Reset</Button>
//               <Button 
//                 onClick={handleSave} 
//                 disabled={isLoading}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 {isLoading ? "Saving..." : "Save Changes"}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         <TabsContent value="security">
//           <Card>
//             <CardHeader>
//               <CardTitle>Security Settings</CardTitle>
//               <CardDescription>Manage your platform's security settings</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Authentication</h3>
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="two-factor">Two-Factor Authentication</Label>
//                     <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
//                   </div>
//                   <Switch id="two-factor" defaultChecked />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="password-expiry">Password Expiry</Label>
//                     <p className="text-sm text-muted-foreground">Force password reset every 90 days</p>
//                   </div>
//                   <Switch id="password-expiry" />
//                 </div>
//               </div>
//               <Separator />
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Privacy</h3>
//                 <div className="space-y-2">
//                   <Label htmlFor="privacy-policy">Privacy Policy</Label>
//                   <Textarea
//                     id="privacy-policy"
//                     defaultValue="Our privacy policy content..."
//                     rows={4}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="terms-of-service">Terms of Service</Label>
//                   <Textarea
//                     id="terms-of-service"
//                     defaultValue="Our terms of service content..."
//                     rows={4}
//                   />
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button variant="outline">Reset</Button>
//               <Button 
//                 onClick={handleSave} 
//                 disabled={isLoading}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 {isLoading ? "Saving..." : "Save Changes"}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         <TabsContent value="notifications">
//           <Card>
//             <CardHeader>
//               <CardTitle>Notification Settings</CardTitle>
//               <CardDescription>Configure system notifications</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Email Notifications</h3>
                
// )}