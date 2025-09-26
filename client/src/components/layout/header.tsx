import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback } from "../ui/avatar"; // Removed AvatarImage
import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  LanguagesIcon,
  Bell,
  Search as SearchIcon,
  Menu,
  X,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import api from "../../utils/api";
import { getLoggedInUser, logout } from "../../utils/auth"; // Import auth helpers

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count
  const [user, setUser] = useState<{ fullName: string } | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch user data using auth helper
  useEffect(() => {
    const user = getLoggedInUser();
    setUser(user);
  }, []);

  // Handle outside click/touch to close search bar
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        headerRef.current &&
        searchRef.current &&
        !headerRef.current.contains(event.target as Node) &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const servicesItems = [
    {
      href: "/booking",
      text: "Booking",
      description: "Book a hotel room easily and quickly.",
    },
    {
      href: "/hotels",
      text: "Hotels",
      description: "Explore our wide range of hotels.",
    },
    {
      href: "/contact",
      text: "Contact",
      description: "Get in touch with our support team.",
    },
  ];

  const categoriesItems = [
    {
      href: "/hotels",
      text: "Hotels",
      description: "Explore our wide range of hotels.",
    },
    {
      href: "/resorts",
      text: "Resorts",
      description: "Discover our luxurious resorts for a relaxing stay.",
    },
    {
      href: "/lounges",
      text: "Lounges",
      description: "Experience our comfortable lounges for leisure and work.",
    },
  ];

  const languages = [
    { href: "#", text: "English", code: "en" },
    { href: "#", text: "Amharic", code: "am" },
  ];

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    setIsMobileMenuOpen(false);
  };

  // Generate breadcrumbs based on current path
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment, index) => ({
      href: `/${location.pathname
        .split("/")
        .slice(1, index + 2)
        .join("/")}`,
      text: segment.charAt(0).toUpperCase() + segment.slice(1),
    }));

  // Get initials for avatar fallback
  const getInitials = (fullName: string) => {
    if (!fullName) return "";
    const names = fullName.trim().split(" ");
    const initials = names
      .map((name) => name.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2); // Limit to 2 initials
    return initials || "";
  };

  return (
    <>
      <nav
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300 w-full",
          "bg-background/95 backdrop-blur-sm border-border text-foreground",
          "supports-[backdrop-filter]:bg-background/60"
        )}
        style={{ isolation: "isolate", boxSizing: "border-box" }}
      >
        <div className="px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between max-w-7xl mx-auto min-h-[60px]">
          <div className="flex items-center gap-4">
            <Link to="/home" className="flex items-center">
              <img
                src="/assets/logo.png"
                alt="logo"
                className="w-20 sm:w-24 md:w-28 h-auto transition-transform hover:scale-105 animate-fade-in"
              />
            </Link>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/home">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => (
                  <div key={segment.href} className="flex items-center">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={segment.href}>{segment.text}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-6">
                <NavigationMenuItem>
                  <Link to="/home">
                    <NavigationMenuLink asChild>
                      <div
                        className={cn(
                          "text-base font-medium transition-colors hover:text-muted-foreground animate-slide-in-from-top"
                        )}
                      >
                        Home
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <DropdownMenuNav
                  title="Services"
                  description="Discover our services"
                  items={servicesItems}
                />
                <DropdownMenuNav
                  title="Categories"
                  description="Explore various categories of our services"
                  items={categoriesItems}
                />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    className={cn(
                      "rounded-full w-10 h-10 hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <SearchIcon className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full w-10 h-10 hover:bg-accent hover:text-accent-foreground relative"
                    )}
                  >
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
                      >
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
              {user ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "rounded-full w-10 h-10 hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {getInitials(user.fullName)}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-popover text-popover-foreground">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="hover:bg-accent hover:text-accent-foreground"
                          onClick={() => navigate("/profile")}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-accent hover:text-accent-foreground"
                          onClick={() => navigate("/settings")}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="hover:bg-accent hover:text-accent-foreground"
                          onClick={() => {
                            logout();
                            setUser(null);
                            navigate("/logout");
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent>Account</TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  className={cn(
                    "px-4 sm:px-6 py-2 rounded-full font-medium transition-colors text-sm sm:text-base",
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={() => navigate("/auth")}
                >
                  Sign Up
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "p-2 rounded-full flex items-center gap-2 text-sm sm:text-base font-medium",
                      "hover:bg-accent hover:text-accent-foreground text-foreground"
                    )}
                  >
                    <LanguagesIcon className="w-5 h-5" />
                    <span>{selectedLanguage.toUpperCase()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[150px] bg-popover text-popover-foreground">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      className="hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      {lang.text}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-10 h-10 text-foreground hover:bg-accent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {isSearchOpen && (
          <div
            ref={searchRef}
            className="px-4 sm:px-6 md:px-8 py-3 bg-background/95 backdrop-blur-sm border-b border-border"
          >
            <Command className="rounded-md border border-input bg-popover">
              <CommandInput placeholder="Search hotels, resorts, or services..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Link
                      to="/hotels"
                      className="w-full"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      Hotels
                    </Link>
                  </CommandItem>
                  <CommandItem>
                    <Link
                      to="/resorts"
                      className="w-full"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      Resorts
                    </Link>
                  </CommandItem>
                  <CommandItem>
                    <Link
                      to="/booking"
                      className="w-full"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      Booking
                    </Link>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </nav>

      {isMobileMenuOpen && (
        <div
          className={cn(
            "lg:hidden p-6 border-t w-full transition-all duration-300 ease-in-out",
            "bg-background/95 backdrop-blur-sm border-border text-foreground animate-slide-in-from-top"
          )}
        >
          <div className="flex flex-col gap-4">
            <Link
              to="/home"
              className={cn(
                "block py-2 text-base font-medium hover:text-muted-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <DropdownMenuMobile
              title="Services"
              description="Discover our services"
              items={servicesItems}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
            <DropdownMenuMobile
              title="Categories"
              description="Explore various categories of our services"
              items={categoriesItems}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="mt-4 flex flex-col gap-4">
              <Input
                placeholder="Search..."
                className="bg-muted text-foreground"
                onFocus={() => setIsSearchOpen(true)}
              />
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 hover:bg-accent hover:text-accent-foreground"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {getInitials(user.fullName)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-popover text-popover-foreground">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="hover:bg-accent hover:text-accent-foreground"
                      onClick={() => navigate("/profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-accent hover:text-accent-foreground"
                      onClick={() => navigate("/settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        logout();
                        setUser(null);
                        navigate("/logout");
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  className={cn(
                    "w-full py-2 rounded-full font-medium transition-colors text-base",
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={() => {
                    navigate("/auth");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              )}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 hover:bg-accent hover:text-accent-foreground relative"
                >
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "p-2 rounded-full flex items-center gap-2 text-base font-medium",
                        "hover:bg-accent hover:text-accent-foreground text-foreground"
                      )}
                    >
                      <LanguagesIcon className="w-5 h-5" />
                      <span>{selectedLanguage.toUpperCase()}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[150px] bg-popover text-popover-foreground">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        className="hover:bg-accent hover:text-accent-foreground"
                        onClick={() => handleLanguageSelect(lang.code)}
                      >
                        {lang.text}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DropdownMenuNav({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: { href: string; text: string; description: string }[];
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "text-base font-medium hover:text-muted-foreground animate-slide-in-from-top"
        )}
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className={cn(
            "grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4 rounded-md shadow-lg",
            "bg-popover text-popover-foreground"
          )}
        >
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
                className={cn(
                  "flex h-full w-full flex-col justify-end rounded-md p-6 no-underline select-none transition",
                  "bg-gradient-to-b from-muted/50 to-muted hover:shadow-md animate-fade-in"
                )}
                href="#"
              >
                <div className="mt-2 mb-1 text-base font-medium">{title}</div>
                <p
                  className={cn("text-sm leading-tight text-muted-foreground")}
                >
                  {description}
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          {items.map((item) => (
            <ListItem key={item.href} href={item.href} title={item.text}>
              {item.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function DropdownMenuMobile({
  title,
  description,
  items,
  onItemClick,
}: {
  title: string;
  description: string;
  items: { href: string; text: string; description: string }[];
  onItemClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className={cn(
          "block py-3 text-base font-medium w-full text-left transition-colors",
          "text-foreground hover:text-muted-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="float-right">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <ul
          className={cn(
            "pl-4 pt-2 pb-4 rounded-md bg-muted animate-slide-in-from-left"
          )}
        >
          {items.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex flex-col gap-1 p-3 rounded-md transition text-base font-medium",
                  "hover:bg-accent hover:text-accent-foreground text-foreground"
                )}
                onClick={onItemClick}
              >
                <div>{item.text}</div>
                <p
                  className={cn(
                    "line-clamp-2 text-sm leading-snug text-muted-foreground"
                  )}
                >
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  onClick,
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  onClick?: () => void;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "flex flex-col gap-1 p-3 rounded-md transition text-base font-medium",
            "hover:bg-accent hover:text-accent-foreground text-foreground animate-fade-in"
          )}
          onClick={onClick}
        >
          <div>{title}</div>
          {children && (
            <p
              className={cn(
                "line-clamp-2 text-sm leading-snug text-muted-foreground"
              )}
            >
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default Header;
