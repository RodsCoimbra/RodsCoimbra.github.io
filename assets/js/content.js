/* Expanded card content. Add/remove any number of media items.
   Supported entries INSIDE a media array (separate entries with commas):
   { type: "image", src: "assets/images/photo.jpg", alt: "Describe the image", caption: "Caption" }
   { type: "video", src: "assets/videos/demo.mp4", poster: "assets/images/poster.jpg", caption: "Demo", tracks: [{ src: "assets/videos/demo-en.vtt", srclang: "en", label: "English", default: true }] }
   { type: "youtube", id: "YOUR_VIDEO_ID", caption: "Demo" }
   The local video poster and captions tracks are optional.
   Use a real 11-character YouTube ID. No example videos are enabled by default.
   All paths are relative to index.html, not to this JavaScript file.
   Visible card covers and summaries are edited in index.html.
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
    // {
    //   type: "video",
    //   src: "assets/videos/eurobin_demo.mp4",
    //   poster: "assets/images/eurobin_demo.jpg",
    //   caption: "Domestic-robotics demonstration.",
    // },
    // {
    //   type: "image",
    //   src: "assets/images/eurobin-project.jpeg",
    //   alt: "euROBIN domestic-robotics demonstration",
    //   caption: "Domestic-robotics demonstration.",
    // },
    // {
    //   "type": "youtube",
    //   "id": "IQKxkcPtKPo",
    //   "caption": "Domestic-robotics demonstration."
    // }
    media: [
      // {
      //   type: "youtube",
      //   id: "IQKxkcPtKPo",
      //   caption: "Demonstration of the euROBIN task",
      // },
      {
        type: "video",
        src: "assets/videos/eurobin_demo.mp4",
        poster: "assets/images/eurobin_demo.jpg",
        caption: "Demonstration of the euROBIN task.",
      },
      {
        type: "image",
        src: "assets/images/eurobin-project.jpeg",
        alt: "euROBIN domestic-robotics demonstration",
        caption: "Domestic-robotics demonstration.",
      },
      {
        type: "image",
        src: "assets/images/eurobin_demo_parliament.gif",
        alt: "Research teams at the European Parliament demonstration",
        caption: "Parliament Demonstration.",
      },
      {
        type: "image",
        src: "assets/images/eurobin-all-teams.jpeg",
        alt: "Research teams at the European Parliament demonstration",
        caption: "Participating research teams, Brussels.",
      },
    ],
    link: {
      href: "https://www.eurobin-project.eu/",
      label: "Visit project",
    },
    cover: "eurobin-project.jpeg",
    placeholder: null,
  },
  fomo: {
    title: "FOMO-HODOR",
    meta: "2025 — Present",
    summary:
      "Mapping, navigation, and basic manipulation for foundation-model research on humanoid domestic robots.",
    paragraphs: [
      "FOMO-HODOR brings together ISR, INESC-ID, and the University of Texas at Austin to explore foundation models for humanoid domestic robots.",
      "I contributed environment mapping, navigation, and basic manipulation capabilities, collaborating with researchers on the core robot capabilities needed for the project.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/oracle_project.jpg",
        alt: "FOMO-HODOR research project",
        caption: "FOMO-HODOR research project.",
      },
    ],
    link: {
      href: "https://irsgroup.isr.tecnico.ulisboa.pt/fomo-hodor/",
      label: "Visit project",
    },
    cover: "oracle_project.jpg",
    placeholder: null,
  },
  socrob: {
    title: "SocRob@Home",
    meta: "2024 — Present",
    summary:
      "Humanoid navigation and mobile-manipulator software for domestic service robotics.",
    paragraphs: [
      "As part of SocRob@Home, my primary responsibility has been developing autonomous navigation for the team’s humanoid robot.",
      "I also contribute to the mobile manipulator’s manipulation pipeline. The project connects domestic-robotics research with practical demonstrations and international competitions, including RoboCup@Home.",
    ],
    media: [
      {
        type: "image",
        src: "assets/images/robocup_photo.jpg",
        alt: "SocRob team at RoboCup@Home",
        caption: "SocRob@Home at RoboCup.",
      },
    ],
    link: {
      href: "https://irs-group.github.io/socrobwebsite/",
      label: "Visit project",
    },
    cover: "robocup_photo.jpg",
    placeholder: null,
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
        src: "assets/images/icarsc_presentation.jpg",
        alt: "Rodrigo Coimbra presenting at ICARSC 2026",
        caption: "Research presentation at ICARSC 2026, Barcelos.",
      },
    ],
    link: {
      href: "https://ieeexplore.ieee.org/document/11523319",
      label: "View paper",
    },
    cover: "icarsc_presentation.jpg",
    placeholder: null,
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
        src: "assets/images/eurobin-all-teams.jpeg",
        alt: "Research teams at the European Parliament demonstration",
        caption: "European Parliament demonstration, Brussels.",
      },
      {
        type: "image",
        src: "assets/images/eurobin-project.jpeg",
        alt: "euROBIN robotics demonstration",
        caption: "Domestic-robotics demonstration.",
      },
    ],
    link: null,
    cover: "eurobin-all-teams.jpeg",
    placeholder: null,
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
        src: "assets/images/jeec.jpg",
        alt: "Robotics outreach at JEEC",
        caption: "Sharing robotics research at JEEC.",
      },
    ],
    link: null,
    cover: "jeec.jpg",
    placeholder: null,
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
        src: "assets/images/icarsc_presentation.jpg",
        alt: "Rodrigo Coimbra delivering his ICARSC presentation",
        caption: "ICARSC 2026 research presentation.",
      },
    ],
    link: {
      href: "https://ieeexplore.ieee.org/document/11523319",
      label: "View paper",
    },
    cover: "icarsc_presentation.jpg",
    placeholder: null,
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
        src: "assets/images/santander_running.jpg",
        alt: "Rodrigo Coimbra running",
        caption: "Running with Grupo Desportivo do Santander.",
      },
      {
        type: "image",
        src: "assets/images/santander_hiking.jpg",
        alt: "Rodrigo Coimbra hiking",
        caption: "Hiking with Grupo Desportivo do Santander.",
      },
      {
        type: "image",
        src: "assets/images/santander_hiking_2.jpg",
        alt: "Rodrigo Coimbra hiking",
        caption: "Hiking with Grupo Desportivo do Santander.",
      },
    ],
    link: null,
    cover: "santander_running.jpg",
    placeholder: null,
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
        src: "assets/images/volleyball_team_back.jpg",
        alt: "Rodrigo Coimbra playing volleyball",
        caption: "Volleyball team photo.",
      },
      {
        type: "image",
        src: "assets/images/volleyball_team.png",
        alt: "Rodrigo Coimbra playing volleyball",
        caption: "Volleyball team photo.",
      },
      {
        type: "image",
        src: "assets/images/volleyball_team_2.png",
        alt: "Rodrigo Coimbra playing volleyball",
        caption: "Volleyball competition photo.",
      },
    ],
    link: null,
    cover: "volleyball_team_back.jpg",
    placeholder: null,
  },
};
