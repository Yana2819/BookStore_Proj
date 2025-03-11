import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookOpen, Users, Calendar } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Book Orders",
      description: "Order any book from our vast catalog with quick delivery options.",
      icon: Book,
    },
    {
      title: "Reading Club",
      description: "Join our community of readers for monthly book discussions.",
      icon: Users,
    },
    {
      title: "Book Reviews",
      description: "Get expert reviews and recommendations for your next read.",
      icon: BookOpen,
    },
    {
      title: "Events",
      description: "Attend author meetings, book launches, and literary events.",
      icon: Calendar,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <service.icon className="h-6 w-6" />
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
