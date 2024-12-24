import { allServices } from "@/config/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-8">
      <div className="mb-32 text-center lg:mb-0 lg:text-left flex flex-row flex-wrap gap-2">
        {allServices.map((service) => (
          <a href={service.url} key={service.url} className="w-full md:w-auto">
            <Card className="w-full md:w-auto hover:bg-muted">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </main>
  );
}

