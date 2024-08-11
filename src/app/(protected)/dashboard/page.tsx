//src/app/(protected)/dashboard/page.tsx
"use client";

import Chat from "@/app/components/Chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Briefcase, FileText, Rocket, Zap } from "lucide-react";
import React from "react";
import {
  SiFirebase,
  SiOpenai,
  SiRadixui,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiUpstash,
  SiVercel,
} from "react-icons/si";

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Chatbot",
      description: "Interact with NEU Husky Bot for personalized support",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Chat Preferences",
      description: "Customize your chat experience with various settings",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "User Authentication",
      description: "Secure login and personalized dashboard",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Dark/Light Mode",
      description: "Switch between dark and light themes",
    },
  ];

  const techStacks = [
    {
      category: "Frontend Technologies",
      techs: [
        {
          icon: SiReact,
          name: "React",
          description: "UI library for building interfaces",
        },
        {
          icon: SiTypescript,
          name: "TypeScript",
          description: "Typed JavaScript for better code quality",
        },
        {
          icon: SiTailwindcss,
          name: "Tailwind CSS",
          description: "Utility-first CSS framework",
        },
        {
          icon: SiRadixui,
          name: "Shadcn UI",
          description: "Reusable components built with Radix UI",
        },
      ],
    },
    {
      category: "Backend & Deployment",
      techs: [
        {
          icon: SiFirebase,
          name: "Firebase",
          description: "Backend-as-a-Service for authentication and data",
        },
        {
          icon: SiVercel,
          name: "Vercel",
          description: "Platform for serverless deployment",
        },
        {
          icon: SiUpstash,
          name: "Upstash Redis",
          description: "Serverless Redis for caching and data storage",
        },
      ],
    },
    {
      category: "AI Integrations",
      techs: [
        {
          icon: SiOpenai,
          name: "OpenAI",
          description: "AI models for natural language processing",
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full flex flex-col"
          >
            <Card className="w-full max-w-4xl mx-auto shadow-md flex flex-col flex-grow">
              <CardHeader className="bg-primary/10 dark:bg-primary/20">
                <CardTitle className="text-3xl font-bold text-primary">
                  Welcome to NEU Husky Bot
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow overflow-hidden">
                <ScrollArea className="flex-grow pr-4 overflow-y-auto">
                  <div className="space-y-8 pb-8">
                    <section>
                      <h2 className="text-2xl font-semibold mb-4">
                        About NEU Husky Bot
                      </h2>
                      <p className="text-muted-foreground">
                        NEU Husky Bot is your intelligent assistant for
                        navigating the Northeastern University ecosystem.
                        Whether you need help with coursework, campus events, or
                        general inquiries, NEU Husky Bot is here to assist you.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">
                        Key Features
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle className="flex items-center">
                                {feature.icon}
                                <span className="ml-2">{feature.title}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p>{feature.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4">
                        Technology Stack
                      </h2>
                      <Card>
                        <CardContent className="p-0">
                          <Tabs
                            defaultValue={techStacks[0].category}
                            className="flex"
                          >
                            <TabsList className="flex flex-col w-1/3 h-auto border-r">
                              {techStacks.map((stack) => (
                                <TabsTrigger
                                  key={stack.category}
                                  value={stack.category}
                                  className="justify-start px-4 py-2 text-left"
                                >
                                  {stack.category}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            <div className="w-2/3 p-4">
                              {techStacks.map((stack) => (
                                <TabsContent
                                  key={stack.category}
                                  value={stack.category}
                                >
                                  <div className="space-y-4">
                                    {stack.techs.map((tech) => (
                                      <div
                                        key={tech.name}
                                        className="flex items-start"
                                      >
                                        <div className="flex-shrink-0 w-6 h-6 mr-4 mt-1">
                                          <tech.icon className="w-full h-full" />
                                        </div>
                                        <div>
                                          <h3 className="text-lg font-semibold">
                                            {tech.name}
                                          </h3>
                                          <p className="text-muted-foreground">
                                            {tech.description}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </TabsContent>
                              ))}
                            </div>
                          </Tabs>
                        </CardContent>
                      </Card>
                    </section>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Chat />
    </>
  );
};

export default HomePage;
