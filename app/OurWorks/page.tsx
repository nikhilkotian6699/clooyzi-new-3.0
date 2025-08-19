'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Smartphone, Globe, Database, ArrowRight } from "lucide-react";
import { FaTwitter, FaLinkedin, FaInstagram, FaThreads, FaYoutube, } from "react-icons/fa6";
import Link from "next/link";
import ContactForm, { ContactFormRef } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface Work {
  id: string;
  title: string;
  description: string;
  project_link: string;
  image_url?: string;
}

export default function OurWorksSection() {
  const [works, setWorks] = useState < Work[] > ([]);

  const contactFormRef = useRef < ContactFormRef > (null);

  const handleClick = () => {
    contactFormRef.current?.scrollToFormAndFocus();
  };

  const fetchWorks = async () => {
    try {
      const res = await fetch('https://clooyzi.onrender.com/api/portfolio');
      const data = await res.json();
      setWorks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch works:", error);
      setWorks([]); // Set to empty array on error
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-gray-900 backdrop-blur-md border-b border-gray-800">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-purple-500 " />
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              Clooyzi
            </Link>
          </div>
          <nav className="hidden text-white md:flex items-center gap-6">
            <Link
              href={{ pathname: "/", hash: "services" }}
              className="text-sm font-medium hover:text-purple-700"
            >
              Services
            </Link>
            <Link
              href={{ pathname: "/", hash: "about" }}
              className="text-sm font-medium hover:text-purple-700"
            >
              About
            </Link>
            <Link href="#works" className="hover:text-purple-700">
              Our Works
            </Link>
            <Link href="/properties" className="text-sm font-medium hover:text-purple-700">
              Properties
            </Link>
            <Link
              href={{ pathname: "/", hash: "testimonials" }}
              className="text-sm font-medium hover:text-purple-700"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-purple-700"
            >
              Contact
            </Link>
          </nav>
          <Button
            onClick={handleClick}
            className="font-bold text-black bg-violet-600 hover:bg-violet-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Button>
        </div>
      </header>


      {/* Our Works */}
      <section className="bg-gray-900 py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold md:text-5xl mb-10 text-white">Our Works</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {Array.isArray(works) && works.map((work) => {
            const projectUrl = /^https?:\/\//i.test(work.project_link)
              ? work.project_link
              : `https://${work.project_link}`;

            return (
              <Card
                key={work.id}
                className="bg-gray-950 border border-gray-800 text-white flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <CardHeader>
                  {work.image_url && (
                    <img
                      src={work.image_url}
                      alt={work.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <CardTitle className="text-purple-400">{work.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <CardDescription className="text-gray-300 mb-4">{work.description}</CardDescription>
                  {work.project_link && (
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block ml-6 font-bold text-white border border-gray-800 bg-gray-900 hover:bg-gray-800 transition-all duration-300 px-6 py-2 rounded group"
                    >
                      Visit Project
                      <ArrowRight className="h-4 w-4 ml-2 inline-block transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contacts or Footer */}
      <section id="contact" className="bg-black to-muted py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white md:text-5xl">
                Get In Touch
              </h2>
              <p className="text-gray-400 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ready to start your next project? Contact us today for a free
                consultation.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2 mt-12">
            <div className="flex flex-col space-y-4">
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <Smartphone className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-medium">
                      Phone
                    </span>
                    <span className="text-sm text-gray-400 text-muted-foreground">
                      +91 93534 72169
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <Globe className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-medium">
                      Email
                    </span>
                    <span className="text-sm text-gray-400 text-muted-foreground">
                      clooyzi@gmail.com
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <Database className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-medium">
                      Address
                    </span>
                    <span className="text-sm text-gray-400 text-muted-foreground">
                      DK , Mangalore{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-black text-white p-6">
                <h3 className="text-xl font-bold">Office Hours</h3>
                <div className="mt-4 grid gap-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm ref={contactFormRef} />
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-6 md:py-8">
        <div className="mb-4 text-center lg:text-center md:text-center sm:text-center">
          <span className="block text-md text-gray-500 dark:text-gray-300 sm:inline">
            In partnership with
          </span>
          <a
            href="https://isarvait.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 sm:mt-0 sm:ml-2 inline-flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/isarva-logo.svg"
              alt="ISARVA INFOTECH PRIVATE LIMITED"
              className="h-6 w-auto object-contain"
            />
            <span className="text-sm font-semibold text-purple-400 dark:text-purple-400 hover:underline text-center sm:text-left">
              ISARVA INFOTECH PRIVATE LIMITED.
            </span>
          </a>
        </div>
        <div className="container flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              Clooyzi
            </span>
          </div>
          <p className="text-center text-sm text-gray-400 md:text-left">
            © 2025 Clooyzi. All rights reserved.
          </p>
          <div className="flex gap-4 text-purple-400">
            <Link
              href="https://x.com/clooyzi"
              className="hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/clooyzi"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/clooyzi_/"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.threads.net/@clooyzi_"
              className="hover:text-white transition-colors"
              aria-label="Threads"
            >
              <FaThreads className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.youtube.com/@rahuthecoder"
              className="hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}