"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Quote,
  Settings,
  Shield,
  ShieldCheck,
  Star,
  ThumbsUp,
  Trophy,
  Users,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Layout,
  CheckCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  return (
    <>
      <Hero />
      {/* <AboutHero /> */}
      {/* <VisionSection /> */}
      {/* <Stats />
      <Stats2 />
      <Services />
      <Projects />
      <Features />
      <ReviewsSection />
      <ImageBanner />
      <ContactUs />
      <Footer /> */}
      <NeelHeroSection />
      <NeelCTASection />
    </>
  );
};

export default page;

const Hero = () => (
  <div className="relative bg-white w-full overflow-x-hidden min-h-screen">
    {/* Decorative Background Elements */}

    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-slate-50 to-transparent" />

      <div className="absolute top-40 -left-48 w-96 h-96 bg-red-50 rounded-full filter blur-3xl opacity-30" />

      <div className="absolute top-20 -right-48 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-30" />
    </div>
    <div className="relative">
      {/* Hero Content */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column */}

          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4 md:space-y-6 flex flex-col items-center lg:items-start mt-20">
              <div className="space-y-2 w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.2] pb-1">
                  Building
                </h1>

                <div className="relative">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent leading-[1.2] tracking-tight pb-3">
                    Tomorrow's Legacy
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 pt-2">
                Crafting architectural masterpieces that define skylines and
                transform communities, with unparalleled expertise and
                innovative solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-5 rounded-full font-semibold text-base transition-all duration-300 hover:translate-y-1 hover:shadow-lg"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-slate-200 text-slate-900 hover:bg-slate-50 px-6 py-5 rounded-full font-semibold text-base transition-all duration-300 hover:translate-y-1"
              >
                View Portfolio
              </Button>
            </div>
            {/* Feature Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white shadow-lg shadow-slate-100 p-4 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-xl group">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="p-2 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors duration-300">
                    <Building2 className="h-5 w-5 text-red-600" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Sustainable Design
                    </h3>

                    <p className="text-xs text-slate-500">
                      Eco-friendly solutions
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg shadow-slate-100 p-4 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-xl group">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="p-2 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors duration-300">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Quality Assured
                    </h3>

                    <p className="text-xs text-slate-500">ISO 9001 certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}

          <div className="space-y-4 w-full max-w-2xl mx-auto lg:mx-0">
            {/* Main Project Showcase */}

            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover"
              >
                <source src="/showcase-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-center lg:text-left">
                <h3 className="text-lg md:text-xl font-bold mb-1 text-white">
                  The Pinnacle Tower
                </h3>

                <p className="text-sm text-slate-200">
                  Our latest architectural masterpiece in downtown
                </p>
              </div>
            </div>
            {/* Achievement Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 md:p-6 rounded-2xl text-white text-center lg:text-left">
                <Trophy className="h-6 w-6 text-red-500 mb-3 mx-auto lg:mx-0" />

                <h3 className="text-lg font-semibold mb-1">Best in Class</h3>

                <p className="text-xs text-slate-400">
                  Industry Recognition 2024
                </p>
              </div>

              <div className="bg-red-600 p-4 md:p-6 rounded-2xl text-white text-center lg:text-left">
                <Building2 className="h-6 w-6 text-white mb-3 mx-auto lg:mx-0" />

                <h3 className="text-lg font-semibold mb-1">150+ Projects</h3>

                <p className="text-xs text-red-100">Completed Successfully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
const Stats = () => (
  <section className="relative bg-white py-16 md:py-24 overflow-hidden">
    {/* Decorative Background Elements */}

    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-30" />

      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-red-50 rounded-full filter blur-3xl opacity-30" />
    </div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Header */}

      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="mb-6 inline-flex items-center rounded-full bg-red-600/10 px-6 py-2 text-red-600">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
          Excellence in Construction
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Building Excellence Since 2018
        </h2>

        <p className="text-slate-600 leading-relaxed">
          As a leading commercial office building contractor, we've established
          a reputation for delivering exceptional quality and innovative
          solutions that transform skylines and communities.
        </p>
      </div>

      {/* Stats Grid */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16">
        {/* Stat 1 */}

        <div className="text-center p-6 bg-white rounded-2xl shadow-lg shadow-slate-100 border border-slate-100 transition-all duration-300 hover:shadow-xl">
          <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
            150+
          </div>

          <p className="text-sm text-slate-600">Projects Completed</p>
        </div>

        {/* Stat 2 */}

        <div className="text-center p-6 bg-white rounded-2xl shadow-lg shadow-slate-100 border border-slate-100 transition-all duration-300 hover:shadow-xl">
          <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
            100%
          </div>

          <p className="text-sm text-slate-600">Client Satisfaction</p>
        </div>

        {/* Stat 3 */}

        <div className="text-center p-6 bg-white rounded-2xl shadow-lg shadow-slate-100 border border-slate-100 transition-all duration-300 hover:shadow-xl">
          <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
            250+
          </div>

          <p className="text-sm text-slate-600">Team Members</p>
        </div>

        {/* Stat 4 */}

        <div className="text-center p-6 bg-white rounded-2xl shadow-lg shadow-slate-100 border border-slate-100 transition-all duration-300 hover:shadow-xl">
          <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
            15+
          </div>

          <p className="text-sm text-slate-600">Industry Awards</p>
        </div>
      </div>

      {/* Features Grid */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Feature 1 */}

        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-100 border border-slate-100 transition-all duration-300 hover:shadow-xl group">
          <div className="p-3 bg-red-50 rounded-xl w-fit mb-4 group-hover:bg-red-100 transition-colors duration-300">
            <Building2 className="h-6 w-6 text-red-600" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Sustainable Design
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Implementing eco-friendly solutions and sustainable practices in
            every project.
          </p>
        </div>

        {/* Feature 2 */}

        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-100 border border-slate-100 transition-all duration-300 hover:shadow-xl group">
          <div className="p-3 bg-red-50 rounded-xl w-fit mb-4 group-hover:bg-red-100 transition-colors duration-300">
            <Shield className="h-6 w-6 text-red-600" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Quality Assured
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            ISO 9001 certified processes ensuring the highest quality standards.
          </p>
        </div>

        {/* Feature 3 */}

        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-100 border border-slate-100 transition-all duration-300 hover:shadow-xl group">
          <div className="p-3 bg-red-50 rounded-xl w-fit mb-4 group-hover:bg-red-100 transition-colors duration-300">
            <Settings className="h-6 w-6 text-red-600" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Advanced Technology
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Utilizing cutting-edge construction technology and methodologies.
          </p>
        </div>

        {/* Feature 4 */}

        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-100 border border-slate-100 transition-all duration-300 hover:shadow-xl group">
          <div className="p-3 bg-red-50 rounded-xl w-fit mb-4 group-hover:bg-red-100 transition-colors duration-300">
            <Award className="h-6 w-6 text-red-600" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Industry Leading
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Recognized excellence with multiple industry awards and
            certifications.
          </p>
        </div>
      </div>
    </div>
  </section>
);
const Stats2 = () => (
  <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
    {/* Background Decorative Elements */}

    <div className="absolute inset-0">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl" />

      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-red-50/50 rounded-full blur-3xl" />
    </div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Main Content Grid */}

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column - Image */}

        <div className="relative">
          <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/construction-planning.jpg"
              alt="Construction Planning"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Stats Card */}

          <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 md:p-6 max-w-[240px]">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-lg">
                <Users className="h-6 w-6 text-red-600" />
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900">98%</div>

                <div className="text-sm text-slate-600">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}

        <div>
          <div className="space-y-8">
            {/* Header */}

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Transforming dreams into reality with exceptional construction
              </h2>

              <p className="text-lg text-slate-600">
                We bring your visions to life through innovative design and
                meticulous execution.
              </p>
            </div>

            {/* Features List */}

            <div className="space-y-6">
              {/* Feature 1 */}

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <ClipboardCheck className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Proven Track Record
                  </h3>

                  <p className="text-slate-600">
                    Reduce time and effort on building modern look design with
                    CDC only.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <ShieldCheck className="h-6 w-6 text-red-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Quality Assurance
                  </h3>

                  <p className="text-slate-600">
                    Quality assurance (QA) in construction is the process of
                    ensuring that a project meets all the specified quality
                    standards.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="bg-green-50 p-3 rounded-xl">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Client-Centric Approach
                  </h3>

                  <p className="text-slate-600">
                    In the competitive world of construction, building strong
                    relationships with clients is crucial for success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const services = [
  {
    title: "Commercial (Fit-Out)",

    category: "Commercial Excellence",

    description:
      "Innovative designs to elevate your business environment gracefully.",

    imageUrl: "/images/commercial-fitout.jpg",

    href: "/services/commercial-fitout",
  },

  {
    title: "Extension",

    category: "Space Enhancement",

    description: "Expand living space with our expertly designed extension.",

    imageUrl: "/images/extension.jpg",

    href: "/services/extension",
  },

  {
    title: "Architectural Design",

    category: "Design Excellence",

    description:
      "Crafting visionary spaces that redefine luxury living through innovative architectural solutions and meticulous attention to detail.",

    imageUrl: "/images/architectural-design.jpg",

    href: "/Services/architectural-design",
  },

  {
    title: "Design and Build",

    category: "Integrated Solutions",

    description:
      "A seamless journey from concept to reality, where every detail is crafted to perfection under one unified vision.",

    imageUrl: "/images/design-build.jpg",

    href: "/Services/build-and-design",
  },

  {
    title: "Loft Conversions",

    category: "Space Innovation",

    description:
      "Transforming overlooked spaces into breathtaking living areas that maximize both functionality and aesthetic appeal.",

    imageUrl: "/images/loft-conversion.jpg",

    href: "/Services/loft-conversions",
  },

  {
    title: "Luxury Renovation",

    category: "Premium Transformation",

    description:
      "Elevating existing spaces with sophisticated design elements and premium materials for an unparalleled living experience.",

    imageUrl: "/images/renovation.jpg",

    href: "/Services/renovations",
  },

  {
    title: "Basement Conversions",

    category: "Underground Luxury",

    description:
      "Creating extraordinary subterranean spaces that blend seamlessly with your home while adding significant value.",

    imageUrl: "/images/basement.jpg",

    href: "/Services/basements",
  },

  {
    title: "New Build",

    category: "Bespoke Creation",

    description:
      "Bringing dreams to life through meticulously planned and expertly executed new build projects that set new standards.",

    imageUrl: "/images/new-build.jpg",

    href: "/Services/new-build",
  },
];
const Services = () => (
  <section className="relative z-10 bg-linear-to-b from-white via-gray-50 to-white py-24 sm:py-32">
    {/* Background Elements */}

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent" />

    <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
      {/* Header Section */}

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full bg-red-600/10 px-6 py-2 text-red-600">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
          Exceptional Services
        </div>

        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Crafting Excellence in
          <span className="relative ml-2 inline-block text-red-600">
            Construction
            <svg
              className="absolute -bottom-2 left-0 h-3 w-full"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 Q50,12 100,0"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl lg:text-2xl">
          Where vision meets craftsmanship, creating spaces that inspire and
          endure through generations.
        </p>
      </div>

      {/* Services Grid */}

      <div className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} index={index} />
        ))}
        <PortfolioShowcase />
      </div>

      {/* Bottom CTA */}

      <div className="mt-16 text-center sm:mt-20">
        <a
          href="/services"
          className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25"
        >
          View All Services
          <ArrowRight className="h-5 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>

    {/* Decorative Elements */}

    <div className="absolute -bottom-6 left-0 right-0 h-24 bg-linear-to-b from-transparent to-white" />

    <div className="absolute bottom-0 left-1/2 h-px w-1/2 bg-linear-to-r from-transparent via-red-600/20 to-transparent" />
  </section>
);
const ServiceCard = ({
  href,
  imageUrl,
  title,
  category,
  index,
  description,
}) => (
  <a href={href} className="group relative block">
    <div className="relative h-full overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-600/20">
      <div className="relative aspect-16/10 w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          loading={index < 3 ? "eager" : "lazy"}
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transition-transform duration-300 group-hover:translate-y-2 group-hover:opacity-0">
          <span className="mb-2 inline-block rounded-full bg-red-600/20 px-3 py-1 text-sm backdrop-blur-sm">
            {category}
          </span>
        </div>

        <div className="absolute right-4 md:right-6 top-4 md:top-6 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <span className="font-mono text-base md:text-lg font-medium text-red-600">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold leading-tight text-gray-900">
              {title}
            </h3>

            <p className="mt-3 text-sm md:text-base text-gray-600">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-red-600">
          <span className="text-sm font-semibold">Explore Service</span>

          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  </a>
);

