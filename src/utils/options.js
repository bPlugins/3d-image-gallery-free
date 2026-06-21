import { __ } from "@wordpress/i18n";

export const generalStyleTabs = [
  { name: "general", title: __("General", "image-gallery") },
  { name: "style", title: __("Style", "image-gallery") },
];

export const styleItems = {
  styleDefault: {
    cId: "",
    gallery: [
      {
        id: 1,
        title: "Title 1",
        subtitle: "Subtitle 1",
        images: [],
        colors: {
          color: "#fff",
          bgType: "solid",
          bg: "#505a64d9",
        },
        btnColors: {
          color: "#fff",
          bgType: "solid",
          bg: "#000a1480",
        },
      },
      {
        id: 2,
        title: "Title 2",
        subtitle: "Subtitle 2",
        images: [],
        colors: {
          color: "#fff",
          bgType: "solid",
          bg: "#505a64d9",
        },
        btnColors: {
          color: "#fff",
          bgType: "solid",
          bg: "#000a1480",
        },
      },
      {
        id: 3,
        title: "Title 3",
        subtitle: "Subtitle 3",
        images: [],
        colors: {
          color: "#fff",
          bgType: "solid",
          bg: "#505a64d9",
        },
        btnColors: {
          color: "#fff",
          bgType: "solid",
          bg: "#000a1480",
        },
      },
    ],
    imagesData: { images: [] },
    styles: {},
    slideSpeed: 3,
    itemHeight: "550px",
    columns: {
      desktop: 3,
      tablet: 2,
      mobile: 1,
    },
    columnGap: "30px",
    rowGap: "40px",
    background: {
      type: "gradient",
      gradient: "linear-gradient(#ff5f6d, #ffc371)",
    },
    shadow: {
      vOffset: "4px",
      blur: "4px",
      spreed: "0px",
      color: "#000a1459",
    },
    hoverShadow: {
      vOffset: "12px",
      blur: "20px",
      spreed: "-12px",
      color: "#000a14cc",
    },
    titleTypo: {
      fontSize: {
        desktop: 48,
        tablet: 40,
        mobile: 32,
      },
    },
    subtitleTypo: {
      fontSize: {
        desktop: 20,
        tablet: 18,
        mobile: 16,
      },
    },
  },
  styleOne: {
    imagesData: {
      id: "polaroid",
      name: "Polaroid Style",
      description: "Gallery with polaroid-like image frames",
      showDate: true,
      images: [
        {
          id: "1",
          url: "https://templates.bplugins.com/wp-content/uploads/2025/07/pexels-photo-1001990-min-scaled.jpeg",
          title: "Vintage City",
          description: "City street with vintage feel",
          width: {
            desktop: 800,
            mobile: 400,
            tablet: 600,
          },
          height: {
            desktop: 1200,
            mobile: 500,
            tablet: 800,
          },
          category: "urban",
          date: "2023-04-15",
        },
        {
          id: "2",
          url: "https://templates.bplugins.com/wp-content/uploads/2025/07/pexels-photo-1001991-min-scaled.jpeg",
          title: "Coffee Moment",
          description: "Cup of coffee on wooden table",
          width: {
            desktop: 800,
            mobile: 400,
            tablet: 600,
          },
          height: {
            desktop: 500,
            mobile: 300,
            tablet: 450,
          },
          category: "lifestyle",
          date: "2023-05-20",
        },
        {
          id: "3",
          url: "https://templates.bplugins.com/wp-content/uploads/2025/07/misurina-sunset_181624-34793-min.jpg",
          title: "Autumn Leaves",
          description: "Colorful leaves in autumn",
          width: {
            desktop: 800,
            mobile: 400,
            tablet: 600,
          },
          height: {
            desktop: 800,
            mobile: 300,
            tablet: 450,
          },
          category: "nature",
          date: "2023-10-10",
        },
        {
          id: "4",
          url: "https://templates.bplugins.com/wp-content/uploads/2025/07/old-rusty-fishing-boat-slope-along-shore-lake_181624-44902-min.jpg",
          title: "Retro Bicycle",
          description: "Vintage bicycle parked on street",
          width: {
            desktop: 800,
            mobile: 400,
            tablet: 600,
          },
          height: {
            desktop: 1000,
            mobile: 300,
            tablet: 450,
          },
          category: "lifestyle",
          date: "2023-07-12",
        },
        {
          id: "5",
          url: "https://templates.bplugins.com/wp-content/uploads/2025/07/pexels-photo-1366931-min-scaled.jpeg",
          title: "Colorful Street",
          description: "Vibrant street with colorful buildings",
          width: {
            desktop: 800,
            mobile: 400,
            tablet: 600,
          },
          height: {
            desktop: 600,
            mobile: 300,
            tablet: 450,
          },
          category: "lifestyle",
          date: "2023-07-12",
        },
        {
          id: "6",
          url: "https://templates.bplugins.com/wp-content/uploads/2025/07/vestrahorn-mountains-stokksnes-iceland_335224-667-min.jpg",
          title: "Summer Beach",
          description: "Sandy beach with blue sky",
          width: {
            desktop: 800,
            mobile: 400,
            tablet: 600,
          },
          height: {
            desktop: 1100,
            mobile: 300,
            tablet: 450,
          },
          category: "nature",
          date: "2023-08-30",
        },
      ],
    },
    styles: {
      card: {
        width: {
          desktop: "18rem",
          tablet: "18rem",
          mobile: "18rem",
        },
        height: {
          desktop: "250px",
          tablet: "250px",
          mobile: "250px",
        },
        gap: {
          desktop: "2rem",
          tablet: "2rem",
          mobile: "2rem",
        },
      },
      columns: {
        desktop: 3,
        tablet: 2,
        mobile: 1,
      },
      title: {
        typography: {
          fontSize: {
            desktop: 16,
            tablet: 16,
            mobile: 16,
          },
          fontWeight: 600,
          lineHeight: "1.125",
        },
        color: "#111827",
        margin: {
          desktop: {
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          },
          tablet: {
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          },
          mobile: {
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          },
        },
      },
      description: {
        typography: {
          fontSize: {
            desktop: 14,
            tablet: 14,
            mobile: 14,
          },
          lineHeight: "1.25rem",
        },
        color: "#4b5563",
        margin: {
          desktop: {
            top: "4px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          },
          tablet: {
            top: "4px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          },
          mobile: {
            top: "4px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          },
        },
      },
      date: {
        typography: {
          fontSize: {
            desktop: 12,
            tablet: 12,
            mobile: 12,
          },
          lineHeight: "1rem",
        },
        color: "#9ca3af",
        margin: {
          desktop: {
            top: "8px",
            right: "0px",
            bottom: "8px",
            left: "0px",
          },
          tablet: {
            top: "8px",
            right: "0px",
            bottom: "8px",
            left: "0px",
          },
          mobile: {
            top: "8px",
            right: "0px",
            bottom: "8px",
            left: "0px",
          },
        },
      },
      modal: {
        title: {
          typography: {
            fontSize: {
              desktop: 20,
              tablet: 20,
              mobile: 20,
            },
            fontWeight: 600,
            lineHeight: "1.125",
          },
          color: "#ffffff",
          margin: {
            desktop: {
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            },
            tablet: {
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            },
            mobile: {
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            },
          },
        },
        description: {
          typography: {
            fontSize: {
              desktop: 14,
              tablet: 14,
              mobile: 14,
            },
            lineHeight: "1.25rem",
          },
          color: "#ffffff",
          margin: {
            desktop: {
              top: "4px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            },
            tablet: {
              top: "4px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            },
            mobile: {
              top: "4px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            },
          },
        },
      },
      shadow: [
        {
          hOffset: "0px",
          vOffset: "20px",
          blur: "25px",
          spreed: "-5px",
          color: "rgba(0, 0, 0, 0.1)",
          isInset: false,
        },
        {
          hOffset: "0px",
          vOffset: "10px",
          blur: "10px",
          spreed: "-5px",
          color: "rgba(0, 0, 0, 0.04)",
          isInset: false,
        },
      ],
      hoverShadow: [
        {
          hOffset: "0px",
          vOffset: "25px",
          blur: "50px",
          spreed: "-12px",
          color: "rgba(0, 0, 0, 0.25)",
          isInset: false,
        },
      ],

      container: {
        bg: {
          desktop: {
            type: "solid",
            color: "#ffffff",
            gradient: "linear-gradient(184deg, #2b3035 0%, #343a40 25.55%)",
            image: {
              url: "https://plus.unsplash.com/premium_photo-1672116453118-5971acb7b93b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            position: "center center",
            repeat: "no-repeat",
            size: "cover",
            overlayColor: "#00000080",
          },
          mobile: {
            type: "solid",
            color: "#ffffff",
            gradient: "linear-gradient(184deg, #2b3035 0%, #343a40 25.55%)",
            image: {
              url: "https://plus.unsplash.com/premium_photo-1672116453118-5971acb7b93b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            position: "center center",
            repeat: "no-repeat",
            size: "cover",
            overlayColor: "#00000080",
          },
          tablet: {
            type: "solid",
            color: "#ffffff",
            gradient: "linear-gradient(184deg, #2b3035 0%, #343a40 25.55%)",
            image: {
              url: "https://plus.unsplash.com/premium_photo-1672116453118-5971acb7b93b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            position: "center center",
            repeat: "no-repeat",
            size: "cover",
            overlayColor: "#00000080",
          },
        },
        borderRadius: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        margin: {
          desktop: {
            top: "32px",
            right: "0px",
            bottom: "32px",
            left: "0px",
          },
          tablet: {
            top: "32px",
            right: "0px",
            bottom: "32px",
            left: "0px",
          },
          mobile: {
            top: "32px",
            right: "0",
            bottom: "32px",
            left: "0",
          },
        },
        padding: {
          desktop: {
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          },
          tablet: {
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          },
          mobile: {
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          },
        },
      },
    },
  },
};

export const galleryAttr = [
  {
    id: 1,
    title: "Title 1",
    subtitle: "Subtitle 1",
    images: [],
    background:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_monobg.jpg",
    top: "50px",
    right: "-10px",
    left: "",
    height: "100%",
    width: "",
    pos: "center",
    colors: {
      color: "#fff",
      bgType: "solid",
      bg: "#505a64d9",
    },
    btnColors: {
      color: "#fff",
      bgType: "solid",
      bg: "#000a1480",
    },
  },
  {
    id: 2,
    title: "Title 2",
    subtitle: "Subtitle 2",
    images: [],
    background:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_spirited.jpg",
    top: "70px",
    width: "",
    right: "",
    left: "",
    height: "100%",
    pos: "center",
    colors: {
      color: "#fff",
      bgType: "solid",
      bg: "#505a64d9",
    },
    btnColors: {
      color: "#fff",
      bgType: "solid",
      bg: "#000a1480",
    },
  },
  {
    id: 3,
    title: "Title 3",
    subtitle: "Subtitle 3",
    images: [],
    top: "5px",
    left: "-4px",
    height: "110%",
    width: "",
    right: "",
    background:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlbg.jpg",
    pos: "center",
    colors: {
      color: "#fff",
      bgType: "solid",
      bg: "#505a64d9",
    },
    btnColors: {
      color: "#fff",
      bgType: "solid",
      bg: "#000a1480",
    },
  },
];

export const getNewItemByStyle = (styleSl) => {
  switch (styleSl) {
    case "styleOne":
      return {
        id: Math.random().toString(36).substring(2, 9),
        url: "https://templates.bplugins.com/wp-content/uploads/2025/07/pexels-photo-1001990-min-scaled.jpeg",
        title: "Vintage City",
        description: "City street with vintage feel",
        width: {
          desktop: 800,
          mobile: 400,
          tablet: 600,
        },
        height: {
          desktop: 1200,
          mobile: 500,
          tablet: 800,
        },
        category: "urban",
        date: "2023-04-15",
      };
    default:
      return {};
  }
};

export const toolTipPresets = [
  {
    label: "Default",
    value: "styleDefault",
    img: "https://templates.bplugins.com/wp-content/uploads/2025/07/Screenshot_55.png",
    height: "auto",
    width: "160px",
  },
  {
    label: "Style One",
    value: "styleOne",
    img: "https://templates.bplugins.com/wp-content/uploads/2025/07/Screenshot_57.png",
    height: "auto",
    width: "160px",
  },
];

export const galleryOptions = [
  { label: "Default", value: "styleDefault" },
  { label: "Style 1", value: "styleOne" },
];
