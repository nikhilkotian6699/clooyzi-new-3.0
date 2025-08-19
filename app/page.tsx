"use client";

import {
  ArrowRight,
  Code,
  Shield,
  Bot,
  Smartphone,
  Globe,
  Database,
} from "lucide-react";
import {
  FaMobileAlt, // App Development
  FaGlobeAmericas, // Web Development
  FaShieldAlt, // Cyber Security
  FaRobot, // AI Bots
  FaVrCardboard, // VR/AR Services
  FaCube, // Blockchain
} from "react-icons/fa";

import Link from "next/link";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaThreads,
  FaYoutube,
} from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/service-card";
import TestimonialCard from "@/components/testimonial-card";
import WhatsAppButton from "@/components/whatsapp-button";
import ContactForm, { ContactFormRef } from "@/components/contact-form";
import { useRouter } from 'next/navigation'

interface Work {
  id: string;
  title: string;
  description: string;
  project_link: string;
  image_url?: string;
}
export default function Home() {
  const contactFormRef = useRef < ContactFormRef > (null);

  const handleClick = () => {
    contactFormRef.current?.scrollToFormAndFocus();
  };
  const router = useRouter()



  const [works, setWorks] = useState < Work[] > ([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    project_link: '',
  });
  const [image, setImage] = useState < File | null > (null);
  const [editingId, setEditingId] = useState < string | null > (null);

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
    <div className="flex min-h-screen flex-col">
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
              href="#services"
              className="text-sm font-medium hover:text-purple-700"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-purple-700"
            >
              About
            </Link>
            <Link href="/OurWorks" className="text-sm font-medium hover:text-purple-700">
              Our Works
            </Link>
            <Link href="/properties" className="text-sm font-medium hover:text-purple-700">
              Properties
            </Link>
            <Link
              href="#testimonials"
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b bg-gray-900 to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Innovative Tech Solutions for Your Business
                  </h1>
                  <p className="text-gray-400 max-w-[600px] text-muted-foreground md:text-xl">
                    We build cutting-edge software solutions that drive business
                    growth and digital transformation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    onClick={handleClick}
                    size="lg"
                    className="gap-1 font-bold text-black bg-violet-600 hover:bg-violet-500 transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/clooyzi.png?height=400&width=500"
                  alt="Hero Image"
                  className="rounded-lg object-cover"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Our Services
                </h2>
                <p className="text-gray-400 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive tech solutions tailored to your business needs
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <ServiceCard
                icon={<FaMobileAlt className="h-10 w-10 text-purple-500" />}
                title="App Development"
                description="Custom mobile applications for iOS and Android platforms that engage users and drive business growth."
              />
              <ServiceCard
                icon={<FaGlobeAmericas className="h-10 w-10 text-purple-500" />}
                title="Web Development"
                description="Responsive, user-friendly websites and web applications built with the latest technologies."
              />
              <ServiceCard
                icon={<FaShieldAlt className="h-10 w-10 text-purple-500" />}
                title="Cyber Security"
                description="Comprehensive security solutions to protect your digital assets and sensitive information."
              />
              <ServiceCard
                icon={<FaRobot className="h-10 w-10 text-purple-500" />}
                title="AI Bots"
                description="Intelligent chatbots and virtual assistants powered by advanced machine learning algorithms."
              />
              <ServiceCard
                icon={<FaVrCardboard className="h-10 w-10 text-purple-500" />}
                title="VR/AR Services"
                description="Immersive virtual and augmented reality experiences for training, marketing, and entertainment."
              />
              <ServiceCard
                icon={<FaCube className="h-10 w-10 text-purple-500" />}
                title="Blockchain Technology"
                description="Secure, transparent blockchain solutions for various industries including finance and supply chain."
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-gray-900 to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex justify-center">
                <img
                  src="/logo.png?height=400&width=500"
                  alt="About Us"
                  className="rounded-lg object-cover"
                  width={500}
                  height={400}
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    About Us
                  </h2>
                  <p className="text-gray-400 text-muted-foreground md:text-xl/relaxed">
                    Clooyzi is a leading software development company with a
                    passion for innovation and excellence. With over a decade of
                    experience, we've helped businesses of all sizes transform
                    their digital presence.
                  </p>
                </div>
                <ul className="text-white grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>
                      Expert team of developers, designers, and strategists
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Cutting-edge technologies and methodologies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>
                      Client-focused approach with personalized solutions
                    </span>
                  </li>
                </ul>
                <Button className="w-fit font-bold text-black bg-violet-600 hover:bg-violet-500 transition-all duration-300 transform hover:scale-105">
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Our Works */}
        <section id="works" className="py-16 px-6 md:px-16 bg-black text-center">
          <h2 className="text-3xl font-bold md:text-5xl mb-10 text-white">Our Works</h2>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {Array.isArray(works) && works.slice(0, 3).map((work) => {
              const projectUrl = /^https?:\/\//i.test(work.project_link)
                ? work.project_link
                : `https://${work.project_link}`;

              return (
                <div
                  key={work.id}
                  className="bg-gray-950 pb-6 rounded-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-gray-800 text-left"
                >
                  {work.image_url && (
                    <img
                      src={work.image_url}
                      alt={work.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="text-xl pl-6 font-semibold mb-2 text-purple-400">{work.title}</h3>
                  <p className="text-gray-300 pl-6 mb-4">{work.description}</p>
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
                </div>
              );
            })}
          </div>

          {/* View More Button */}
          <div className="mt-10">
            <Button
              onClick={() => router.push('/OurWorks')}
              className="bg-violet-600 hover:bg-violet-500 text-black font-bold px-4 py-2 rounded transition-all duration-300 transform hover:scale-105"
            >
              View All Works
            </Button>
          </div>
        </section>





        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What Our Clients Say
                </h2>
                <p className="text-gray-400 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it - hear from some of our
                  satisfied clients
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <TestimonialCard
                quote="Clooyzi transformed our business with their innovative app solution. The team was professional and delivered beyond our expectations."
                author="Sarah Johnson"
                company="FinTech Solutions"
                image="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="The cybersecurity services provided by Clooyzi have given us peace of mind. Their expertise in this field is unmatched."
                author="Michael Chen"
                company="Global Retail Inc."
                image="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="Working with Clooyzi on our VR training program was a game-changer. The immersive experience they created has improved our training efficiency by 200%."
                author="Emily Rodriguez"
                company="Education First"
                image="/placeholder.svg?height=100&width=100"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
                      <span className="text-sm text-white font-medium">Email</span>
                      <span className="text-sm text-gray-400 text-muted-foreground">clooyzi@gmail.com</span>
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
      </main>

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

      {/* Fixed WhatsApp Button */}
      <WhatsAppButton phoneNumber="9353472169" />
    </div>
  );
}