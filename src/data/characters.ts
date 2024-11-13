export interface Character {
  id: number;
  name: string;
  image: string;
  description: string;
  votes: number;
}

export const characters: Character[] = [
  {
    id: 1,
    name: "Luna Smith ",
    image: "/tago.png",
    description: "A mysterious mage who harnesses the power of celestial magic.",
    votes: 150
  },
  {
    id: 2,
    name: "Atlas",
    image: "tago.png",
    description: "A legendary warrior known for his unbreakable spirit and determination.",
    votes: 120
  },
  {
    id: 3,
    name: "Nova",
    image: "tago.png",
    description: "Rising from the ashes, she commands the eternal flames of rebirth.",
    votes: 180
  },
  {
    id: 4,
    name: "Zephyr",
    image: "tago.png",
    description: "A swift and silent assassin who moves like the wind itself.",
    votes: 90
  },
  {
    id: 5,
    name: "Terra",
    image: "tago.png",
    description: "Guardian of nature who commands the ancient powers of the earth.",
    votes: 135
  },
  {
    id: 6,
    name: "Cyrus",
    image: "tago.png",
    description: "Master of ice magic with an unwavering dedication to justice.",
    votes: 110
  },
  {
    id: 7,
    name: "Athena",
    image: "tago.png",
    description: "A fierce warrior who wields the power of the gods.",
    votes: 140
  },
  {
    id: 8,
    name: "Apollo",
    image: "tago.png",
    description: "A wise and powerful sorcerer who wields the power of the stars.",
    votes: 100
  },
  {
    id: 9,
    name: "Artemis",
    image: "tago.png",
    description: "A fierce warrior who wields the power of the gods.",
    votes: 120
  },
  {
    id: 10,
    name: "Hermes",
    image: "tago.png",
    description: "A skilled archer who wields the power of the gods.",
    votes: 110
  }
];