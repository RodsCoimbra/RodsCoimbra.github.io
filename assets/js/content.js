/* Expanded card descriptions and galleries. Paths are relative to index.html.
   Media: image, video, document (PDF first-page image), youtube.
   PDF.js renders document page 1 automatically, only when selected.
   Optional preview: "assets/images/certificate.webp" uses a pre-converted
   image instead, without loading PDF.js. The original PDF stays linked in its caption.
   Optional video.poster and video.tracks are supported. No autoplay.
   Static card covers and summaries are edited separately in index.html.
*/
const portfolioDetails = {
  eurobin: {
    title: "euROBIN",
    meta: "2026 — Present",
    summary:
      "Domestic-robotics demonstration at the European Parliament, developed with European research partners.",
    paragraphs: [
      "Within euROBIN, I developed a domestic-robotics demonstration shown at the European Parliament in Brussels.",
      "I coordinated integration work with partner research teams, bringing components of their research together on our robot for a shared demonstration.",
    ],
    media: [
      {
        type: "youtube",
        id: "IQKxkcPtKPo",
        caption: "Demonstration of the euROBIN task.",
      },
      {
        type: "image",
        src: "assets/images/eurobin-project.webp",
        alt: "euROBIN domestic-robotics demonstration",
        caption: "euROBIN domestic-robotics demonstration.",
      },
      {
        type: "image",
        src: "assets/images/eurobin_demo_parliament.webp",
        alt: "Research teams at the European Parliament demonstration",
        caption: "European Parliament demonstration.",
      },
      {
        type: "image",
        src: "assets/images/eurobin-all-teams.webp",
        alt: "Research teams at the European Parliament demonstration",
        caption: "Participating research teams, Brussels.",
      },
    ],
    link: {
      href: "https://www.eurobin-project.eu/",
      label: "Visit project",
    },
    cover: "assets/images/eurobin-project.webp",
  },
  fomo: {
    title: "FOMO-HODOR",
    meta: "2025 — Present",
    summary:
      "Mapping, autonomous navigation, obstacle avoidance, and basic manipulation for humanoid domestic robots.",
    paragraphs: [
      "FOMO-HODOR brings together ISR, INESC-ID, and the University of Texas at Austin to explore foundation models for humanoid domestic robots.",
      "I contributed environment mapping, navigation, and basic manipulation capabilities, collaborating with researchers on the core robot capabilities needed for the project.",
      "For LOLA, my autonomous-navigation work included mapping with RTAB-Map, autonomous navigation, and obstacle avoidance. The gallery contains demonstrations of these capabilities within FOMO-HODOR.",
    ],
    media: [
      {
        type: "youtube",
        id: "ilPFfnMnQAI",
        caption: "Humanoid Autonomous Navigation.",
      },
      {
        type: "youtube",
        id: "mzODX0W68eU",
        caption: "Humanoid Obstacle Avoidance.",
      },
      {
        type: "youtube",
        id: "9UQapqZuXL4",
        caption: "Humanoid Safe Navigation Around People.",
      },
      {
        type: "youtube",
        id: "ohKSb__pI68",
        caption: "RTAB-Map implementation on Humanoid Robot.",
      },
      {
        type: "youtube",
        id: "n-c-9VN09lo",
        caption: "Humanoid basic manipulation capabilities.",
      },
      {
        type: "image",
        src: "assets/images/oracle_project.webp",
        alt: "FOMO-HODOR research project",
        caption: "FOMO-HODOR research project",
      },
      {
        type: "image",
        src: "assets/images/LOLA.webp",
        alt: "LOLA robot",
        caption: "LOLA, the robot used for the project.",
      },
    ],
    link: {
      href: "https://irsgroup.isr.tecnico.ulisboa.pt/fomo-hodor/",
      label: "Visit project",
    },
    cover: "assets/images/LOLA.webp",
  },
  socrob: {
    title: "SocRob@Home",
    meta: "2024 — Present",
    summary:
      "Humanoid navigation and mobile-manipulator software for domestic service robotics and RoboCup@Home.",
    paragraphs: [
      "As part of SocRob@Home, my primary responsibility has been developing autonomous navigation for the team’s humanoid robot.",
      "I also contribute to the mobile manipulator’s manipulation pipeline. The project connects domestic-robotics research with practical demonstrations and international competitions, including RoboCup@Home.",
      "The gallery brings together RoboCup team photographs, hands-on competition work, the Portugal podium photograph, and certificates from the Korea and Portugal events.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/robocup_photo.webp",
        alt: "SocRob team at RoboCup@Home",
        caption: "SocRob@Home at RoboCup.",
      },
      {
        type: "image",
        src: "assets/images/robocup_portugal_working.webp",
        alt: "Working with the SocRob team at RoboCup Portugal",
        caption: "Hands-on robotics work at RoboCup Portugal.",
      },
      {
        type: "image",
        src: "assets/images/podium_robocup_portugal.webp",
        alt: "RoboCup Portugal podium photograph",
        caption: "RoboCup Portugal podium photograph.",
      },
      {
        type: "youtube",
        id: "wAbXj2K2anA",
        caption: "Log visualization tool developed for the SocRob@Home team.",
      },
      {
        type: "document",
        src: "assets/images/certificate_robocup_korea.pdf",
        label: "RoboCup Korea certificate",
        caption: "RoboCup Korea certificate",
      },
      {
        type: "document",
        src: "assets/images/certificate_robocup_portugal.pdf",
        label: "RoboCup Portugal certificate",
        caption: "RoboCup Portugal certificate",
      },
    ],
    link: {
      href: "https://irs-group.github.io/socrobwebsite/",
      label: "Visit project",
    },
    cover: "assets/images/robocup_photo.webp",
  },
  paper: {
    title: "Full-Body Local Planning with Reinforcement Learning",
    meta: "Publication · ICARSC 2026",
    summary:
      "First-author research on full-body local planning for a mobile manipulator using reinforcement learning.",
    paragraphs: [
      "I am the first author of a research paper on full-body local planning of a mobile manipulator using reinforcement learning.",
      "I presented the work at the 2026 IEEE International Conference on Autonomous Robot Systems and Competitions (ICARSC) in Barcelos, Portugal.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/icarsc_presentation.webp",
        alt: "Rodrigo Coimbra presenting at ICARSC 2026",
        caption: "Research presentation at ICARSC 2026, Barcelos.",
      },
      {
        type: "youtube",
        id: "cG3SJvgvgfo",
        caption: "Full-Body Navigation · Corridor Bookstore.",
      },
      {
        type: "youtube",
        id: "-e_b_VXjuKc",
        caption: "Full-Body Navigation · Corridor 2 Bookstore.",
      },
      {
        type: "youtube",
        id: "f9duincHxqE",
        caption: "Full-Body Navigation · Global Planner Integration.",
      },
      {
        type: "youtube",
        id: "xz9AyQ5F8fU",
        caption: "Full-Body Navigation · Dynamic Obstacles.",
      },
      {
        type: "document",
        src: "assets/images/ICARSC_Certificate.pdf",
        label: "ICARSC certificate",
        caption: "ICARSC certificate",
      },
    ],
    link: {
      href: "https://ieeexplore.ieee.org/document/11523319",
      label: "View paper",
    },
    cover: "assets/images/icarsc_presentation.webp",
  },
  quidgest: {
    title: "Software Developer Internship",
    meta: "Quidgest · Jul 2024 — Sep 2024",
    summary:
      "REST API development and financial-management data processing using C# and Microsoft SQL Server.",
    paragraphs: [
      "During my internship at Quidgest, I developed a REST API providing asynchronous access to financial-management database data.",
      "I implemented data-processing functionality in C# and wrote SQL queries and updates for Microsoft SQL Server. The gallery includes an internship photograph and certificate.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/quidgest.webp",
        alt: "Quidgest internship",
        caption: "Software development internship at Quidgest.",
      },
      {
        type: "document",
        src: "assets/images/certificate_intership_quidgest.pdf",
        label: "Quidgest internship certificate",
        caption: "Quidgest internship certificate",
      },
    ],
    cover: "assets/images/quidgest.webp",
  },
  parliament: {
    title: "euROBIN demonstration",
    meta: "European Parliament · Brussels",
    summary:
      "A shared demonstration of domestic robotics with European research teams.",
    paragraphs: [
      "I took part in a cooperative demonstration at the European Parliament with other research teams from the euROBIN project.",
      "The event showcased domestic robotic tasks and provided an opportunity to communicate the work of European robotics research groups.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/eurobin-all-teams.webp",
        alt: "Research teams at the European Parliament demonstration",
        caption: "European Parliament demonstration, Brussels.",
      },
      {
        type: "image",
        src: "assets/images/eurobin-project.webp",
        alt: "euROBIN robotics demonstration",
        caption: "Domestic-robotics demonstration.",
      },
    ],
    cover: "assets/images/eurobin-all-teams.webp",
  },
  outreach: {
    title: "Sharing robotics research",
    meta: "Science outreach · JEEC",
    summary:
      "Introducing students to our robotics research and live demonstrations.",
    paragraphs: [
      "I helped promote SocRob@Home to students through events such as JEEC, explaining the project’s goals and our work on domestic robots.",
      "Science outreach is another part of my work at ISR, including presenting research and running live robot demonstrations for visiting schools and members of the public.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/jeec.webp",
        alt: "Robotics outreach at JEEC",
        caption: "Sharing robotics research at JEEC.",
      },
    ],
    cover: "assets/images/jeec.webp",
  },
  presentation: {
    title: "Presenting learning-based planning research",
    meta: "ICARSC 2026 · Barcelos",
    summary:
      "Communicating my full-body local planning research to the robotics community.",
    paragraphs: [
      "At ICARSC 2026, I presented our paper on full-body local planning of a mobile manipulator using reinforcement learning.",
      "The presentation formed part of sharing the research with the robotics community at the conference.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/icarsc_presentation.webp",
        alt: "Rodrigo Coimbra delivering his ICARSC presentation",
        caption: "ICARSC 2026 research presentation.",
      },
      {
        type: "youtube",
        id: "cG3SJvgvgfo",
        caption: "Full-Body Navigation · Corridor Bookstore.",
      },
      {
        type: "youtube",
        id: "-e_b_VXjuKc",
        caption: "Full-Body Navigation · Corridor 2 Bookstore.",
      },
      {
        type: "youtube",
        id: "f9duincHxqE",
        caption: "Full-Body Navigation · Global Planner Integration.",
      },
      {
        type: "youtube",
        id: "xz9AyQ5F8fU",
        caption: "Full-Body Navigation · Dynamic Obstacles.",
      },
      {
        type: "document",
        src: "assets/images/ICARSC_Certificate.pdf",
        label: "ICARSC certificate",
        caption: "ICARSC certificate",
      },
    ],
    link: {
      href: "https://ieeexplore.ieee.org/document/11523319",
      label: "View paper",
    },
    cover: "assets/images/icarsc_presentation.webp",
  },
  hiking: {
    title: "Hiking & running",
    meta: "Grupo Desportivo do Santander",
    summary:
      "Previously active in running; now participating in hiking activities with the sports group.",
    paragraphs: [
      "I am part of Grupo Desportivo do Santander. I previously participated in running activities and now take part in hiking.",
      "This is part of my life outside robotics, with time spent outdoors and participating in activities with the group.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/santander_running.webp",
        alt: "Rodrigo Coimbra running",
        caption: "Running with Grupo Desportivo do Santander.",
      },
      {
        type: "image",
        src: "assets/images/santander_hiking.webp",
        alt: "Rodrigo Coimbra hiking",
        caption: "Hiking with Grupo Desportivo do Santander.",
      },
      {
        type: "image",
        src: "assets/images/santander_hiking_2.webp",
        alt: "Rodrigo Coimbra hiking",
        caption: "Hiking with Grupo Desportivo do Santander.",
      },
    ],
    cover: "assets/images/santander_running.webp",
  },
  volleyball: {
    title: "Volleyball",
    meta: "Secondary school",
    summary:
      "Team volleyball throughout my final three years of secondary school.",
    paragraphs: [
      "I was part of a volleyball team from the 10th to the 12th grade.",
      "Team sport was part of my secondary-school years alongside my studies.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/volleyball_team_back.webp",
        alt: "Rodrigo Coimbra playing volleyball",
        caption: "Volleyball team photo.",
      },
      {
        type: "image",
        src: "assets/images/volleyball_team.webp",
        alt: "Rodrigo Coimbra playing volleyball",
        caption: "Volleyball team photo.",
      },
    ],
    cover: "assets/images/volleyball_team_back.webp",
  },
  hackathons: {
    title: "NOS Hackathons",
    meta: "2024 & 2025 · NOS Multimédia SA",
    summary:
      "Two hackathons with friends: privacy-focused prompt engineering and generative AI document processing.",
    paragraphs: [
      "After discovering the NOS hackathons, I invited a group of friends to participate together. Each event was focused on generative AI and prompt engineering, which are topics I am also passionate about.",
      "In 2024, we tackled prompt-engineering tests aimed at preventing an AI system from revealing private information.",
      "In 2025, we built a generative AI document-processing tool that extracts structured information and validates model outputs against source data to detect hallucinations.",
      "The 2025 tool combined Python-based text processing with an interactive drag-and-drop interface for document input, data extraction, and structured output generation.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/nos_hackathon_original.webp",
        alt: "Team at the NOS hackathon",
        caption: "Team at the NOS hackathon.",
      },
      {
        type: "image",
        src: "assets/images/certificate_nos_hackaton_2024.png",
        alt: "Certificate from the 2024 NOS hackathon",
        caption: "NOS Hackathon 2024 certificate.",
      },
      {
        type: "document",
        src: "assets/images/certificate_nos_hackaton_2025.pdf",
        label: "NOS Hackathon 2025 certificate",
        caption: "NOS Hackathon 2025 certificate",
      },
    ],
    coverKind: "hackathon",
  },
};
