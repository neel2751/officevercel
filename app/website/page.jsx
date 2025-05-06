import {
  Book,
  Menu,
  Sunset,
  Trees,
  Zap,
  PhoneCall,
  MoveRight,
  MoveUpRight,
  MoveDownLeft,
  Check,
  Calendar,
  Target,
  Users,
  Binoculars,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const subMenuItemsOne = [
  {
    title: "Blog",
    description: "The latest industry news, updates, and info",
    icon: <Book className="size-5 shrink-0" />,
  },
  {
    title: "Compnay",
    description: "Our mission is to innovate and empower the world",
    icon: <Trees className="size-5 shrink-0" />,
  },
  {
    title: "Careers",
    description: "Browse job listing and discover our workspace",
    icon: <Sunset className="size-5 shrink-0" />,
  },
  {
    title: "Support",
    description:
      "Get in touch with our support team or visit our community forums",
    icon: <Zap className="size-5 shrink-0" />,
  },
];

const subMenuItemsTwo = [
  {
    title: "Help Center",
    description: "Get all the answers you need right here",
    icon: <Zap className="size-5 shrink-0" />,
  },
  {
    title: "Contact Us",
    description: "We are here to help you with any questions you have",
    icon: <Sunset className="size-5 shrink-0" />,
  },
  {
    title: "Status",
    description: "Check the current status of our services and APIs",
    icon: <Trees className="size-5 shrink-0" />,
  },
  {
    title: "Terms of Service",
    description: "Our terms and conditions for using our services",
    icon: <Book className="size-5 shrink-0" />,
  },
];

const Navbar1 = () => {
  return (
    <>
      <TaskManager />
      <section className="py-4">
        <div className="max-w-7xl mx-auto">
          <nav className="hidden justify-between lg:flex">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img
                  src="https://res.cloudinary.com/drcjzx0sw/image/upload/v1736432686/CDC_Logo_tm3exk.svg"
                  className="w-16"
                  alt="logo"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="#"
              >
                Home
              </Link>
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="#"
              >
                About us
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className="text-muted-foreground">
                    <NavigationMenuTrigger>
                      <span>Services</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-80 p-3">
                        {subMenuItemsOne.map((item, idx) => (
                          <NavigationMenuLink key={idx} asChild>
                            <li>
                              <Link
                                className={cn(
                                  "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                )}
                                href="#"
                              >
                                {item.icon}
                                <div>
                                  <div className="text-sm font-semibold">
                                    {item.title}
                                  </div>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="text-muted-foreground">
                    <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <HoverCard />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="#"
              >
                Team
              </Link>
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="#"
              >
                Blog
              </Link>
            </div>
            <div className="flex gap-2">
              <Button className="bg-rose-700">Contact Us</Button>
            </div>
          </nav>
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://shadcnblocks.com/images/block/block-1.svg"
                  className="w-8"
                  alt="logo"
                />
                <span className="text-xl font-bold">Shadcn Blocks</span>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <div className="flex items-center gap-2">
                        <img
                          src="https://shadcnblocks.com/images/block/block-1.svg"
                          className="w-8"
                          alt="logo"
                        />
                        <span className="text-xl font-bold">Shadcn Blocks</span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mb-8 mt-8 flex flex-col gap-4">
                    <a href="#" className="font-semibold">
                      Home
                    </a>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="products" className="border-b-0">
                        <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline">
                          Products
                        </AccordionTrigger>
                        <AccordionContent className="mt-2">
                          {subMenuItemsOne.map((item, idx) => (
                            <a
                              key={idx}
                              className={cn(
                                "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                              href="#"
                            >
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">
                                  {item.title}
                                </div>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="resources" className="border-b-0">
                        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
                          Resources
                        </AccordionTrigger>
                        <AccordionContent className="mt-2">
                          {subMenuItemsTwo.map((item, idx) => (
                            <a
                              key={idx}
                              className={cn(
                                "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                              href="#"
                            >
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">
                                  {item.title}
                                </div>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <a href="#" className="font-semibold">
                      Pricing
                    </a>
                    <a href="#" className="font-semibold">
                      Blog
                    </a>
                  </div>
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 justify-start">
                      <a
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#"
                      >
                        Press
                      </a>
                      <a
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#"
                      >
                        Contact
                      </a>
                      <a
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#"
                      >
                        Imprint
                      </a>
                      <a
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#"
                      >
                        Sitemap
                      </a>
                      <a
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#"
                      >
                        Legal
                      </a>
                      <a
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "justify-start text-muted-foreground"
                        )}
                        href="#"
                      >
                        Cookie Settings
                      </a>
                    </div>
                    <div className="mt-2 flex flex-col gap-3">
                      <Button variant="outline">Log in</Button>
                      <Button>Sign up</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <Hero />
        <Stats2 />
        <Feature />
        <VideoFeature />
        <WhyUs />
        <Services />
        <Projects />
        <FAQ />
        <Footer />
      </section>
    </>
  );
};

export default Navbar1;

const HoverCard = () => {
  return (
    <div className="w-screen p-3">
      <div className="space-y-6 lg:flex lg:space-x-8 lg:space-y-0 max-w-full">
        <div className="w-full shrink-0 lg:max-w-[18rem]">
          <a
            href="#"
            className="group relative flex h-full overflow-hidden rounded-lg bg-primary p-0 text-primary-foreground lg:rounded-xl"
          >
            <div className="relative z-10 flex w-full flex-col-reverse text-left lg:flex-col">
              <div className="relative flex aspect-[4/3] max-h-[18rem] w-full flex-1 justify-center">
                <img
                  src="https://shadcnblocks.com/images/block/placeholder-3.svg"
                  alt="placeholder"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative z-20 flex flex-col px-6 py-6">
                <div className="mt-auto flex items-center space-x-1 text-xs">
                  Incididunt
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
                    className="lucide lucide-arrow-right ml-1 size-4 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
                <p className="mt-2 text-xs">
                  Nostrud deserunt fugiat dolor Lorem pariatur et.
                </p>
              </div>
            </div>
          </a>
        </div>
        <div className="grid w-full gap-y-12 lg:gap-y-6">
          <div className="grid gap-y-2 lg:gap-y-6">
            <div className="border-border text-left lg:border-b lg:pb-3">
              <strong className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Qui Deserunt
              </strong>
            </div>
            <menu className="grid md:grid-cols-3 md:gap-x-6 lg:gap-y-6">
              <a
                href="#"
                className="group flex items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
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
                    className="lucide lucide-rocket size-5"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                    Dolore Laboris
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                    Commodo ea et enim mollit occaecat commodo duis .
                  </p>
                </div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
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
                    className="lucide lucide-building2 size-5"
                  >
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                    <path d="M10 6h4"></path>
                    <path d="M10 10h4"></path>
                    <path d="M10 14h4"></path>
                    <path d="M10 18h4"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                    Magna Cupidatat
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                    Incididunt fugiat deserunt laborum ex pariatur irure
                    occaecat.
                  </p>
                </div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
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
                    className="lucide lucide-earth size-5"
                  >
                    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path>
                    <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path>
                    <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                    Dolore Voluptate Dolore
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                    Duis sint culpa labore fugiat ipsum nisi.
                  </p>
                </div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </menu>
          </div>
          <div className="grid gap-y-2 lg:gap-y-6">
            <div className="border-border text-left lg:border-b lg:pb-3">
              <strong className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Quis Et Deserunt
              </strong>
            </div>
            <menu className="grid md:grid-cols-3 md:gap-x-6 lg:gap-y-6">
              <a
                href="#"
                className="group flex items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
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
                    className="lucide lucide-phone size-5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                    Culpa Voluptate
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                    Amet ullamco reprehenderit in elit.
                  </p>
                </div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
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
                    className="lucide lucide-gavel size-5"
                  >
                    <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"></path>
                    <path d="m16 16 6-6"></path>
                    <path d="m8 8 6-6"></path>
                    <path d="m9 7 8 8"></path>
                    <path d="m21 11-8-8"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                    Sit Labore
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                    Anim quis do et ullamco.
                  </p>
                </div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
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
                    className="lucide lucide-dollar-sign size-5"
                  >
                    <line x1="12" x2="12" y1="2" y2="22"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                    Irure Qui Lorem
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                    Sit ex consectetur et tempor.
                  </p>
                </div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
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
                    className="lucide lucide-computer size-5"
                  >
                    <rect width="14" height="8" x="5" y="2" rx="2"></rect>
                    <rect width="20" height="8" x="2" y="14" rx="2"></rect>
                    <path d="M6 18h2"></path>
                    <path d="M12 18h6"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                    Velit Minim
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                    Voluptate est pariatur deserunt ad ad voluptate laboris
                    tempor.
                  </p>
                </div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
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
                    className="lucide lucide-flag size-5"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" x2="4" y1="22" y2="15"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                    Culpa Proident
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                    Enim nostrud occaecat voluptate et cillum ipsum.
                  </p>
                </div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </menu>
          </div>
        </div>
      </div>
      {/* <div className="mt-8">
        <div className="mb-6 border-border pb-1 text-left lg:border-b">
          <strong className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Popular Locations
          </strong>
        </div>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-6 rounded-md border border-border p-6 lg:border-0 lg:p-0">
            <div className="text-left text-xs text-muted-foreground">
              Asia-Pacific
            </div>
            <menu className="grid gap-y-3 border-t border-border pt-6 lg:border-0 lg:pt-0">
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇨🇳
                </div>
                <div className="flex-1 text-sm font-medium">China</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇮🇳
                </div>
                <div className="flex-1 text-sm font-medium">India</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇯🇵
                </div>
                <div className="flex-1 text-sm font-medium">Japan</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇹🇭
                </div>
                <div className="flex-1 text-sm font-medium">Thailand</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </menu>
          </div>
          <div className="space-y-6 rounded-md border border-border p-6 lg:border-0 lg:p-0">
            <div className="text-left text-xs text-muted-foreground">
              Europe
            </div>
            <menu className="grid gap-y-3 border-t border-border pt-6 lg:border-0 lg:pt-0">
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇮🇹
                </div>
                <div className="flex-1 text-sm font-medium">Italy</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇩🇪
                </div>
                <div className="flex-1 text-sm font-medium">Germany</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇵🇱
                </div>
                <div className="flex-1 text-sm font-medium">Poland</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇬🇧
                </div>
                <div className="flex-1 text-sm font-medium">United Kingdom</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </menu>
          </div>
          <div className="space-y-6 rounded-md border border-border p-6 lg:border-0 lg:p-0">
            <div className="text-left text-xs text-muted-foreground">
              Americas
            </div>
            <menu className="grid gap-y-3 border-t border-border pt-6 lg:border-0 lg:pt-0">
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇧🇷
                </div>
                <div className="flex-1 text-sm font-medium">Brazil</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇨🇦
                </div>
                <div className="flex-1 text-sm font-medium">Canada</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇲🇽
                </div>
                <div className="flex-1 text-sm font-medium">Mexico</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇺🇸
                </div>
                <div className="flex-1 text-sm font-medium">United States</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </menu>
          </div>
          <div className="space-y-6 rounded-md border border-border p-6 lg:border-0 lg:p-0">
            <div className="text-left text-xs text-muted-foreground">
              Middle East/Africa
            </div>
            <menu className="grid gap-y-3 border-t border-border pt-6 lg:border-0 lg:pt-0">
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇸🇦
                </div>
                <div className="flex-1 text-sm font-medium">Egypt</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇳🇬
                </div>
                <div className="flex-1 text-sm font-medium">Nigeria</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇹🇷
                </div>
                <div className="flex-1 text-sm font-medium">Türkiye</div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                data-radix-collection-item=""
              >
                <div className="flex size-4 items-center justify-center">
                  🇦🇪
                </div>
                <div className="flex-1 text-sm font-medium">
                  United Arab Emirates
                </div>
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
                  className="lucide lucide-arrow-right size-4 transition-transform group-hover:translate-x-1 lg:hidden"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </menu>
          </div>
        </div>
      </div> */}
    </div>
  );
};

import { Badge } from "@/components/ui/badge";
import TaskManager from "./dash";

function Hero() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-medium">
                This is the start of something!
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Crafting architectural masterpieces that define skylines and
                transform communities, with unparalleled expertise and
                innovative solutions..
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-4 bg-rose-600">
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                className="gap-4 border-rose-600 text-rose-600 hover:bg-transparent hover:"
                variant="outline"
              >
                View Portfolio <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-muted rounded-md aspect-square ring-2 ring-rose-300">
              <img
                className="aspect-square object-cover rounded-md"
                src="https://cdc.construction/images/projects/Comm/3HX/1.jpg"
              />
            </div>
            <div className="bg-muted rounded-md row-span-2 ring-2 ring-blue-400 ">
              <img
                className="rounded-md row-span-2 object-cover h-full"
                src="https://interiorstudioltd.com/images/projects/Centro/5.jpg"
              />
            </div>
            <div className="bg-muted rounded-md aspect-square ring-2 ring-amber-400">
              <img
                className="aspect-square object-cover rounded-md"
                src="https://cdc.construction/images/projects/Comm/3HX/4.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid border rounded-lg py-8 grid-cols-1 gap-8 items-center lg:grid-cols-2 px-4">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">Services</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Something new!
                </h2>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                  Managing a small business today is already tough.
                </p>
              </div>
            </div>
            <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Easy to use</p>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ve made it easy to use and understand.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Fast and reliable</p>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ve made it fast and reliable.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Beautiful and modern</p>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ve made it beautiful and modern.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-muted rounded-md aspect-square"></div>
        </div>
      </div>
    </div>
  );
}

export const Services = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge>Services</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              Our Services
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground text-left">
              We offer a wide range of services to help you achieve your goals.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-muted-foreground text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-muted-foreground text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-muted-foreground text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-muted-foreground text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-muted-foreground text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-muted-foreground text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function FAQ() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  This is the start of something new
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                  Managing a small business today is already tough. Avoid
                  further complications by ditching outdated, tedious trade
                  methods. Our goal is to streamline SMB trade, making it easier
                  and faster than ever.
                </p>
              </div>
              <div className="">
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <AccordionItem key={index} value={"index-" + index}>
                <AccordionTrigger>
                  This is the start of something new
                </AccordionTrigger>
                <AccordionContent>
                  Managing a small business today is already tough. Avoid
                  further complications by ditching outdated, tedious trade
                  methods. Our goal is to streamline SMB trade, making it easier
                  and faster than ever.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export const WhyUs = () => (
  <section className="py-32">
    <div className="container mx-auto">
      <div className="mx-auto flex max-w-screen-md flex-col items-center gap-4">
        <div className="rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground flex items-center gap-1 px-2.5 py-1.5 text-sm">
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
            className="lucide lucide-medal h-auto w-4"
          >
            <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"></path>
            <path d="M11 12 5.12 2.2"></path>
            <path d="m13 12 5.88-9.8"></path>
            <path d="M8 7h8"></path>
            <circle cx="12" cy="17" r="5"></circle>
            <path d="M12 18v-2h-.5"></path>
          </svg>
          Highlights
        </div>
        <h2 className="text-center text-3xl font-semibold lg:text-4xl">
          Unlock Your Workflow Potential
        </h2>
        <p className="text-center text-muted-foreground lg:text-lg">
          Experience the benefits of streamlined processes, designed to enhance
          productivity and success.
        </p>
      </div>
      <div className="gap mt-14 grid gap-2.5 lg:grid-cols-3">
        <div className="flex flex-col gap-2.5">
          <div className="gap flex flex-col gap-3 rounded-lg border p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-12 items-center justify-center rounded-md bg-muted">
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
                  className="lucide lucide-target h-auto w-6"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </span>
              <h3 className="font-medium">Targeted Solutions</h3>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              Tailored features designed to tackle specific project challenges
              with precision.
            </p>
          </div>
          <div className="gap flex flex-col gap-3 rounded-lg border p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-12 items-center justify-center rounded-md bg-muted">
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
                  className="lucide lucide-panels-top-left h-auto w-6"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M3 9h18"></path>
                  <path d="M9 21V9"></path>
                </svg>
              </span>
              <h3 className="font-medium">Seamless Integration</h3>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              Effortlessly merge new technologies into existing systems to
              maintain performance.
            </p>
          </div>
          <div className="gap flex flex-col gap-3 rounded-lg border p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-12 items-center justify-center rounded-md bg-muted">
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
                  className="lucide lucide-chart-area h-auto w-6"
                >
                  <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                  <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"></path>
                </svg>
              </span>
              <h3 className="font-medium">Real-Time Data Insights</h3>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              Monitor data in real-time for better decision-making and faster
              adjustments.
            </p>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/drcjzx0sw/image/upload/v1736432686/CDC_Logo_tm3exk.svg"
          alt="placeholder"
          className="hidden h-20 object-center rounded-lg object-cover lg:block"
        />
        <div className="flex flex-col gap-2.5">
          <div className="gap flex flex-col gap-3 rounded-lg border p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-12 items-center justify-center rounded-md bg-muted">
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
                  className="lucide lucide-trending-up h-auto w-6"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              </span>
              <h3 className="font-medium">Strategic Growth</h3>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              Leverage strategic tools to scale your business and meet evolving
              market demands.
            </p>
          </div>
          <div className="gap flex flex-col gap-3 rounded-lg border p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-12 items-center justify-center rounded-md bg-muted">
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
                  className="lucide lucide-chart-no-axes-combined h-auto w-6"
                >
                  <path d="M12 16v5"></path>
                  <path d="M16 14v7"></path>
                  <path d="M20 10v11"></path>
                  <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"></path>
                  <path d="M4 18v3"></path>
                  <path d="M8 14v7"></path>
                </svg>
              </span>
              <h3 className="font-medium">Advanced Analytics</h3>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              Gain deeper insights through advanced analytics to stay ahead in
              decision-making.
            </p>
          </div>
          <div className="gap flex flex-col gap-3 rounded-lg border p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-12 items-center justify-center rounded-md bg-muted">
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
                  className="lucide lucide-monitor h-auto w-6"
                >
                  <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                  <line x1="8" x2="16" y1="21" y2="21"></line>
                  <line x1="12" x2="12" y1="17" y2="21"></line>
                </svg>
              </span>
              <h3 className="font-medium">Unified Control</h3>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              Centralize management and control all aspects of your workflow
              from one platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const Stats2 = () => (
  <div className="w-full py-14 lg:py-28 bg-blue-800">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge>Platform</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-xl md:text-3xl tracking-tighter lg:max-w-xl font-regular text-left text-white">
              This is the start of something new
            </h2>
            <p className="text-lg lg:max-w-sm leading-relaxed tracking-tight text-white/70 text-left">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-2">
            <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
              <MoveUpRight className="w-4 h-4 mb-10 text-green-500" />
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end text-secondary">
                500.000
                <span className="text-card text-sm tracking-normal">
                  +20.1%
                </span>
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-white/80 max-w-xl text-left">
                Monthly active users
              </p>
            </div>
            <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
              <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" />
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end text-secondary">
                20.105
                <span className="text-card text-sm tracking-normal">-2%</span>
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                Daily active users
              </p>
            </div>
            <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
              <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                $523.520
                <span className="text-muted-foreground text-sm tracking-normal">
                  +8%
                </span>
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                Monthly recurring revenue
              </p>
            </div>
            <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
              <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                $1052
                <span className="text-muted-foreground text-sm tracking-normal">
                  +2%
                </span>
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                Cost per acquisition
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Footer = () => (
  <section className="pt-10 border-t border-gray-100">
    <div className="container mx-auto">
      <footer>
        <div className="grid grid-cols-4 justify-between gap-10 lg:grid-cols-6 lg:text-left">
          <div className="col-span-4 flex w-full flex-col justify-between gap-6 lg:col-span-2">
            <div>
              <span className="flex items-center gap-4">
                <img
                  src="https://res.cloudinary.com/drcjzx0sw/image/upload/v1736432686/CDC_Logo_tm3exk.svg"
                  alt="logo"
                  className="h-8"
                />
              </span>
              <p className="mt-6 text-muted-foreground">
                A collection of 100+ responsive HTML templates for your startup
                business or side project.
              </p>
            </div>
            <ul className="flex items-center space-x-6">
              <li className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground">
                <a href="#">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className="size-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </a>
              </li>
              <li className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground">
                <a href="#">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="size-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                  </svg>
                </a>
              </li>
              <li className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground">
                <a href="#">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="size-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                  </svg>
                </a>
              </li>
              <li className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground">
                <a href="#">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className="size-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-5 font-medium">Product</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="font-medium hover:text-primary">
                <a href="#">Overview</a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">Pricing</a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">Marketplace</a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">Features</a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">Integrations</a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">Marketing</a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-5 font-medium">Company</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="font-medium hover:text-primary">
                <a href="#">About</a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">Team</a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">Blog</a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">Careers</a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2">
            <h3 className="mb-5 font-medium">Newsletter</h3>
            <div className="grid gap-1.5">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Subscribe to our newsletter
              </label>
              <div className="flex w-full items-center space-x-2">
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Email"
                />
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              By submitting, you agree to our
              <a href="#" className="ml-1 text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
          <p>
            <span className="mr-1 font-bold text-primary">CDC</span>©{" "}
            {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  </section>
);

export const VideoFeature = () => (
  <section className="py-32 bg-rose-700">
    <div className="container mx-auto">
      <div className="flex flex-col items-start gap-12">
        <div className="flex flex-col items-start gap-2.5">
          <div className="inline-flex items-start rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-card">
            Your path to success
          </div>
          <h2 className="text-center text-4xl md:text-5xl text-secondary">
            Get started with us
          </h2>
          <p className="text-center text-muted lg:text-left lg:text-lg max-w-screen-md">
            We offers dynamic tools for project management, helping teams work
            smarter and achieve success with ease. We focus on delivering
            user-friendly solutions that enhance collaboration and streamline
            operations.
          </p>
        </div>
        <video
          playsInline
          autoPlay
          loop
          muted
          className="h-96 w-full rounded-xl object-cover md:h-[500px] ring-8 ring-white"
        >
          <source
            src="https://cdc.construction/video/CDC.mp4"
            type="video/mp4"
          />
        </video>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Calendar className="w-6 h-auto text-muted" />
                <h3 className="text-center text-lg font-medium lg:text-left text-muted">
                  Why Select Us?
                </h3>
              </div>
              <p className="text-center text-sm text-muted md:text-base lg:text-left">
                We provide a full set of management tools, including ways to
                collaborate easily.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex flex-col items-center gap-2 lg:flex-row text-muted">
                <Target className="w-6 h-auto" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  Our Purpose
                </h3>
              </div>
              <p className="text-center text-sm text-muted md:text-base lg:text-left">
                Our goal is to simplify workflows and help teams achieve more
                with ease.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex flex-col items-center gap-2 lg:flex-row text-muted">
                <Users className="w-6 h-auto" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  About Us
                </h3>
              </div>
              <p className="text-center text-sm text-muted md:text-base lg:text-left">
                Our team is dedicated to offering high-quality solutions with
                passion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const Projects = () => (
  <section className="py-32">
    <div className="container mx-auto flex flex-col gap-6">
      <div className="mb-16 max-w-xl px-8 lg:px-0">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
          Our Projects
        </div>
        <h2 className="mb-3 mt-6 text-balance text-2xl font-medium md:text-4xl">
          Explore Our Projects
        </h2>
        <p>
          Our projects showcase our expertise and passion for creating
          innovative solutions.
        </p>
        <div className="mt-4">
          <Button className="bg-gradient-to-b from-rose-700 to-rose-800">
            <Binoculars className="w-6 h-auto" />
            View All Projects
          </Button>
        </div>
      </div>
      <div className="flex flex-col rounded-lg border border-border bg-accent p-8">
        <p className="mb-2 text-sm font-semibold md:text-base">
          Feature description
        </p>
        <p className="mb-8 text-sm text-muted-foreground md:text-base">
          Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet
          magna nec massa consectetur, id interdum ante congue. Nam leo elit,
          convallis luctus tincidunt et, ullamcorper sed justo.
        </p>
        <img
          src="https://shadcnblocks.com/images/block/placeholder-dark-8-wide.svg"
          alt="placeholder"
          className="rounded-md lg:mt-auto lg:w-full"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid-cols-2 gap-x-20 rounded-lg border border-border bg-accent p-6 md:grid md:p-8 lg:flex lg:flex-col">
          <div className="flex flex-col">
            <p className="mb-2 text-sm font-semibold md:text-base">
              Feature description
            </p>
            <p className="mb-8 text-sm text-muted-foreground md:text-base">
              Nam vitae molestie arcu. Quisque eu libero orci.
            </p>
          </div>
          <img
            src="https://shadcnblocks.com/images/block/placeholder-dark-1.svg"
            alt="placeholder"
            className="rounded-md lg:mt-auto lg:w-full"
          />
        </div>
        <div className="grid-cols-2 gap-x-20 rounded-lg border border-border bg-accent p-6 md:grid md:p-8 lg:flex lg:flex-col">
          <div className="flex flex-col">
            <p className="mb-2 text-sm font-semibold md:text-base">
              Feature description
            </p>
            <p className="mb-8 text-sm text-muted-foreground md:text-base">
              Nam vitae molestie arcu. Quisque eu libero orci.
            </p>
          </div>
          <img
            src="https://shadcnblocks.com/images/block/placeholder-dark-2.svg"
            alt="placeholder"
            className="rounded-md lg:mt-auto lg:w-full"
          />
        </div>
        <div className="grid-cols-2 gap-x-20 rounded-lg border border-border bg-accent p-6 md:grid md:p-8 lg:flex lg:flex-col">
          <div className="flex flex-col">
            <p className="mb-2 text-sm font-semibold md:text-base">
              Feature description
            </p>
            <p className="mb-8 text-sm text-muted-foreground md:text-base">
              Nam vitae molestie arcu. Quisque eu libero orci.
            </p>
          </div>
          <img
            src="https://shadcnblocks.com/images/block/placeholder-dark-3.svg"
            alt="placeholder"
            className="rounded-md lg:mt-auto lg:w-full"
          />
        </div>
      </div>
    </div>
  </section>
);
