import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { LanguagesIcon, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import Search from "../search";

function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme as "light" | "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300 w-full",
          theme === "light"
            ? "bg-white border-gray-200 text-black"
            : "bg-gray-900 border-gray-800 text-white"
        )}
        style={{ isolation: "isolate", boxSizing: "border-box" }}
      >
        <div className="px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between max-w-7xl mx-auto min-h-[60px]">
          <Link to="/home" className="flex items-center">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="w-20 sm:w-24 md:w-28 h-auto transition-transform hover:scale-105"
            />
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-6">
                <NavigationMenuItem>
                  <Link to="/home">
                    <NavigationMenuLink asChild>
                      <div
                        className={cn(
                          "text-base font-medium transition-colors",
                          theme === "light"
                            ? "hover:text-gray-600"
                            : "hover:text-gray-300"
                        )}
                      >
                        Home
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <DropdownMenu
                  title="Services"
                  description="Discover our services"
                  items={servicesItems}
                  theme={theme}
                />
                <DropdownMenu
                  title="Categories"
                  description="Explore various categories of our services"
                  items={categoriesItems}
                  theme={theme}
                />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Search />
            <Button
              className={cn(
                "px-4 sm:px-6 py-2 rounded-full font-medium transition-colors text-sm sm:text-base",
                theme === "light"
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white text-black hover:bg-gray-200"
              )}
              onClick={() => navigate("/auth")}
            >
              Sign Up
            </Button>

            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className={cn(
                      "rounded-full w-10 h-10",
                      theme === "light"
                        ? "hover:bg-gray-100 text-black"
                        : "hover:bg-gray-800 text-white"
                    )}
                  >
                    {theme === "light" ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "p-2 rounded-full flex items-center gap-2 text-sm sm:text-base font-medium",
                      theme === "light"
                        ? "hover:bg-gray-100 text-black"
                        : "hover:bg-gray-800 text-white"
                    )}
                  >
                    <LanguagesIcon className="w-5 h-5" />
                    <span>{selectedLanguage.toUpperCase()}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul
                      className={cn(
                        "grid gap-2 w-[150px] p-4 rounded-md",
                        theme === "light" ? "bg-white" : "bg-gray-900"
                      )}
                    >
                      {languages.map((lang) => (
                        <ListItem
                          key={lang.text}
                          href={lang.href}
                          title={lang.text}
                          theme={theme}
                          onClick={() => handleLanguageSelect(lang.code)}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-10 h-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className={cn(
            "lg:hidden p-6 border-t w-full transition-all duration-300 ease-in-out",
            theme === "light"
              ? "bg-white border-gray-200"
              : "bg-gray-900 border-gray-800"
          )}
        >
          <div className="flex flex-col gap-4">
            <Link
              to="/home"
              className={cn(
                "block py-2 text-base font-medium",
                theme === "light"
                  ? "text-black hover:text-gray-600"
                  : "text-white hover:text-gray-300"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <DropdownMenuMobile
              title="Services"
              description="Discover our services"
              items={servicesItems}
              theme={theme}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
            <DropdownMenuMobile
              title="Categories"
              description="Explore various categories of our services"
              items={categoriesItems}
              theme={theme}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="mt-4 flex flex-col gap-4">
              <Search />
              <Button
                className={cn(
                  "w-full py-2 rounded-full font-medium transition-colors text-base",
                  theme === "light"
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-black hover:bg-gray-200"
                )}
                onClick={() => {
                  navigate("/auth");
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className={cn(
                    "rounded-full w-10 h-10",
                    theme === "light"
                      ? "hover:bg-gray-100 text-black"
                      : "hover:bg-gray-800 text-white"
                  )}
                >
                  {theme === "light" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          "p-2 rounded-full flex items-center gap-2 text-base font-medium",
                          theme === "light"
                            ? "hover:bg-gray-100 text-black"
                            : "hover:bg-gray-800 text-white"
                        )}
                      >
                        <LanguagesIcon className="w-5 h-5" />
                        <span>{selectedLanguage.toUpperCase()}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul
                          className={cn(
                            "grid gap-2 w-[150px] p-4 rounded-md",
                            theme === "light" ? "bg-white" : "bg-gray-900"
                          )}
                        >
                          {languages.map((lang) => (
                            <ListItem
                              key={lang.text}
                              href={lang.href}
                              title={lang.text}
                              theme={theme}
                              onClick={() => handleLanguageSelect(lang.code)}
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DropdownMenu({
  title,
  description,
  items,
  theme,
}: {
  title: string;
  description: string;
  items: { href: string; text: string; description: string }[];
  theme: "light" | "dark";
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "text-base font-medium",
          theme === "light" ? "hover:text-gray-600" : "hover:text-gray-300"
        )}
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className={cn(
            "grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4 rounded-md shadow-lg",
            theme === "light" ? "bg-white" : "bg-gray-900"
          )}
        >
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
                className={cn(
                  "flex h-full w-full flex-col justify-end rounded-md p-6 no-underline select-none transition",
                  theme === "light"
                    ? "bg-gradient-to-b from-gray-100 to-gray-200 hover:shadow-md"
                    : "bg-gradient-to-b from-gray-800 to-gray-900 hover:shadow-lg"
                )}
                href="#"
              >
                <div className="mt-2 mb-1 text-base font-medium">{title}</div>
                <p
                  className={cn(
                    "text-sm leading-tight",
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  )}
                >
                  {description}
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          {items.map((item) => (
            <ListItem
              key={item.href}
              href={item.href}
              title={item.text}
              theme={theme}
            >
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
  theme,
  onItemClick,
}: {
  title: string;
  description: string;
  items: { href: string; text: string; description: string }[];
  theme: "light" | "dark";
  onItemClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className={cn(
          "block py-3 text-base font-medium w-full text-left transition-colors",
          theme === "light"
            ? "text-black hover:text-gray-600"
            : "text-white hover:text-gray-300"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="float-right">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <ul
          className={cn(
            "pl-4 pt-2 pb-4 rounded-md",
            theme === "light" ? "bg-gray-50" : "bg-gray-800"
          )}
        >
          {items.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex flex-col gap-1 p-3 rounded-md transition text-base font-medium",
                  theme === "light"
                    ? "hover:bg-gray-100 text-black"
                    : "hover:bg-gray-700 text-white"
                )}
                onClick={onItemClick}
              >
                <div>{item.text}</div>
                <p
                  className={cn(
                    "line-clamp-2 text-sm leading-snug",
                    theme === "light" ? "text-gray-600" : "text-gray-300"
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
  theme,
  onClick,
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  theme: "light" | "dark";
  onClick?: () => void;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "flex flex-col gap-1 p-3 rounded-md transition text-base font-medium",
            theme === "light"
              ? "hover:bg-gray-100 text-black"
              : "hover:bg-gray-700 text-white"
          )}
          onClick={onClick}
        >
          <div>{title}</div>
          {children && (
            <p
              className={cn(
                "line-clamp-2 text-sm leading-snug",
                theme === "light" ? "text-gray-600" : "text-gray-300"
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
