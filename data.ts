export const products = [
  {
    id: "p1",
    name: "Hydraulic Pump",
    stock: 8,
    description: "High-performance hydraulic pump suitable for industrial use.",
    price: 1200,
    images: ["/hydraulic_pump/hydraulic_pump_3.jpg", "/hydraulic_pump/hydraulic_pump.jpg", "/hydraulic_pump/hydraulic_pump2.jpg"],
    category: "Hydraulics",
    catalog: "Industrial",
    condition: "New",
    model: "HPX-200",
  },
  {
    id: "p2",
    name: "Turbocharger Kit",
    stock: 15,
    description: "Boost your engine power with this efficient turbocharger kit.",
    price: 950,
    images: ["/turbo_charger_kit/turbo_charger_kit_2.jpg", "/turbo_charger_kit/turbo_chargerkit_1.jpeg"],
    category: "Engine Parts",
    catalog: "Automotive",
    condition: "New",
    model: "TURBO-X1",
  },
  {
    id: "p3",
    name: "Radiator Assembly",
    stock: 5,
    description: "Aluminum radiator offering superior cooling efficiency.",
    price: 670,
    images: ["/radiator_assembly/radiator-assembly (1).jpg","/radiator_assembly/radiator-assembly.jpg" ],
    category: "Cooling System",
    catalog: "Automotive",
    condition: "Used",
    model: "RAD-A3",
  },
  {
    id: "p4",
    name: "Fuel Injector",
    stock: 25,
    description: "Precision fuel injector ensuring optimal combustion.",
    price: 210,
    images: ["/fuel_injector/fuel_injector.avif", "/fuel_injector/fuel_injector_2.jpeg"],
    category: "Fuel System",
    catalog: "Automotive",
    condition: "New",
    model: "FJ-99",
  },
  {
    id: "p5",
    name: "Alternator Assembly",
    stock: 10,
    description: "Reliable alternator for consistent power supply.",
    price: 480,
    images: ["/alternator/alternator_assembly_2.webp", "/alternator/alternator_assembly.webp"],
    category: "Electrical",
    catalog: "Automotive",
    condition: "Refurbished",
    model: "ALT-R12",
  },
  {
    id: "p6",
    name: "Air Filter",
    stock: 60,
    description: "High-efficiency air filter for clean engine airflow.",
    price: 45,
    images: ["/air_filter/air_filter_2.jpg", "/air_filter/air_filter.jpg"],
    category: "Filters",
    catalog: "Automotive",
    condition: "New",
    model: "AF-22",
  },
  {
    id: "p7",
    name: "Brake Disc Set",
    stock: 18,
    description: "Heavy-duty brake discs ensuring safety and performance.",
    price: 320,
    images: ["/brake-disc/brake_disc.jpg", "/brake-disc/brake_disc_2.webp"],
    category: "Brakes",
    catalog: "Automotive",
    condition: "New",
    model: "BD-900",
  },
  {
    id: "p8",
    name: "Transmission Gearbox",
    stock: 6,
    description: "Smooth-shifting transmission gearbox for performance cars.",
    price: 2400,
    images: ["/gear_box/gear_box_2.jpg", "/gear_box/gear_box.jpg"],
    category: "Transmission",
    catalog: "Automotive",
    condition: "Used",
    model: "TR-G5",
  },
  {
    id: "p9",
    name: "Suspension Strut",
    stock: 22,
    description: "Durable suspension strut providing stability on all terrains.",
    price: 360,
    images: ["/suspension/suspension_2.jpg", "/suspension/suspension.jpg"],
    category: "Suspension",
    catalog: "Automotive",
    condition: "New",
    model: "SS-550",
  },
  {
    id: "p10",
    name: "Exhaust Muffler",
    stock: 9,
    description: "Stainless steel exhaust muffler with reduced noise levels.",
    price: 290,
    images: ["/exhaust/exhaust-muffler.jpg", "/exhaust/exhaust_muffler_2.webp"],
    category: "Exhaust",
    catalog: "Automotive",
    condition: "New",
    model: "XM-44",
  },
  {
    id: "p11",
    name: "Carburetor Assembly",
    stock: 13,
    description: "Efficient carburetor providing smooth fuel delivery.",
    price: 380,
    images: ["/carbeurator/carbeurator-2.webp", "/carbeurator/carbeurator.avif"],
    category: "Fuel System",
    catalog: "Classic Cars",
    condition: "Refurbished",
    model: "CBR-7",
  },
  {
    id: "p12",
    name: "Engine Mount",
    stock: 30,
    description: "Durable engine mount minimizing vibration.",
    price: 120,
    images: ["/engine_mount/engine_mounting_2.jpg"  ,"/engine_mount/engine_mounting.jpg"],
    category: "Engine Parts",
    catalog: "Automotive",
    condition: "New",
    model: "EM-300",
  },
  {
    id: "p13",
    name: "Oil Filter",
    stock: 75,
    description: "Premium oil filter ensuring clean engine oil.",
    price: 25,
    images: ["/oil_filter/oil_filter_2.jpg", "/oil_filter/oil_filter.jpg"],
    category: "Filters",
    catalog: "Automotive",
    condition: "New",
    model: "OF-12",
  },
  {
    id: "p14",
    name: "Headlight Assembly",
    stock: 11,
    description: "LED headlight assembly for improved visibility.",
    price: 420,
    images: ["/headlight_assembly/headlight_assembly_2.jpg", "/headlight_assembly/headlight_assembly.webp"],
    category: "Lighting",
    catalog: "Automotive",
    condition: "New",
    model: "HL-500",
  },
 
];
export type Product = {
  id: string;
  name: string;
  stock: number;
  description: string;
  price: number;
  images: string[];
  category: string; 
  catalog: string; 
  condition: string;
  model: string;
};

