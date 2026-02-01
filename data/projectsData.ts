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
        link: "https://www.student-nest.live/",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1765032892/gprlsd0qvqbnvn7fzgfy.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1765032892/gprlsd0qvqbnvn7fzgfy.png",
        video: "https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=i6pgetbth9c3zitzgv5s",
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
        video: "https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=rbjf9hifdqq0xuynsxmd",
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
        video: "https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=qhpr4su6bzr12sb1bwcy",
        theme: "light",
        type: "desktop"
    },
    {
        id: 5,
        title: "MakeYou Online",
        category: "Agency Portfolio",
        description: "A stunning mobile-first portfolio website designed to convert visitors into high-value clients.",
        impact: "Optimized for mobile conversion and visual storytelling.",
        link: "https://www.makeyou.online/",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769865807/qjzyv5zcqfqjzjtwwtbn.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769865807/qjzyv5zcqfqjzjtwwtbn.png",
        video: "https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=mfc3z9gt7sbbq0gcpfa7",
        theme: "dark",
        type: "mobile"
    },
    {
        id: 6,
        title: "ARPUFRL",
        category: "Organization Website",
        description: "A professional website for ARPUFRL organization, showcasing their mission, services, and impact in the community.",
        impact: "Enhanced digital presence and community outreach.",
        link: "https://arpufrl.org/",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1765032906/bs1rm0cmvxetgs89oaki.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1765032906/bs1rm0cmvxetgs89oaki.png",
        video: "https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=tbrny4vonlmk5fc6v9it",
        theme: "light",
        type: "desktop"
    }
];

export const categories = [
    "All",
    "Real Estate Tech",
    "Live Sports Analytics",
    "Brand Presence",
    "Education Tech",
    "Agency Portfolio",
    "Organization Website"
];
