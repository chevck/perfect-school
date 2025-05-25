import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface SchoolSettings {
  general: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
    website: string;
    logo: string;
  };
  billing: {
    currency: string;
    taxRate: number;
    paymentTerms: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    enableOnlinePayments: boolean;
    acceptedPaymentMethods: string[];
  };
  academic: {
    currentAcademicYear: string;
    currentTerm: string;
    gradingSystem: string;
    attendanceTrackingMethod: string;
    examPassingPercentage: number;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    feeReminderDays: number;
    examResultsNotification: boolean;
    attendanceAlerts: boolean;
  };
  appearance: {
    theme: string;
    primaryColor: string;
    accentColor: string;
    fontFamily: string;
    enableDarkMode: boolean;
    compactMode: boolean;
  };
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SchoolSettings>({
    general: {
      name: "Perfect School",
      address: "123 Education Street",
      city: "Knowledge City",
      state: "Learning State",
      zipCode: "12345",
      country: "United States",
      phone: "+1 (555) 123-4567",
      email: "info@perfectschool.edu",
      website: "www.perfectschool.edu",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=PS",
    },
    billing: {
      currency: "USD",
      taxRate: 7.5,
      paymentTerms: "Net 30",
      bankName: "Education First Bank",
      accountNumber: "1234567890",
      accountName: "Perfect School Inc.",
      enableOnlinePayments: true,
      acceptedPaymentMethods: ["Credit Card", "Bank Transfer", "Cash"],
    },
    academic: {
      currentAcademicYear: "2023-2024",
      currentTerm: "Spring",
      gradingSystem: "Letter Grade (A-F)",
      attendanceTrackingMethod: "Daily",
      examPassingPercentage: 60,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: false,
      feeReminderDays: 7,
      examResultsNotification: true,
      attendanceAlerts: true,
    },
    appearance: {
      theme: "Light",
      primaryColor: "#3b82f6",
      accentColor: "#10b981",
      fontFamily: "Inter",
      enableDarkMode: false,
      compactMode: false,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [name]: value,
      },
    });
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      billing: {
        ...settings.billing,
        [name]: name === "taxRate" ? parseFloat(value) : value,
      },
    });
  };

  const handleBillingToggle = (checked: boolean) => {
    setSettings({
      ...settings,
      billing: {
        ...settings.billing,
        enableOnlinePayments: checked,
      },
    });
  };

  const handleAcademicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      academic: {
        ...settings.academic,
        [name]: name === "examPassingPercentage" ? parseFloat(value) : value,
      },
    });
  };

  const handleSelectChange = (
    section: string,
    field: string,
    value: string,
  ) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof SchoolSettings],
        [field]: value,
      },
    });
  };

  const handleNotificationToggle = (field: string, checked: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [field]: checked,
      },
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [name]: name === "feeReminderDays" ? parseInt(value) : value,
      },
    });
  };

  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [name]: value,
      },
    });
  };

  const handleAppearanceToggle = (field: string, checked: boolean) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [field]: checked,
      },
    });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6 pb-16 bg-white rounded-lg">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your school profile and preferences.
        </p>
      </div>
      <Separator className="my-6" />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>
                Update your school's basic information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">School Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={settings.general.name}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={settings.general.email}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={settings.general.phone}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={settings.general.website}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={settings.general.address}
                  onChange={handleGeneralChange}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={settings.general.city}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    name="state"
                    value={settings.general.state}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={settings.general.zipCode}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={settings.general.country}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">School Logo URL</Label>
                <Input
                  id="logo"
                  name="logo"
                  value={settings.general.logo}
                  onChange={handleGeneralChange}
                />
                {settings.general.logo && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Preview:
                    </p>
                    <img
                      src={settings.general.logo}
                      alt="School Logo"
                      className="h-16 w-16 object-contain border rounded"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>
                Configure your school's billing preferences and payment
                information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.billing.currency}
                    onValueChange={(value) =>
                      handleSelectChange("billing", "currency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">
                        AUD - Australian Dollar
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    name="taxRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={settings.billing.taxRate}
                    onChange={handleBillingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select
                    value={settings.billing.paymentTerms}
                    onValueChange={(value) =>
                      handleSelectChange("billing", "paymentTerms", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Due on Receipt">
                        Due on Receipt
                      </SelectItem>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 45">Net 45</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-4" />
              <h3 className="text-lg font-medium">Bank Account Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    value={settings.billing.bankName}
                    onChange={handleBillingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    name="accountName"
                    value={settings.billing.accountName}
                    onChange={handleBillingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={settings.billing.accountNumber}
                    onChange={handleBillingChange}
                  />
                </div>
              </div>

              <Separator className="my-4" />
              <h3 className="text-lg font-medium">Payment Options</h3>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableOnlinePayments"
                  checked={settings.billing.enableOnlinePayments}
                  onCheckedChange={handleBillingToggle}
                />
                <Label htmlFor="enableOnlinePayments">
                  Enable online payments
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Settings</CardTitle>
              <CardDescription>
                Configure your school's academic year, grading system, and other
                academic preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentAcademicYear">
                    Current Academic Year
                  </Label>
                  <Input
                    id="currentAcademicYear"
                    name="currentAcademicYear"
                    value={settings.academic.currentAcademicYear}
                    onChange={handleAcademicChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentTerm">Current Term</Label>
                  <Select
                    value={settings.academic.currentTerm}
                    onValueChange={(value) =>
                      handleSelectChange("academic", "currentTerm", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fall">Fall</SelectItem>
                      <SelectItem value="Winter">Winter</SelectItem>
                      <SelectItem value="Spring">Spring</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradingSystem">Grading System</Label>
                  <Select
                    value={settings.academic.gradingSystem}
                    onValueChange={(value) =>
                      handleSelectChange("academic", "gradingSystem", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grading system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Letter Grade (A-F)">
                        Letter Grade (A-F)
                      </SelectItem>
                      <SelectItem value="Percentage (0-100%)">
                        Percentage (0-100%)
                      </SelectItem>
                      <SelectItem value="GPA (0-4.0)">GPA (0-4.0)</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendanceTrackingMethod">
                    Attendance Tracking
                  </Label>
                  <Select
                    value={settings.academic.attendanceTrackingMethod}
                    onValueChange={(value) =>
                      handleSelectChange(
                        "academic",
                        "attendanceTrackingMethod",
                        value,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tracking method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Per Class">Per Class</SelectItem>
                      <SelectItem value="Morning/Afternoon">
                        Morning/Afternoon
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examPassingPercentage">
                  Exam Passing Percentage
                </Label>
                <Input
                  id="examPassingPercentage"
                  name="examPassingPercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.academic.examPassingPercentage}
                  onChange={handleAcademicChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent to parents,
                students, and staff.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Notification Channels</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle("emailNotifications", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via text message
                    </p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle("smsNotifications", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications on mobile devices
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle("pushNotifications", checked)
                    }
                  />
                </div>
              </div>

              <Separator className="my-4" />
              <h3 className="text-lg font-medium">Notification Preferences</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="examResultsNotification">
                      Exam Results Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications when exam results are published
                    </p>
                  </div>
                  <Switch
                    id="examResultsNotification"
                    checked={settings.notifications.examResultsNotification}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle(
                        "examResultsNotification",
                        checked,
                      )
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="attendanceAlerts">Attendance Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Send alerts for student absences
                    </p>
                  </div>
                  <Switch
                    id="attendanceAlerts"
                    checked={settings.notifications.attendanceAlerts}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle("attendanceAlerts", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="feeReminderDays">
                    Fee Reminder Days Before Due Date
                  </Label>
                  <Input
                    id="feeReminderDays"
                    name="feeReminderDays"
                    type="number"
                    min="0"
                    max="90"
                    value={settings.notifications.feeReminderDays}
                    onChange={handleNotificationChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your school's dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(value) =>
                      handleSelectChange("appearance", "theme", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Light">Light</SelectItem>
                      <SelectItem value="Dark">Dark</SelectItem>
                      <SelectItem value="System">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select
                    value={settings.appearance.fontFamily}
                    onValueChange={(value) =>
                      handleSelectChange("appearance", "fontFamily", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      type="color"
                      className="w-12 h-8 p-1"
                      value={settings.appearance.primaryColor}
                      onChange={handleAppearanceChange}
                    />
                    <Input
                      type="text"
                      name="primaryColor"
                      value={settings.appearance.primaryColor}
                      onChange={handleAppearanceChange}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="accentColor"
                      name="accentColor"
                      type="color"
                      className="w-12 h-8 p-1"
                      value={settings.appearance.accentColor}
                      onChange={handleAppearanceChange}
                    />
                    <Input
                      type="text"
                      name="accentColor"
                      value={settings.appearance.accentColor}
                      onChange={handleAppearanceChange}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
              <h3 className="text-lg font-medium">Display Options</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableDarkMode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode for the dashboard
                    </p>
                  </div>
                  <Switch
                    id="enableDarkMode"
                    checked={settings.appearance.enableDarkMode}
                    onCheckedChange={(checked) =>
                      handleAppearanceToggle("enableDarkMode", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compactMode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use compact spacing for UI elements
                    </p>
                  </div>
                  <Switch
                    id="compactMode"
                    checked={settings.appearance.compactMode}
                    onCheckedChange={(checked) =>
                      handleAppearanceToggle("compactMode", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end space-x-4 mt-6">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="min-w-[120px]"
        >
          {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