export type addtocart = {
  id:string;
  name:string,
  images:string[],
  price:number,
  model:string,
  condition:string,
  category:string
}



export type Category = {
  id: string;
  title: string; // e.g. "Electrical"
  img: string; // category thumbnail
  items: string[]; // e.g. ["Circuit Breakers", "Electric Motors", "Relays, Timers & Counters"]
};

export type Catalog = {
  id: string;
  title: string; // e.g. "Pepperl Fuchs Proximity Sensors"
  img: string;
  link?: string; // optional
};


export const categories: Category[] = [
  {
    id: "c1",
    title: "Hydraulics",
    img: "/hydraulic_pump/face.png",
    items: [
      "Hydraulic Pumps",
      "Hydraulic Valves",
      "Hydraulic Filtration",
      "Hydraulic Cylinders",
    ],
  },
  {
    id: "c2",
    title: "Engine Parts",
    img: "/engine_mount/face.webp",
    items: [
      "Motor Drives",
      "PCB Boards",
      "HMIs & Displays",
      "PLC and DCS Modules",
    ], // from Automation & Controls — fits well with engine electronics
  },
  {
    id: "c3",
    title: "Cooling System",
    img: "/radiator_assembly/face.png",
    items: [
      "Centrifugal Pumps",
      "Metering Pumps",
      "Submersible Parts",
      "Diaphragm Parts",
    ], // from Pumps category — aligns with cooling flow systems
  },
  {
    id: "c4",
    title: "Fuel System",
    img: "/fuel_injector/face.jpg",
    items: ["Actuators", "Plumbing", "Positioners", "Valves"], // from Valves & Plumbing
  },
  {
    id: "c5",
    title: "Electrical",
    img: "/alternator/face.jpg",
    items: [
      "Circuit Breakers",
      "Electric Motors",
      "Relays, Timers & Counters",
      "Electrical Components",
    ],
  },
  {
    id: "c6",
    title: "Filters",
    img: "/air_filter/face.jpg",
    items: ["Air Treatment", "Cylinders & Actuators", "Valves", "Relays"], // from Pneumatics — filtration/air control
  },
  {
    id: "c7",
    title: "Brakes",
    img: "/brake-disc/face.jpeg",
    items: ["Bushings", "Bearings", "Belts", "Brakes & Clutches"], // from Power Transmission
  },
  {
    id: "c8",
    title: "Transmission",
    img: "/gear_box/face.avif",
    items: ["Bushings", "Bearings", "Belts", "Brakes & Clutches"], // same as above, drivetrain alignment
  },
  {
    id: "c9",
    title: "Suspension",
    img: "/suspension/face.webp",
    items: ["Hand Tools", "Hydraulic Tools", "Measurement Tools", "Metalworking Tools"], // from Tools — fits for repair/maintenance
  },
  {
    id: "c10",
    title: "Exhaust",
    img: "/exhaust/face.webp",
    items: ["Valves", "Positioners", "Actuators", "Plumbing"], // from Valves & Plumbing — exhaust systems often valve-based
  },
  {
    id: "c11",
    title: "Lighting",
    img: "/headlight_assembly/face.jpg",
    items: ["HMIs & Displays", "Electric Motors", "Electrical Components", "Relays"], // from Automation & Electrical — supports lighting control
  },
];


export const catalogs:Catalog[] = [
  {
    id: "catalog001",
    title: "Engine Systems Catalog",
    img:'/engine_mount/catalog.jpeg'
  },
  {
    id: "catalog002",
    title: "Hydraulics & Pumps Catalog",
    img:'/hydraulic_pump/catalog.jpg'
  },
  {
    id: "catalog003",
    title: "Electrical & Control Units Catalog",
    img:'/alternator/catalog.png'
  },
  {
    id: "catalog004",
    title: "Drivetrain & Transmission Catalog",
    img:'/gear_box/catalog.jpg'
  },
  {
    id: "catalog005",
    title: "Cooling & Filtration Systems Catalog",
    img:'/radiator_assembly/catalog.jpeg'
  },
  {
    id: "catalog007",
    title: "Fuel Management Systems Catalog",
    img:'/fuel_injector/catallog.avif'
  },
  {
    id: "catalog008",
    title: "Suspension & Steering Catalog",
    img:'/suspension/catalog.webp'
  },

];
