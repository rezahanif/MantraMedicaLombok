export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  image: string; // path to image in /assets/images/team/
  bio?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "yoga",
    name: "dr. I Gede Yoga Mahendra Putra",
    role: "Lead Physician",
    specialization: "Emergency & Mountain Medicine",
    image: "/assets/images/team/dr-yoga.jpg",
    bio: "Specializing in emergency response and high-altitude medicine, dr. Yoga leads the clinical team with precision and calm under pressure.",
  },
  {
    id: "nyoman",
    name: "dr. Nyoman Ardyatri Kairavini",
    role: "Recovery Specialist",
    specialization: "Therapeutic Recovery & Rehabilitation",
    image: "/assets/images/team/dr-nyoman.jpg",
    bio: "With deep expertise in post-trek rehabilitation, dr. Nyoman ensures every patient's recovery is personal, compassionate, and effective.",
  },
];