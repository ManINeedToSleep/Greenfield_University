import React from "react";
import Link from "next/link";
import Image from "next/image";

interface QuickLink {
  imagePath: string;
  altText: string;
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
}

interface QuickLinksProps {
  links: QuickLink[];
}

export default function QuickLinks({ links }: QuickLinksProps) {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {links.map((link, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600"
          >
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={link.imagePath}
                alt={link.altText}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-4">{link.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{link.description}</p>
            <Link 
              href={link.linkHref}
              className="text-emerald-600 font-bold hover:underline"
            >
              {link.linkText} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
} 