const PortfolioShowcase = () => (
  <a href="/portfolio" className="group relative block">
    <div className="relative h-full overflow-hidden rounded-2xl bg-linear-to-br from-red-600 to-red-800">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#fff 2px, transparent 2px),
  
  linear-gradient(90deg, #fff 2px, transparent 2px)`,

            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative h-full p-6 md:p-8">
        <div className="absolute right-6 md:right-4 top-6 md:top-2 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
          <Layout className="h-6 w-6 md:h-10 md:w-10 text-white" />
        </div>

        <div className="absolute -bottom-4 -right-4 h-24 w-24 md:h-32 md:w-32 rounded-full bg-red-500/20 backdrop-blur-sm" />

        <div className="absolute -left-8 top-1/2 h-20 w-20 md:h-24 md:w-24 -translate-y-1/2 rounded-full bg-red-700/30 backdrop-blur-sm" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
              Featured Projects
            </span>

            <h3 className="mt-4 md:mt-6 text-2xl md:text-3xl font-bold text-white">
              View Our Portfolio
            </h3>

            <p className="mt-3 md:mt-4 max-w-md text-base md:text-lg text-red-50/90">
              Explore our showcase of completed projects and transformations
              that demonstrate our commitment to excellence.
            </p>
          </div>

          <div className="mt-6 md:mt-8">
            <div className="flex items-center gap-2 text-white">
              <span className="text-base md:text-lg font-semibold">
                Explore All Projects
              </span>

              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-red-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  </a>
);

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const projects = [
    {
      id: 1,

      title: "Harbour Exchange Square",

      category: "Commercial",

      location: "3rd Floor, Canary Wharf",

      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800",
    },

    {
      id: 2,

      title: "Centro Office Space",

      category: "Commercial",

      location: "Guildford",

      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800",
    },

    {
      id: 3,

      title: "Woodland House",

      category: "Commercial",

      location: "Northampton",

      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800",
    },

    {
      id: 4,

      title: "Bridge House",

      category: "Commercial",

      location: "Stratford",

      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800",
    },
  ];

  const totalPages = Math.ceil(projects.length / 3);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="relative z-10 bg-white py-24 sm:py-32">
      {/* Background Pattern */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-red-600/10 px-6 py-2 text-red-600">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
            Remarkable Projects
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Our Latest
            <span className="relative ml-2 inline-block text-red-600">
              Projects
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 Q50,12 100,0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
            Explore our extensive portfolio showcasing the breadth of our
            expertise, from iconic structures to sustainable solutions, all
            meticulously crafted to perfection.
          </p>
        </div>

        {/* Projects Grid */}

        <div className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {projects
            .slice(currentPage * 3, (currentPage + 1) * 3)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>

        {/* Navigation Controls */}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={prevPage}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-red-600 hover:bg-red-600"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    currentPage === idx
                      ? "bg-red-600"
                      : "bg-gray-200 hover:bg-red-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-red-600 hover:bg-red-600"
            >
              <ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Decorative Elements */}

      <div className="absolute bottom-0 left-1/2 h-px w-1/2 bg-linear-to-r from-transparent via-red-600/20 to-transparent" />
    </section>
  );
};

