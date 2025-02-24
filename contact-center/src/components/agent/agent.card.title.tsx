import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ReactNode } from "react";

type CardComponentProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function CardTitleAgentComponent({
  title,
  description,
  children,
}: CardComponentProps) {
  return (
    <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white shadow-lg rounded-xl p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
