const portfolioDetails = {
  eurobin: {
    title: "euROBIN",
    meta: "2026 — Present",
    summary:
      "Domestic-robotics demonstration at the European Parliament, developed with European research partners.",
    paragraphs: [
      "Within euROBIN, I improved the manipulation pipeline for a domestic-robotics demonstration presented at the European Parliament in Brussels. I integrated components from partner research teams and focused on making the full pick-and-place workflow robust enough for repeated live operation.",
      "I developed a state machine that coordinated perception, motion planning, grasping, and recovery behaviour, with fail-safes for camera detections, dynamic goals, reachability failures, and unsuccessful grasps. The system could validate complete trajectories before moving, select the shortest valid plan, retry failed picks, and maintain up-to-date environment data.",
      "These improvements transformed an unreliable pipeline into a stable demonstration system: across four 10-minute demonstrations at the European Parliament, the robot repeatedly completed pick-and-place operations and recovered from failures without operator intervention.",
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
      "I contributed to the development of core capabilities for LOLA, the project's humanoid robot, including environment mapping, localization, autonomous navigation, and arm motion planning.",
      "For navigation, I implemented mapping and localization with RTAB-Map and integrated autonomous navigation and obstacle avoidance using Nav2. For manipulation, I used cuRobo to plan arm motions while avoiding collisions with the robot and its environment, providing a foundation for future manipulation tasks.",
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
      "As part of SocRob@Home, I develop autonomous navigation for the team's humanoid robot and contribute to the mobile manipulator's software for domestic-robotics tasks and RoboCup@Home competitions.",
      "For RoboCup, I improved the pick-and-place pipeline for a table-cleaning task in which the robot had to place dishes in a dishwasher, dispose of selected objects in a bin, and organize remaining objects in a cabinet. I also developed a common client node that allowed multiple state-machine states to run in parallel, reducing task completion time by enabling independent components to execute concurrently.",
      "To support debugging and competition preparation, I developed a logging system that records pipeline events in JSONL and an application for exploring them. The tool provides a graphical view of state-machine execution and system flow, helping the team identify failures and understand robot behaviour more quickly. The gallery includes a demonstration of this tool, alongside RoboCup photographs, competition work, and certificates from the Korea and Portugal events.",
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
        caption: "RoboCup Korea certificate.",
      },
      {
        type: "document",
        src: "assets/images/certificate_robocup_portugal.pdf",
        label: "RoboCup Portugal certificate",
        caption: "RoboCup Portugal certificate.",
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
      "This publication came from my Master's thesis on full-body planning for mobile manipulators. Mobile manipulators combine a mobile base with a robotic arm, creating a high-dimensional control problem: moving the base and arm together must account for many more constraints than controlling each part separately.",
      "The paper presents a reinforcement-learning local planner that moves the mobile base and manipulator arm simultaneously toward a target pose and arm configuration, while avoiding collisions with the environment. It uses a teacher-student framework: a teacher agent is trained with privileged information, and a student agent learns to perform the task from sensor observations, using a downsampled point-cloud representation for better generalization to unseen obstacles.",
      "The results show that the learned local planner can navigate cluttered environments and transfer to more complex obstacle shapes than those seen during training. In the full thesis, I further integrated this local planner with a classical global planner, enabling navigation over longer distances and more complex paths.",
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
        caption: "ICARSC certificate.",
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
        caption: "Quidgest internship certificate.",
      },
    ],
    cover: "assets/images/quidgest.webp",
  },
  outreach: {
    title: "Sharing robotics research",
    meta: "Science outreach · JEEC",
    summary:
      "Introducing students to our robotics research and live demonstrations.",
    paragraphs: [
      "I helped promote SocRob@Home to students through events such as JEEC, explaining the project's goals and our work on domestic robots.",
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
        caption: "NOS Hackathon 2025 certificate.",
      },
    ],
    coverKind: "hackathon",
  },
};