const ProjectCard = ({ project }) => (
  <div className="group relative h-[400px] w-full overflow-hidden rounded-3xl bg-gray-100">
    <div className="absolute inset-0">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-500 group-hover:-translate-y-2">
      <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm backdrop-blur-sm">
        {project.category}
      </span>

      <h3 className="text-2xl font-bold leading-tight">{project.title}</h3>

      <p className="mt-2 text-gray-300">{project.location}</p>

      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span>View Project</span>

        <ExternalLink className="h-4 w-4" />
      </div>
    </div>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),

      title: "Construction Professionals",

      category: "Expert Team",

      description:
        "Industry-leading professionals committed to delivering excellence in every project phase.",
    },

    {
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),

      title: "£10M Insurance Coverage",

      category: "Protection",

      description:
        "Comprehensive insurance coverage ensuring complete peace of mind throughout your project.",
    },

    {
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),

      title: "On-Time Completion",

      category: "Efficiency",

      description:
        "Strict adherence to project timelines with efficient project management systems.",
    },

    {
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),

      title: "10-Year Warranty",

      category: "Guarantee",

      description:
        "Extensive structural warranty providing long-term protection for your investment.",
    },

    {
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),

      title: "HSA Compliance",

      category: "Safety",

      description:
        "Full compliance with all health, safety, and environmental regulations.",
    },

    {
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
      ),

      title: "Client Satisfaction",

      category: "Service",

      description:
        "Dedicated to exceeding expectations with personalized service and support.",
    },
  ];
  return (
    <section className="relative z-10 bg-linear-to-b from-white via-gray-50 to-white py-24 sm:py-32">
      {/* Background Elements */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-red-600/10 px-4 py-1.5 text-red-600">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
            Why Choose Us
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-5xl">
            Building Trust Through
            <span className="relative ml-2 inline-block text-red-600">
              Excellence
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 Q50,12 100,0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-lg lg:text-xl">
            Delivering exceptional quality and reliability in every project we
            undertake.
          </p>
        </div>

        {/* Features Grid */}

        <div className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}

      <div className="absolute -bottom-6 left-0 right-0 h-24 bg-linear-to-b from-transparent to-white" />

      <div className="absolute bottom-0 left-1/2 h-px w-1/2 bg-linear-to-r from-transparent via-red-600/20 to-transparent" />
    </section>
  );
};
const FeatureCard = ({ title, description, icon: Icon, category, index }) => (
  <div className="group relative block">
    <div className="relative h-full overflow-hidden rounded-[2rem] bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative p-8 sm:p-10">
        <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6 text-red-600" strokeWidth={1.5} />
        </div>

        <div className="mb-6">
          <span className="mb-2 inline-block rounded-full bg-red-600/20 px-4 py-1 text-sm backdrop-blur-sm text-red-600">
            {category}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold leading-tight text-gray-900 sm:text-2xl">
              {title}
            </h3>

            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-red-600">
          <span className="text-sm font-semibold">Learn More</span>

          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  </div>
);

