"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";

interface PropertyCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  imageUrl: string;
}

export default function PropertyCard({
  id,
  title,
  description,
  price,
  location,
  imageUrl,
}: PropertyCardProps) {
  return (
    <Card className="bg-gray-950 border border-gray-800 text-white flex flex-col h-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-purple-400">{title}</CardTitle>
        <CardDescription className="text-gray-400 flex items-center gap-1">
          <MapPin className="h-4 w-4 text-purple-500" />
          {location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 pt-0">
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex items-center gap-1 text-lg font-semibold text-green-400 mb-4">
          <DollarSign className="h-5 w-5" />
          {price}
        </div>
        <Link href={`/properties/${id}`} className="mt-auto">
          <Button variant="outline" className="bg-gray-900 border border-gray-800 w-full group text-white hover:bg-gray-800 transition-all duration-300">
            View Details
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}