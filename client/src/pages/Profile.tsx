import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Sun,
  Moon,
  User,
  LogOut,
  Save,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import api from "@/utils/api";

function ProfilePage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState(getLoggedInUser());
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
  });
  const [bookings, setBookings] = useState([]);
  const [alert, setAlert] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    // Sync theme
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme as "light" | "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    // Fetch booking history
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data);
      } catch (error) {
        setAlert({ type: "error", message: "Failed to fetch booking history" });
        setTimeout(() => setAlert({ type: null, message: "" }), 5000);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/auth");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/auth/update-profile", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setEditMode(false);
      setAlert({ type: "success", message: "Profile updated successfully" });
      setTimeout(() => setAlert({ type: null, message: "" }), 5000);
    } catch (error) {
      setAlert({ type: "error", message: "Failed to update profile" });
      setTimeout(() => setAlert({ type: null, message: "" }), 5000);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({ type: "error", message: "New passwords do not match" });
      setTimeout(() => setAlert({ type: null, message: "" }), 5000);
      return;
    }
    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setAlert({ type: "success", message: "Password changed successfully" });
      setTimeout(() => setAlert({ type: null, message: "" }), 5000);
    } catch (error) {
      setAlert({ type: "error", message: "Failed to change password" });
      setTimeout(() => setAlert({ type: null, message: "" }), 5000);
    }
  };

  const handleSocialLinksUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/auth/update-social-links", socialLinks);
      setUser({ ...user, socialLinks: res.data.socialLinks });
      setAlert({
        type: "success",
        message: "Social links updated successfully",
      });
      setTimeout(() => setAlert({ type: null, message: "" }), 5000);
    } catch (error) {
      setAlert({ type: "error", message: "Failed to update social links" });
      setTimeout(() => setAlert({ type: null, message: "" }), 5000);
    }
  };

  if (!user) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center p-4",
          theme === "light"
            ? "bg-gradient-to-b from-green-50 to-teal-100"
            : "bg-gradient-to-b from-gray-900 to-gray-700 dark:bg-gray-900"
        )}
      >
        <Card
          className={cn(
            "max-w-md w-full",
            theme === "light"
              ? "bg-white border-emerald-200"
              : "bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
          )}
        >
          <CardHeader>
            <CardTitle
              className={cn(
                theme === "light"
                  ? "text-emerald-900"
                  : "text-gray-100 dark:text-gray-100"
              )}
            >
              Not Logged In
            </CardTitle>
            <CardDescription
              className={cn(
                theme === "light"
                  ? "text-gray-600"
                  : "text-gray-300 dark:text-gray-300"
              )}
            >
              Please log in to view your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className={cn(
                "w-full",
                theme === "light"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              )}
              onClick={() => navigate("/auth")}
            >
              <LogIn className="mr-2 h-4 w-4" /> Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen p-6",
        theme === "light"
          ? "bg-gradient-to-b from-green-50 to-teal-100"
          : "bg-gradient-to-b from-gray-900 to-gray-700 dark:bg-gray-900"
      )}
    >
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={cn(
            "rounded-full w-10 h-10",
            theme === "light"
              ? "hover:bg-green-100 text-emerald-900"
              : "hover:bg-gray-800 text-gray-100 dark:hover:bg-gray-700 dark:text-gray-100"
          )}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Alert for Success/Error Messages */}
        <AnimatePresence>
          {alert.type && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                variant={alert.type === "error" ? "destructive" : "default"}
                className={cn(
                  theme === "light"
                    ? "border-emerald-300"
                    : "border-gray-600 dark:border-gray-600"
                )}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {alert.type === "error" ? "Error" : "Success"}
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className={cn(
              theme === "light"
                ? "bg-white border-emerald-200"
                : "bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
            )}
          >
            <CardHeader>
              <CardTitle
                className={cn(
                  "flex items-center gap-2",
                  theme === "light"
                    ? "text-emerald-900"
                    : "text-gray-100 dark:text-gray-100"
                )}
              >
                <User className="h-6 w-6" /> Your Profile
              </CardTitle>
              <CardDescription
                className={cn(
                  theme === "light"
                    ? "text-gray-600"
                    : "text-gray-300 dark:text-gray-300"
                )}
              >
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label
                      className={cn(
                        "text-sm font-medium",
                        theme === "light"
                          ? "text-gray-700"
                          : "text-gray-200 dark:text-gray-200"
                      )}
                    >
                      Full Name
                    </label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className={cn(
                        theme === "light"
                          ? "border-emerald-300"
                          : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className={cn(
                        "text-sm font-medium",
                        theme === "light"
                          ? "text-gray-700"
                          : "text-gray-200 dark:text-gray-200"
                      )}
                    >
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={cn(
                        theme === "light"
                          ? "border-emerald-300"
                          : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                      )}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className={cn(
                        theme === "light"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                      )}
                    >
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditMode(false)}
                      className={cn(
                        theme === "light"
                          ? "border-emerald-300 text-emerald-600"
                          : "border-gray-600 text-gray-100 dark:border-gray-600 dark:text-gray-100"
                      )}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        theme === "light"
                          ? "text-gray-700"
                          : "text-gray-200 dark:text-gray-200"
                      )}
                    >
                      Username
                    </p>
                    <p
                      className={cn(
                        theme === "light"
                          ? "text-gray-900"
                          : "text-gray-100 dark:text-gray-100"
                      )}
                    >
                      {user.username}
                    </p>
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        theme === "light"
                          ? "text-gray-700"
                          : "text-gray-200 dark:text-gray-200"
                      )}
                    >
                      Full Name
                    </p>
                    <p
                      className={cn(
                        theme === "light"
                          ? "text-gray-900"
                          : "text-gray-100 dark:text-gray-100"
                      )}
                    >
                      {user.fullName}
                    </p>
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        theme === "light"
                          ? "text-gray-700"
                          : "text-gray-200 dark:text-gray-200"
                      )}
                    >
                      Email
                    </p>
                    <p
                      className={cn(
                        theme === "light"
                          ? "text-gray-900"
                          : "text-gray-100 dark:text-gray-100"
                      )}
                    >
                      {user.email}
                    </p>
                  </div>
                  <Button
                    onClick={() => setEditMode(true)}
                    className={cn(
                      theme === "light"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    )}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Password Change */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card
            className={cn(
              theme === "light"
                ? "bg-white border-emerald-200"
                : "bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
            )}
          >
            <CardHeader>
              <CardTitle
                className={cn(
                  theme === "light"
                    ? "text-emerald-900"
                    : "text-gray-100 dark:text-gray-100"
                )}
              >
                Change Password
              </CardTitle>
              <CardDescription
                className={cn(
                  theme === "light"
                    ? "text-gray-600"
                    : "text-gray-300 dark:text-gray-300"
                )}
              >
                Update your password for enhanced security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label
                    className={cn(
                      "text-sm font-medium",
                      theme === "light"
                        ? "text-gray-700"
                        : "text-gray-200 dark:text-gray-200"
                    )}
                  >
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    )}
                  />
                </div>
                <div>
                  <label
                    className={cn(
                      "text-sm font-medium",
                      theme === "light"
                        ? "text-gray-700"
                        : "text-gray-200 dark:text-gray-200"
                    )}
                  >
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    )}
                  />
                </div>
                <div>
                  <label
                    className={cn(
                      "text-sm font-medium",
                      theme === "light"
                        ? "text-gray-700"
                        : "text-gray-200 dark:text-gray-200"
                    )}
                  >
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className={cn(
                    theme === "light"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  )}
                >
                  <Save className="mr-2 h-4 w-4" /> Change Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            className={cn(
              theme === "light"
                ? "bg-white border-emerald-200"
                : "bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
            )}
          >
            <CardHeader>
              <CardTitle
                className={cn(
                  "flex items-center gap-2",
                  theme === "light"
                    ? "text-emerald-900"
                    : "text-gray-100 dark:text-gray-100"
                )}
              >
                <LinkIcon className="h-6 w-6" /> Social Links
              </CardTitle>
              <CardDescription
                className={cn(
                  theme === "light"
                    ? "text-gray-600"
                    : "text-gray-300 dark:text-gray-300"
                )}
              >
                Connect your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSocialLinksUpdate} className="space-y-4">
                <div>
                  <label
                    className={cn(
                      "text-sm font-medium",
                      theme === "light"
                        ? "text-gray-700"
                        : "text-gray-200 dark:text-gray-200"
                    )}
                  >
                    Facebook
                  </label>
                  <Input
                    value={socialLinks.facebook}
                    onChange={(e) =>
                      setSocialLinks({
                        ...socialLinks,
                        facebook: e.target.value,
                      })
                    }
                    placeholder="https://facebook.com/yourprofile"
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    )}
                  />
                </div>
                <div>
                  <label
                    className={cn(
                      "text-sm font-medium",
                      theme === "light"
                        ? "text-gray-700"
                        : "text-gray-200 dark:text-gray-200"
                    )}
                  >
                    Twitter
                  </label>
                  <Input
                    value={socialLinks.twitter}
                    onChange={(e) =>
                      setSocialLinks({
                        ...socialLinks,
                        twitter: e.target.value,
                      })
                    }
                    placeholder="https://twitter.com/yourprofile"
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    )}
                  />
                </div>
                <div>
                  <label
                    className={cn(
                      "text-sm font-medium",
                      theme === "light"
                        ? "text-gray-700"
                        : "text-gray-200 dark:text-gray-200"
                    )}
                  >
                    Instagram
                  </label>
                  <Input
                    value={socialLinks.instagram}
                    onChange={(e) =>
                      setSocialLinks({
                        ...socialLinks,
                        instagram: e.target.value,
                      })
                    }
                    placeholder="https://instagram.com/yourprofile"
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className={cn(
                    theme === "light"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  )}
                >
                  <Save className="mr-2 h-4 w-4" /> Save Social Links
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Booking History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card
            className={cn(
              theme === "light"
                ? "bg-white border-emerald-200"
                : "bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
            )}
          >
            <CardHeader>
              <CardTitle
                className={cn(
                  theme === "light"
                    ? "text-emerald-900"
                    : "text-gray-100 dark:text-gray-100"
                )}
              >
                Booking History
              </CardTitle>
              <CardDescription
                className={cn(
                  theme === "light"
                    ? "text-gray-600"
                    : "text-gray-300 dark:text-gray-300"
                )}
              >
                View your past and upcoming bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hotel</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking, index) => (
                      <TableRow key={index}>
                        <TableCell>{booking.hotelName}</TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs",
                              booking.status === "Confirmed"
                                ? theme === "light"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-emerald-900 text-emerald-300"
                                : theme === "light"
                                ? "bg-red-100 text-red-700"
                                : "bg-red-900 text-red-300"
                            )}
                          >
                            {booking.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p
                  className={cn(
                    theme === "light"
                      ? "text-gray-600"
                      : "text-gray-300 dark:text-gray-300"
                  )}
                >
                  No bookings found.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfilePage;
