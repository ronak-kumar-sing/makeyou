export interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    impact: string;
    link: string;
    imageMobile: string;
    imageDesktop: string;
    video: string;
    theme: 'light' | 'dark';
    type: 'desktop' | 'mobile';
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Student Nest",
        category: "Real Estate Tech",
        description: "A comprehensive platform for students to book PGs and rooms. Built with Next.js, TailwindCSS, Shadcn UI, and integrated Google Maps.",
        impact: "Simplified housing search for thousands of students.",
        link: "https://student-nest.live",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1765032892/gprlsd0qvqbnvn7fzgfy.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1765032892/gprlsd0qvqbnvn7fzgfy.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1765032509/i6pgetbth9c3zitzgv5s.mov",
        theme: "light",
        type: "desktop"
    },
    {
        id: 2,
        title: "Cricket Hub",
        category: "Live Sports Analytics",
        description: "Real-time cricket and football scores powered by Node.js and Socket.io. Features live updates and detailed match statistics.",
        impact: "Delivers updates with sub-second latency.",
        link: "https://cricket-hub-y63h.vercel.app/",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769180305/tr5notfn5j8boietkbzq.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769180305/tr5notfn5j8boietkbzq.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1769179954/rbjf9hifdqq0xuynsxmd.mov",
        theme: "dark",
        type: "desktop"
    },
    {
        id: 3,
        title: "Cafe Coffee Roan",
        category: "Brand Presence",
        description: "A high-impact website designed to stand out in the competitive cafe market. Built with Next.js for speed and SEO.",
        impact: "Elevated brand perception and digital footfall.",
        link: "https://cafe-coffee-roan.vercel.app/",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769179375/csbbjh1ja0mmcpsqipdb.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769179375/csbbjh1ja0mmcpsqipdb.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1769179771/i5jfccfyiheamebzeowh.mov",
        theme: "light",
        type: "desktop"
    },
    {
        id: 4,
        title: "Coaching Center",
        category: "Education Tech",
        description: "A modern educational platform for coaching centers, streamlining course info and student engagement.",
        impact: "Modernized the traditional coaching center experience.",
        link: "https://coaching-center-theta.vercel.app/",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769179378/k6nlivfqmlgeti7l3bpx.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769179378/k6nlivfqmlgeti7l3bpx.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1769180067/qhpr4su6bzr12sb1bwcy.mov",
        theme: "light",
        type: "desktop"
    },
    {
        id: 5,
        title: "MakeYou Online",
        category: "Agency Portfolio",
        description: "A stunning mobile-first portfolio website designed to convert visitors into high-value clients.",
        impact: "Optimized for mobile conversion and visual storytelling.",
        link: "#",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769180262/rb2autumdafpvw2wa6rl.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769180262/rb2autumdafpvw2wa6rl.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1769180255/djqh0bnuaqigqskvm2vq.mov",
        theme: "dark",
        type: "mobile"
    }
];

export const categories = [
    "All",
    "Real Estate Tech",
    "Live Sports Analytics",
    "Brand Presence",
    "Education Tech",
    "Agency Portfolio"
];
