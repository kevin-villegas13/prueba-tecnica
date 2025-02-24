import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// Props del componente ContactOption
export type ContactOptionProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  buttonText: string;
};

export const ContactOption = ({
  icon: Icon,
  title,
  description,
  href,
  buttonText,
}: ContactOptionProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Link href={href}>
        <Button className="w-full bg-black text-white hover:bg-gray-900">
          {buttonText}
        </Button>
      </Link>
    </CardContent>
  </Card>
);
