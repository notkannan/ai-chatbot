"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Globe, Smile, Text } from "lucide-react";
import { FC, useEffect, useState } from "react";

// Define the available options
const options = {
  language: {
    label: "Language",
    icon: Globe,
    values: ["English", "Telugu", "Tamil", "Spanish", "French"],
  },
  tone: {
    label: "Tone",
    icon: Smile,
    values: ["Friendly", "Casual", "Professional"],
  },
  responseLength: {
    label: "Response Length",
    icon: Text,
    values: ["Short", "Medium", "Long"],
  },
};

const ProfilePage: FC = () => {
  const [preferences, setPreferences] = useState({
    language: "English",
    tone: "Friendly",
    responseLength: "Medium",
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("chatbotPreferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleSavePreferences = () => {
    localStorage.setItem("chatbotPreferences", JSON.stringify(preferences));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Close toast after 3 seconds
  };

  const handleChange = (key: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ToastProvider>
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-xl mx-4 shadow-lg rounded-lg">
          <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Personalize your chat experience
            </h2>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {Object.entries(options).map(
              ([key, { label, icon: Icon, values }]) => (
                <div key={key}>
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <Label htmlFor={key} className="font-semibold">
                      {label}
                    </Label>
                  </div>
                  <Select
                    value={preferences[key as keyof typeof preferences]}
                    onValueChange={(value) => handleChange(key, value)}
                  >
                    <SelectTrigger id={key}>
                      <SelectValue
                        placeholder={`Select ${label.toLowerCase()}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {values.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )
            )}

            <Button
              onClick={handleSavePreferences}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>

      {showToast && (
        <Toast>
          <ToastTitle>Preferences Saved</ToastTitle>
          <ToastDescription>
            Your preferences have been successfully saved.
          </ToastDescription>
          <ToastClose />
        </Toast>
      )}
      <ToastViewport />
    </ToastProvider>
  );
};

export default ProfilePage;
