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
import { Globe, Smile, Text } from "lucide-react"; // Import icons
import { FC, useState } from "react";

const ProfilePage: FC = () => {
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Friendly");
  const [responseLength, setResponseLength] = useState("Medium");

  const handleSavePreferences = () => {
    const preferences = { language, tone, responseLength };
    localStorage.setItem("chatbotPreferences", JSON.stringify(preferences));
    //console.log("Preferences saved:", preferences);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]  ">
      <Card className="w-full max-w-xl mx-4 shadow-lg rounded-lg">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Personalize your chat experience
          </h2>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <Label htmlFor="language" className="font-semibold">
              Language
            </Label>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Smile className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <Label htmlFor="tone" className="font-semibold">
              Tone
            </Label>
          </div>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Friendly">Friendly</SelectItem>
              <SelectItem value="Casual">Casual</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Text className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <Label htmlFor="response-length" className="font-semibold">
              Response Length
            </Label>
          </div>
          <Select value={responseLength} onValueChange={setResponseLength}>
            <SelectTrigger id="response-length">
              <SelectValue placeholder="Select response length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Short">Short</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Long">Long</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleSavePreferences}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
