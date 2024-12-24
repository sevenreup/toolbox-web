import { serviceGroups } from "@/config/services";
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
      <div className="mb-32 text-center lg:mb-0 lg:text-left flex flex-col gap-2 w-full">
        {serviceGroups.map((group) => (
          <div key={group.title} className="w-full">
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <div className="flex flex-row flex-wrap gap-2">
              {group.services.map((service) => (
                <a
                  href={service.url}
                  key={service.url}
                  className="w-full md:w-auto"
                >
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
          </div>
        ))}
      </div>
    </main>
  );
}

