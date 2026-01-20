import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { techIcons, arrowIcons, symbolIcons } from "@/types/editor";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface IconPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectIcon: (
    iconName: string,
    isColorful?: boolean,
    colorfulUrl?: string,
  ) => void;
}

const getIconComponent = (iconName: string): LucideIcon | null => {
  const pascalCaseName = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return (
    (LucideIcons as unknown as Record<string, LucideIcon>)[pascalCaseName] ||
    null
  );
};

// Colorful tech icons from CDN (SVG Repo and similar)
const colorfulIcons = [
  {
    name: "React",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Vue.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "Angular",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "Node.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "TypeScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Go",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  {
    name: "Rust",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  },
  {
    name: "Swift",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  {
    name: "Kotlin",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Docker",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Kubernetes",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "AWS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Google Cloud",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  {
    name: "Firebase",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "MongoDB",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Redis",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Git",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "VS Code",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    name: "Figma",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Tailwind",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Next.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Svelte",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  },
  {
    name: "GraphQL",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Sass",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  },
  {
    name: "Linux",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Apple",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
  },
  {
    name: "Android",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  },
  // Backend / Frameworks
  {
    name: "Express",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "NestJS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
  },
  {
    name: "Spring",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "Django",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },
  {
    name: "Flask",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },

  // Frontend / UI
  {
    name: "HTML5",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Bootstrap",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Material UI",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  },

  // Databases
  {
    name: "MySQL",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "SQLite",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  },
  {
    name: "Cassandra",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachecassandra/apachecassandra-original.svg",
  },
  {
    name: "DynamoDB",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },

  // DevOps / Cloud
  {
    name: "Azure",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    name: "Nginx",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  {
    name: "Jenkins",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  },
  {
    name: "Terraform",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  },

  // Testing
  {
    name: "Jest",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  },
  {
    name: "Cypress",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  },

  // Mobile
  {
    name: "React Native",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Flutter",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "Dart",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  },

  // Languages
  {
    name: "C",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "C++",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "C#",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "PHP",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  {
    name: "Ruby",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  },

  // Tools
  {
    name: "Webpack",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  },
  {
    name: "Vite",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "Babel",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
  },
  {
    name: "Postman",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
  {
    name: "Slack",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
  },
];

export const IconPicker: React.FC<IconPickerProps> = ({
  open,
  onOpenChange,
  onSelectIcon,
}) => {
  const [activeTab, setActiveTab] = useState("tech");

  const handleSelectIcon = (iconName: string) => {
    onSelectIcon(iconName);
    onOpenChange(false);
  };

  const handleSelectColorfulIcon = (name: string, url: string) => {
    onSelectIcon(name, true, url);
    onOpenChange(false);
  };

  const renderIconGrid = (icons: { name: string; icon: string }[]) => (
    <div className="grid grid-cols-4 gap-3">
      {icons.map((item) => {
        const IconComponent = getIconComponent(item.icon);
        if (!IconComponent) return null;

        return (
          <button
            key={item.icon}
            className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 gap-2"
            onClick={() => handleSelectIcon(item.icon)}
          >
            <IconComponent className="h-8 w-8 text-primary" />
            <span className="text-xs text-muted-foreground text-center truncate w-full">
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );

  const renderColorfulIconGrid = () => (
    <div className="grid grid-cols-4 gap-3">
      {colorfulIcons.map((item) => (
        <button
          key={item.name}
          className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 gap-2"
          onClick={() => handleSelectColorfulIcon(item.name, item.url)}
        >
          <img
            src={item.url}
            alt={item.name}
            className="h-8 w-8 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="text-xs text-muted-foreground text-center truncate w-full">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Icon or Symbol
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="colorful">Colorful</TabsTrigger>
            <TabsTrigger value="arrows">Arrows</TabsTrigger>
            <TabsTrigger value="symbols">Symbols</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[50vh] mt-4 pr-4">
            <TabsContent value="tech" className="mt-0">
              {renderIconGrid(techIcons)}
            </TabsContent>

            <TabsContent value="colorful" className="mt-0">
              {renderColorfulIconGrid()}
            </TabsContent>

            <TabsContent value="arrows" className="mt-0">
              {renderIconGrid(arrowIcons)}
            </TabsContent>

            <TabsContent value="symbols" className="mt-0">
              {renderIconGrid(symbolIcons)}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
