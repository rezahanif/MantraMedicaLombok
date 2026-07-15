export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Medical Service", href: "/services" },
  { label: "Recovery & Wellness", href: "/recovery" },
  { label: "About Us", href: "/about" },
  { label: "Contact & Location", href: "/contact" },
];

export const footerLinks = {
  quick: ["Services", "About Us", "Blog", "Contact Us"],
  departments: ["General Clinic", "Dental Clinic", "Pharmacy", "Radiology & Imaging", "Emergency", "Laboratory"],
  contact: [
    { icon: "icons/locgreen.webp", text: "Lombok, NTB" },
    { icon: "icons/callgreen.webp", text: "+62 852 5382 8294" },
    { icon: "icons/emailgreen.webp", text: "mantramedica@gmail.com" },
  ],
};