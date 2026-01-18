"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: (query: string) => boolean;
  currentBgColor: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSearch,
  searchQuery,
  setSearchQuery,
  currentBgColor,
}) => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    carBrand: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchQuery && onSearch) {
      const isMatch = onSearch(searchQuery);
      if (isMatch) {
        setTimeout(() => {
          setSearchQuery("");
          setIsMobileMenuOpen(false);
        }, 500);
      }
    }
  }, [searchQuery, onSearch, setSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.carBrand) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_ej95dfs",
        "template_j5kkgyz",
        {
          fullName: formData.fullName,
          phone: formData.phone,
          carBrand: formData.carBrand,
          message: formData.message,
        },
        "tfZKoiZQ5hNGKpNsj"
      );
      alert("Form submitted successfully! We'll contact you soon.");
      setFormData({ fullName: "", phone: "", carBrand: "", message: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Email send error:", error);
      alert("Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          {isMobileMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
              />
              <line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
              />
              <line
                x1="3"
                y1="18"
                x2="21"
                y2="18"
              />
            </svg>
          )}
        </button>
        <h1 style={{ color: "white", fontSize: "1.2rem", margin: 0 }}>
          Speedy Rentals
        </h1>
        <div style={{ width: "24px" }} />
      </div>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`mobile-sidebar  ${isMobileMenuOpen ? "open" : "hidden"}`}
      >
        <input
          type="search"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={handleInputChange}
          disabled={pathname !== "/"}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #dddddd80",
            fontSize: "0.9rem",
            outline: "0",
            marginBottom: "15px",
            backgroundColor: "#ffffff15",
            color: "white",
          }}
        />

        <nav
          style={{
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              color: "#ffffff",
              marginTop: "5px",
              textAlign: "center",
            }}
          >
            Try: BMW, AUDI, MERCEDES, TESLA, FERRARI
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "4px",
                  backgroundColor:
                    pathname === "/" ? currentBgColor : "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                HOME
              </Link>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <Link
                href="/locations"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "4px",
                  backgroundColor:
                    pathname === "/locations" ? "#49494978" : "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                LOCATIONS
              </Link>
            </li>
            <li style={{ marginBottom: "8px", textAlign: "center" }}>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "4px",
                  backgroundColor:
                    pathname === "/about" ? "#49494978" : "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                ABOUT US
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            style={{
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.9rem",
              width: "100%",
              backgroundColor: pathname === "/" ? currentBgColor : "#424242",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
          >
            Rent Now
          </button>
          <button
            onClick={() => {
              setIsContactModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            style={{
              color: "white",
              border: "1px solid white",
              padding: "12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              width: "100%",
              backgroundColor: "transparent",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="desktop-sidebar"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: "200px",
          backgroundColor: "#31313149",
          color: "white",
          padding: "15px",
          fontFamily: "Arial, sans-serif",
          borderRight: "1px solid #585858",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          zIndex: 999,
        }}
      >
        <div>
          <h1
            style={{
              margin: "20px 0 8px 0",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            Speedy Rentals
          </h1>
          <p
            style={{
              margin: "20px 0",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Rent the perfect car for your adventure!
          </p>
          <input
            type="search"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #dddddd80",
              fontSize: "0.8rem",
              outline: "0",
            }}
            disabled={pathname !== "/"}
          />
          <p
            style={{
              fontSize: "0.7rem",
              color: "#ffffff",
              marginTop: "5px",
              textAlign: "center",
            }}
          >
            Try: BMW, AUDI, MERCEDES, TESLA, FERRARI
          </p>
        </div>

        <nav style={{ width: "100%", marginBottom: "20px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li className="hover:cursor-pointer hover:bg-[#7a7a7a2c] transition-all hover:scale-[1.1]">
              <Link
                href="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "5px",
                  backgroundColor: pathname === "/" ? currentBgColor : "",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "background-color 0.4s ease",
                }}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                HOME
              </Link>
            </li>
            <li className="hover:cursor-pointer hover:bg-[#7a7a7a2c] transition-all hover:scale-[1.1]">
              <Link
                href="/locations"
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "5px",
                  backgroundColor: pathname === "/locations" ? "#49494978" : "",
                  textAlign: "center",
                }}
                aria-current={pathname === "/locations" ? "page" : undefined}
              >
                LOCATIONS
              </Link>
            </li>
            <li className="hover:cursor-pointer hover:bg-[#7a7a7a2c] transition-all hover:scale-[1.1]">
              <Link
                href="/about"
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "5px",
                  backgroundColor: pathname === "/about" ? "#49494978" : "",
                  transition: "background-color 0.4s ease",
                  textAlign: "center",
                }}
                aria-current={pathname === "/about" ? "page" : undefined}
              >
                ABOUT US
              </Link>
            </li>
          </ul>
        </nav>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            marginTop: "-20px",
          }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              color: "white",
              border: "none",
              padding: "8px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.8rem",
              width: "100%",
              backgroundColor: pathname === "/" ? currentBgColor : "#424242",
            }}
            className="hover:opacity-80 hover:transition-all"
          >
            Rent Now
          </button>
          <button
            onClick={() => setIsContactModalOpen(true)}
            style={{
              color: "white",
              border: "1px solid white",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
              width: "100%",
            }}
            className="hover:bg-[#00000031] hover:cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </aside>

      {/* Rent Now Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#efefefb1",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              position: "relative",
              animation: "modalFadeIn 0.5s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              className="hover:text-[red] hover:transition-all"
            >
              ×
            </button>
            <h2
              style={{
                marginBottom: "20px",
                color: "#ffffff",
                fontSize: "20px",
              }}
            >
              Rent a Car
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{ animation: "fadeIn 1s ease-in" }}
            >
              <div
                style={{
                  marginBottom: "15px",
                  animation: "slideInLeft 0.5s ease-out 0.2s both",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#333",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #000000",
                    color: "#000",
                    outline: "0",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="focus:border-[2px] focus:border-yellow-800 focus:shadow-lg hover:border-yellow-500 hover:shadow-md"
                />
              </div>
              <div
                style={{
                  marginBottom: "15px",
                  animation: "slideInLeft 0.5s ease-out 0.4s both",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#333",
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #000000",
                    color: "#000",
                    outline: "0",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="focus:border-[2px] focus:border-yellow-800 focus:shadow-lg hover:border-yellow-500 hover:shadow-md"
                />
              </div>
              <div
                style={{
                  marginBottom: "15px",
                  animation: "slideInLeft 0.5s ease-out 0.6s both",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#333",
                  }}
                >
                  Car Brand *
                </label>
                <select
                  name="carBrand"
                  value={formData.carBrand}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #000000",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    color: "#000",
                    outline: "0",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="focus:border-[2px] focus:border-yellow-800 focus:shadow-lg hover:border-yellow-500 hover:shadow-md"
                >
                  <option value="">Select a brand</option>
                  <option value="BMW">BMW</option>
                  <option value="AUDI">AUDI</option>
                  <option value="MERCEDES">MERCEDES</option>
                  <option value="TESLA">TESLA</option>
                  <option value="FERRARI">FERRARI</option>
                </select>
              </div>
              <div
                style={{
                  marginBottom: "15px",
                  animation: "slideInLeft 0.5s ease-out 0.8s both",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#333",
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #000000",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    color: "#000",
                    outline: "0",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="focus:border-[2px] focus:border-yellow-800 focus:shadow-lg hover:border-yellow-500 hover:shadow-md"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#494949",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                  animation: "slideInLeft 0.5s ease-out 1s both",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "#333")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "#494949")
                }
                onMouseDown={(e) =>
                  ((e.target as HTMLButtonElement).style.transform =
                    "scale(0.98)")
                }
                onMouseUp={(e) =>
                  ((e.target as HTMLButtonElement).style.transform = "scale(1)")
                }
                className="hover:shadow-lg focus:shadow-xl focus:outline-none"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {isContactModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#e4e4e4b2",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              position: "relative",
              animation: "modalFadeIn 0.5s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsContactModalOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              className="hover:text-[red] hover:transition-all"
            >
              ×
            </button>
            <h2
              style={{
                marginBottom: "20px",
                color: "#333",
                animation: "slideInLeft 0.5s ease-out 0.2s both",
              }}
            >
              Contact Us
            </h2>
            <p
              style={{
                marginBottom: "15px",
                color: "#555",
                lineHeight: "1.5",
                animation: "slideInLeft 0.5s ease-out 0.4s both",
              }}
            >
              Ready to rent? Visit our locations page or contact us directly.
              We&apos;re here to help you find the perfect car for your next
              adventure!
            </p>
            <div
              style={{
                marginBottom: "10px",
                animation: "slideInLeft 0.5s ease-out 0.6s both",
              }}
            >
              <strong
                style={{
                  color: "#333",
                  animation: "slideInLeft 0.5s ease-out 0.8s both",
                }}
              >
                Email:
              </strong>
              <p
                className="inline m-2 text-[#2a277c]"
                style={{
                  animation: "slideInLeft 0.5s ease-out 1s both",
                }}
              >
                info@speedyrentals.com
              </p>
            </div>
            <div
              style={{
                marginBottom: "10px",
                animation: "slideInLeft 0.5s ease-out 1.2s both",
              }}
            >
              <strong style={{ color: "#333" }}>Phone:</strong>
              <p className="inline m-2 text-[#2a277c]">+20 123 456 7890</p>
            </div>
            <div
              style={{
                marginBottom: "20px",
                animation: "slideInLeft 0.5s ease-out 1.4s both",
              }}
            >
              <strong style={{ color: "#333" }}>Address:</strong>
              <p className="inline m-2 text-[#2a277c]">
                123 Cairo Street, Cairo, Egypt
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