const reviews = [
  {
    id: 1,

    author: "Christopher S.",

    role: "Executive Director",

    date: "June 2023",

    rating: 5,

    text: "Sai and Narendra and the team were so helpful. I wish I had started my job with their architect who helped me sort out the mess that my original architect had left me in. And so it continued, they were always helpful, offering up creative solutions, going above and beyond and provided such a high quality of work. And fast too!",

    verified: true,
  },

  {
    id: 2,

    author: "Jimmy Flynn",

    role: "Chief Innovation Officer",

    date: "June 2023",

    rating: 5,

    text: "I am delighted to come across Creative Design and Construction after dreadful few months dealing with unprofessional construction company and architect! Andrew and Sadequl were working on my project of completely refurbishing my house, everything has been done with good quality and good value.",

    verified: true,
  },

  {
    id: 3,

    author: "Silviya Barrett",

    role: "Design Director",

    date: "June 2023",

    rating: 5,

    text: "Creative Design and Construction has just completed a complete renovation of our house in Dagenham over the past 3 months. We're very happy with the result, they did a great job - we have high standards and they delivered.",

    verified: true,
  },
];

const ReviewsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(reviews.length / 3);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };
  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-24 lg:py-32">
      {/* Decorative elements - with better mobile positioning */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -left-16 sm:-left-40 -top-16 sm:-top-40 h-48 sm:h-80 w-48 sm:w-80 rounded-full bg-red-500/5 blur-3xl"></div>

        <div className="absolute right-0 top-0 h-56 sm:h-96 w-56 sm:w-96 rounded-full bg-blue-500/5 blur-3xl"></div>

        <div className="absolute bottom-0 right-8 sm:right-20 h-40 sm:h-64 w-40 sm:w-64 rounded-full bg-red-500/5 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header section with improved mobile spacing */}

        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black md:text-5xl">
            Client Testimonials
          </h2>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
            Excellence Recognized by Industry Leaders
          </p>
        </div>

        {/* Reviews Grid - with improved mobile layout and touch targets */}

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="group relative touch-manipulation">
              {/* Gradient border with better mobile performance */}

              <div
                className="absolute -inset-[1px] rounded-2xl bg-linear-to-r from-red-500 via-blue-500 to-red-500 opacity-40
      
      blur-sm group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              ></div>

              <div className="relative flex h-full flex-col justify-between rounded-2xl bg-white p-4 sm:p-6 lg:p-8 shadow-xl">
                {/* Quote icon with better mobile sizing */}

                <Quote
                  className="absolute -top-3 -left-2 h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-500/20"
                  aria-hidden="true"
                />

                <div>
                  {/* Rating Stars with proper touch areas */}

                  <div className="flex items-center gap-0.5 sm:gap-1 mb-4 sm:mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 fill-blue-600 text-blue-600"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Review Text with improved readability */}

                  <p
                    className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-gray-700
      
      group-hover:text-gray-900 transition-colors duration-300"
                  >
                    {review.text}
                  </p>
                </div>

                {/* Author Info with better mobile layout */}

                <div className="mt-4 sm:mt-6 lg:mt-8 border-t border-gray-100 pt-4 sm:pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="min-w-0">
                      <h3
                        className="font-semibold text-gray-900 group-hover:text-red-600
      
      transition-colors duration-300 truncate"
                      >
                        {review.author}
                      </h3>

                      <p className="text-sm text-blue-600 truncate">
                        {review.role}
                      </p>

                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>

                    {review.verified && (
                      <span
                        className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1
      
      text-xs font-medium text-blue-700 ring-1 ring-blue-600/20"
                      >
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls with improved touch targets */}

        <div className="mt-8 sm:mt-12 lg:mt-16 flex justify-center gap-3 sm:gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="group rounded-full p-3 sm:p-4 bg-white shadow-lg hover:bg-gray-50
      
      transition-all duration-300 ring-1 ring-gray-200 disabled:opacity-50
      
      disabled:cursor-not-allowed touch-manipulation"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-blue-600" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="group rounded-full p-3 sm:p-4 bg-white shadow-lg hover:bg-gray-50
      
      transition-all duration-300 ring-1 ring-gray-200 disabled:opacity-50
      
      disabled:cursor-not-allowed touch-manipulation"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ContactUs = () => {
  const [activeField, setActiveField] = useState(null);

  const [isVisible, setIsVisible] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    phone: "",

    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },

      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9-+\s()]*$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));

    // Clear error when user starts typing

    if (errors) {
      setErrors((prev) => ({
        ...prev,

        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call

      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Message sent successfully!");

      // Reset form

      setFormData({
        name: "",

        email: "",

        phone: "",

        message: "",
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,

      title: "Visit Our Office",

      content: (
        <>
          595a Cranbrook Road
          <br />
          Ilford, IG2 6JZ
          <br />
          United Kingdom
        </>
      ),
    },

    {
      icon: Phone,

      title: "Call Us",

      content: (
        <a
          href="tel:020-8004-3327"
          className="mt-2 block text-base text-gray-300 transition-colors hover:text-white active:text-gray-400 touch-action-manipulation"
        >
          020-8004-3327
        </a>
      ),
    },

    {
      icon: Mail,

      title: "Email Us",

      content: (
        <a
          href="mailto:info@cdc.construction"
          className="mt-2 block text-base text-gray-300 transition-colors hover:text-white active:text-gray-400 touch-action-manipulation"
        >
          info@cdc.construction
        </a>
      ),
    },

    {
      icon: Clock,

      title: "Working Hours",

      content: (
        <>
          Monday - Friday: 9:00 AM - 6:00 PM
          <br />
          Saturday - Sunday: Closed
        </>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-gray-50 to-white py-8 sm:py-12 md:py-16 lg:py-24">
      {/* Mobile-optimized background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem]" />

        <div className="absolute -left-20 sm:left-0 top-0 -translate-x-1/2 translate-y-[-10%] transform">
          <div className="h-[20rem] w-[20rem] sm:h-[40rem] sm:w-[40rem] rounded-full bg-red-500/5 blur-3xl" />
        </div>

        <div className="absolute -right-20 sm:right-0 top-1/2 translate-x-1/2 transform">
          <div className="h-[20rem] w-[20rem] sm:h-[40rem] sm:w-[40rem] rounded-full bg-blue-500/5 blur-3xl" />
        </div>
      </div>

      <div
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Mobile-optimized header */}

        <div className="mx-auto max-w-2xl text-center animate-on-scroll">
          <div className="inline-flex items-center space-x-2">
            <span className="h-px w-6 sm:w-8 bg-linear-to-r from-red-500 to-red-600"></span>

            <span className="text-sm font-medium uppercase tracking-wider text-red-600">
              Contact Us
            </span>

            <span className="h-px w-6 sm:w-8 bg-linear-to-r from-red-600 to-red-500"></span>
          </div>

          <h2 className="mt-4 sm:mt-6 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent">
            Let's Build Something Amazing
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-gray-600">
            Transform your vision into reality with our expert team. We're here
            to bring your dreams to life.
          </p>
        </div>

        <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:gap-6 lg:gap-10 lg:grid-cols-2">
          {/* Mobile-optimized contact info */}

          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8 text-white shadow-2xl animate-on-scroll">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] opacity-40" />

            <div className="relative space-y-4 sm:space-y-6 lg:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  Get in Touch
                </h3>

                <p className="mt-2 text-sm sm:text-base text-gray-300">
                  Ready to start your project? We're here to help you every step
                  of the way.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start space-x-3 sm:space-x-4 rounded-xl sm:rounded-2xl bg-white/5 p-3 sm:p-4 transition-all hover:bg-white/10 active:bg-white/15"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                      <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {item.title}
                      </p>

                      <div className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-300">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile-optimized contact form */}

          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 lg:p-8 shadow-2xl ring-1 ring-gray-900/5 animate-on-scroll">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.03),transparent)]" />

            <form
              onSubmit={handleSubmit}
              className="relative space-y-4 sm:space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm sm:text-base font-medium transition-colors duration-200 ${
                    activeField === "name" ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setActiveField("name")}
                  onBlur={() => setActiveField(null)}
                  className="mt-1 block w-full min-h-[44px] sm:min-h-[48px] rounded-lg border-0 bg-gray-50 px-4 text-base sm:text-lg text-gray-900 ring-1 ring-inset ring-gray-200 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-red-600"
                  placeholder="John Doe"
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm sm:text-base font-medium transition-colors duration-200 ${
                    activeField === "email" ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField("email")}
                  onBlur={() => setActiveField(null)}
                  className="mt-1 block w-full min-h-[44px] sm:min-h-[48px] rounded-lg border-0 bg-gray-50 px-4 text-base sm:text-lg text-gray-900 ring-1 ring-inset ring-gray-200 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-red-600"
                  placeholder="john@example.com"
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className={`block text-sm sm:text-base font-medium transition-colors duration-200 ${
                    activeField === "phone" ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setActiveField("phone")}
                  onBlur={() => setActiveField(null)}
                  className="mt-1 block w-full min-h-[44px] sm:min-h-[48px] rounded-lg border-0 bg-gray-50 px-4 text-base sm:text-lg text-gray-900 ring-1 ring-inset ring-gray-200 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-red-600"
                  placeholder="020 1234 5678"
                />

                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm sm:text-base font-medium transition-colors duration-200 ${
                    activeField === "message" ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField("message")}
                  onBlur={() => setActiveField(null)}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-0 bg-gray-50 px-4 py-3 text-base sm:text-lg text-gray-900 ring-1 ring-inset ring-gray-200 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-red-600 resize-none"
                  placeholder="Tell us about your project..."
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full min-h-[44px] sm:min-h-[48px] overflow-hidden rounded-lg bg-linear-to-r from-red-600 to-red-500 px-4 sm:px-8 py-2.5 sm:py-4 text-base sm:text-lg text-white shadow-xl transition-all hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-70"
              >
                <span className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <span className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>

                      <span>Sending...</span>
                    </span>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");

  const [subscribeStatus, setSubscribeStatus] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    setSubscribeStatus("subscribed");

    setTimeout(() => setSubscribeStatus(""), 3000);

    setEmail("");
  };

  return (
    <footer className="relative bg-linear-to-b from-white to-gray-50">
      {/* Top Decorative Line */}

      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-gray-200 via-red-500 to-gray-200"></div>

      {/* Main Footer Content */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Company Information Column */}

          <div className="space-y-8">
            <div className="flex flex-col space-y-4">
              <img
                src="/images/logo.png"
                alt="CDC Construction"
                className="h-12 w-auto mb-6 filter drop-shadow-md"
              />

              <p className="text-sm text-gray-600 leading-relaxed">
                With over two decades of excellence in construction and
                development, we transform spaces into extraordinary environments
                that inspire and endure.
              </p>
            </div>

            {/* Contact Information */}

            <div className="space-y-4">
              <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:translate-x-1">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-gray-100">
                  <Phone className="h-4 w-4 text-red-500" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium">Call Us</p>

                  <a
                    href="tel:020-8004-3327"
                    className="text-sm text-gray-900 font-semibold hover:text-red-500"
                  >
                    020-8004-3327
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:translate-x-1">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-gray-100">
                  <Mail className="h-4 w-4 text-red-500" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium">Email Us</p>

                  <a
                    href="mailto:info@cdc.construction"
                    className="text-sm text-gray-900 font-semibold hover:text-red-500"
                  >
                    info@cdc.construction
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:translate-x-1">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-gray-100">
                  <MapPin className="h-4 w-4 text-red-500" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium">Visit Us</p>

                  <p className="text-sm text-gray-900 font-semibold">
                    595a Cranbrook Road,
                    <br />
                    Ilford, IG2 6JZ
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:translate-x-1">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-gray-100">
                  <Clock className="h-4 w-4 text-red-500" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Working Hours
                  </p>

                  <p className="text-sm text-gray-900 font-semibold">
                    Mon - Fri: 9:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Links */}

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 after:content-[''] after:block after:w-12 after:h-0.5 after:bg-red-500 after:mt-2">
              Company
            </h3>

            <ul className="space-y-3">
              {[
                "Home",

                "About Us",

                "Our Projects",

                "Meet the Team",

                "Careers",

                "Contact",

                "Sitemap",
              ].map((item) => (
                <li key={item} className="group">
                  <a
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 after:content-[''] after:block after:w-12 after:h-0.5 after:bg-red-500 after:mt-2">
              Our Services
            </h3>

            <ul className="space-y-3">
              {[
                "Architectural Design",

                "Design and Build",

                "Loft Conversions",

                "Luxury Renovation",

                "Basement Conversions",

                "New Build Projects",

                "Home Extension",

                "Commercial Fit-Out",
              ].map((service) => (
                <li key={service} className="group">
                  <a
                    href={`/services/${service
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Certifications */}

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 after:content-[''] after:block after:w-12 after:h-0.5 after:bg-red-500 after:mt-2">
                Newsletter
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>

              <form onSubmit={handleSubscribe} className="relative">
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Subscribe</span>

                    {subscribeStatus === "subscribed" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Certifications */}

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 after:content-[''] after:block after:w-12 after:h-0.5 after:bg-red-500 after:mt-2">
                Certifications
              </h3>

              <div className="flex flex-wrap gap-4">
                <img
                  src="/images/master.png"
                  alt="Master Builders"
                  className="h-16 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                />

                <img
                  src="/images/trustmark.png"
                  alt="Trustmark"
                  className="h-16 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex space-x-6 text-sm">
                <a
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Terms
                </a>

                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Privacy
                </a>

                <a
                  href="/cookie"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Cookies
                </a>
              </div>
            </div>

            {/* Social Links */}

            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },

                { icon: Instagram, href: "#" },

                { icon: Youtube, href: "#" },

                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-200"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}

          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} CDC Construction. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// About Section Start

const AboutHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleStartProject = () => {
    document
      .getElementById("contact-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewPortfolio = () => {
    document
      .getElementById("projects-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Decorative Elements */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-screen bg-linear-to-l from-gray-50 to-transparent" />

        <div className="absolute bottom-0 left-0 w-1/2 h-screen bg-linear-to-t from-gray-50 to-transparent opacity-50" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}

        <div className="pt-8 sm:pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900 hover:bg-black rounded-full transform transition-all duration-300 hover:scale-105">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E12D2D]" />

            <span className="text-sm font-medium text-white">About Us</span>
          </div>
        </div>

        {/* Main Content */}

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center py-12 sm:py-16 lg:py-20">
          {/* Left Content */}

          <div className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Solid foundations for a{" "}
                <span className="text-[#E12D2D] inline-block transform hover:scale-105 transition-transform duration-300">
                  brighter future
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                We are more than just a construction company. We understand that
                every project is unique, and we work closely with our clients to
                develop a customized plan that meets their specific goals and
                budget.
              </p>
            </div>

            {/* CTA Buttons */}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartProject}
                className="group h-12 px-6 bg-gray-900 hover:bg-black text-white rounded-full transition-all duration-300
    
    transform hover:scale-105 active:scale-95 hover:shadow-lg"
              >
                <span>Start Your Project</span>

                <ArrowRight className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                onClick={handleViewPortfolio}
                variant="outline"
                className="h-12 px-6 border-2 border-gray-900 text-gray-900 rounded-full
    
    hover:bg-gray-900 hover:text-white transition-all duration-300
    
    transform hover:scale-105 active:scale-95 hover:shadow-lg"
              >
                View Portfolio
              </Button>
            </div>
          </div>

          {/* Right Image */}

          <div className="relative lg:h-[600px] h-[400px] sm:h-[500px]">
            <div
              className="relative h-full w-full rounded-2xl overflow-hidden transform transition-all duration-500 ease-in-out
    
    hover:shadow-2xl group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-black/5 via-transparent to-black/20
    
    group-hover:opacity-50 transition-opacity duration-500"
              />

              <img
                src="/construction-site.jpg"
                alt="Modern Construction Site"
                className={`w-full h-full object-cover transition-transform duration-700 ease-in-out
    
    ${isHovered ? "scale-110" : "scale-100"}`}
              />

              <div
                className={`absolute inset-0 bg-black/20 transition-opacity duration-500
    
    ${isHovered ? "opacity-100" : "opacity-0"}`}
              />
            </div>

            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#E12D2D]/10 rounded-full blur-2xl" />

            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-100 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-white to-transparent" />
    </section>
  );
};

const visionFeatures = [
  {
    icon: Building2,

    title: "High quality Co-Living spaces",

    description:
      "Our fully furnished spaces are designed and purpose-built with Co-Living in mind, featuring high-end finishes and amenities that go far beyond traditional apartment buildings.",
  },

  {
    icon: Users,

    title: "Fostering vibrant communities",

    description:
      "Our passion is bringing people together. Beyond creating beautiful spaces, we provide shared experiences.",
  },

  {
    icon: ThumbsUp,

    title: "Simple and all-inclusive",

    description:
      "We worry about the details so that our residents don't have to. From our online application process to simple, all-inclusive billing we aim to make the living experience as effortless as possible.",
  },
];

const VisionSection = () => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),

      { threshold: 0.1 }
    );

    const section = document.getElementById("vision-section");

    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="vision-section"
      className="relative py-12 sm:py-16 lg:py-24 bg-white overflow-hidden"
    >
      {/* Subtle Background Pattern */}

      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.08]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}

        <div
          className={`max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000
  
  ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 sm:mb-6">
            Our vision
          </h2>

          <p className="text-base sm:text-lg text-black/70 leading-relaxed px-4 sm:px-0">
            For as long as there have been cities, the public square has been a
            fundamental part of the urban landscape - an open, approachable
            space to meet and engage with friends and neighbours. Space aims to
            capture this spirit of bringing people together in an exciting,
            welcoming environment.
          </p>
        </div>

        {/* Features Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {visionFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col items-start h-full p-4 sm:p-6">
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-red-50">
                  <feature.icon
                    className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-4">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-black/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const ImageBanner = () => (
  <section className="relative w-full overflow-hidden px-20">
    {/* Background Image */}

    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
        alt="Modern architecture"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}

      <div className="absolute inset-0 bg-linear-to-r from-rose-900/95 via-rose-900/85 to-rose-800/95" />
    </div>

    {/* Content Section */}

    <div className="relative min-h-[200px] py-20">
      {/* Floating Circles */}

      <div className="absolute top-4 left-8">
        <div className="w-24 h-24 rounded-full bg-[#7FD1E3] bg-opacity-90 backdrop-blur-sm animate-float">
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              className="text-[#0A2518]"
            >
              <path
                fill="currentColor"
                d="M15 4h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm-8 8h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm8 0h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zM7 4h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute top-8 right-12">
        <div className="w-20 h-20 rounded-full bg-[#FFB17A] bg-opacity-90 backdrop-blur-sm animate-float-delayed">
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-[#0A2518]"
            >
              <path
                fill="currentColor"
                d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-11v5h4v2h-6V9h2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-24">
        <div className="w-28 h-28 rounded-full bg-[#98E2C6] bg-opacity-90 backdrop-blur-sm animate-float-more-delayed">
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              className="text-[#0A2518]"
            >
              <path
                fill="currentColor"
                d="M13.5 2a7.5 7.5 0 0 1 7.5 7.5v6a7.5 7.5 0 0 1-7.5 7.5h-3a7.5 7.5 0 0 1-7.5-7.5v-6A7.5 7.5 0 0 1 10.5 2h3zm-3 3a4.5 4.5 0 0 0-4.5 4.5v6a4.5 4.5 0 0 0 4.5 4.5h3a4.5 4.5 0 0 0 4.5-4.5v-6A4.5 4.5 0 0 0 13.5 5h-3z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="relative container mx-auto px-6 max-w-6xl h-full flex items-center">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Transform your vision into reality with our help.
          </h2>

          <p className="text-lg text-gray-200 leading-relaxed">
            Ready to turn your vision into solid ground? We're more than
            builders, we're partners. Let's collaborate, innovate, and craft a
            space that exceeds your wildest dreams.
          </p>

          <div className="pt-4">
            <button className="group relative inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
              <span className="relative z-10 flex items-center font-medium">
                Get a free quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const NeelHeroSection = () => (
  <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border">
    <div className="theme-zinc w-full">
      <div className="preview flex min-h-[350px] w-full justify-center p-2 sm:p-10 items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:border-r py-10 relative group/feature lg:border-l lg:border-b dark:border-neutral-800">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"></div>
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-terminal-2"
              >
                <path d="M8 9l3 3l-3 3"></path>
                <path d="M13 15l3 0"></path>
                <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
              </svg>
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"></div>
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                Built for developers
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
              Built for engineers, developers, dreamers, thinkers and doers.
            </p>
          </div>
          <div className="flex flex-col lg:border-r py-10 relative group/feature lg:border-b dark:border-neutral-800">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"></div>
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-ease-in-out"
              >
                <path d="M3 20c8 0 10 -16 18 -16"></path>
              </svg>
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"></div>
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                Ease of use
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
              It's as easy as using an Apple, and as expensive as buying one.
            </p>
          </div>
          <div className="flex flex-col lg:border-r py-10 relative group/feature lg:border-b dark:border-neutral-800">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"></div>
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-currency-dollar"
              >
                <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path>
                <path d="M12 3v3m0 12v3"></path>
              </svg>
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"></div>
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                Pricing like no other
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
              Our prices are best in the market. No cap, no lock, no credit card
              required.
            </p>
          </div>
          <div className="flex flex-col lg:border-r py-10 relative group/feature lg:border-b dark:border-neutral-800">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"></div>
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-cloud"
              >
                <path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878"></path>
              </svg>
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"></div>
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                100% Uptime guarantee
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
              We just cannot be taken down by anyone.
            </p>
          </div>
          <div className="flex flex-col lg:border-r py-10 relative group/feature lg:border-l dark:border-neutral-800">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"></div>
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-route-alt-left"
              >
                <path d="M8 3h-5v5"></path>
                <path d="M16 3h5v5"></path>
                <path d="M3 3l7.536 7.536a5 5 0 0 1 1.464 3.534v6.93"></path>
                <path d="M18 6.01v-.01"></path>
                <path d="M16 8.02v-.01"></path>
                <path d="M14 10v.01"></path>
              </svg>
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"></div>
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                Multi-tenant Architecture
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
              You can simply share passwords instead of buying new seats
            </p>
          </div>
          <div className="flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"></div>
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-help"
              >
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M12 17l0 .01"></path>
                <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"></path>
              </svg>
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"></div>
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                24/7 Customer Support
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
              We are available a 100% of the time. Atleast our AI Agents are.
            </p>
          </div>
          <div className="flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"></div>
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-adjustments-bolt"
              >
                <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                <path d="M6 4v4"></path>
                <path d="M6 12v8"></path>
                <path d="M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                <path d="M12 4v10"></path>
                <path d="M19 16l-2 3h4l-2 3"></path>
                <path d="M12 18v2"></path>
                <path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                <path d="M18 4v1"></path>
                <path d="M18 9v3"></path>
              </svg>
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"></div>
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                Money back guarantee
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
              If you donot like EveryAI, we will convince you to like us.
            </p>
          </div>
          <div className="flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"></div>
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-heart"
              >
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
              </svg>
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"></div>
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                And everything else
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
              I just ran out of copy ideas. Accept my sincere apologies
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NeelCTASection = () => (
  <section className="relative z-20 mx-auto my-20 grid w-full max-w-7xl grid-cols-1 justify-start bg-linear-to-br from-gray-100 to-white dark:from-neutral-900 dark:to-neutral-950 md:my-40 md:grid-cols-3 border-dashed border">
    <div className="p-8 md:col-span-2 md:p-14">
      <h2 className="text-left text-xl font-medium tracking-tight text-neutral-500 dark:text-neutral-200 md:text-3xl">
        Want a professional, extraordinary&nbsp;
        <span className="text-neutral-700 font-semibold text-pretty">
          Software
        </span>{" "}
        tailored to your needs? &nbsp;
        <span className="font-bold text-indigo-700">Get in touch</span>
      </h2>
      <p className="mt-4 max-w-lg text-left text-base font-medium tracking-tight text-neutral-500 dark:text-neutral-200 md:text-base">
        We've helped thousands of{" "}
        <span className="text-sky-700">founders and teams</span> build their
        products and apps from scratch, and we can help you too.
      </p>
      <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-4">
        <div className="mt-6 flex justify-center">
          <a className="no-underline flex space-x-2 group cursor-pointer transition duration-200 p-px font-semibold px-4 py-2 w-full sm:w-44 h-10 rounded-lg text-sm text-center items-center justify-center relative z-20 bg-black dark:bg-white dark:text-black text-white rotate-[1deg] hover:rotate-0">
            Talk to us
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-dashed p-8 md:border-l md:border-t-0 md:p-14">
      <p className="text-base text-neutral-700 dark:text-neutral-200">
        Manu literally took our requirements and quite literally ran with them.
        To anyone reading this - I can't recommend Manu enough, your job will be
        done exceptionally well, and you will be delighted with the end result.
      </p>
      <div className="mt-4 flex flex-col items-start gap-1 text-sm">
        <p className="font-bold text-neutral-800 dark:text-neutral-200">
          Neel Patel
        </p>
        <p className="text-neutral-500 dark:text-neutral-400">
          Founder - Webmints, UK.
        </p>
      </div>
    </div>
  </section>
);
