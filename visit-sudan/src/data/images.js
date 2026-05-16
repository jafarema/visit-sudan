/**
 * Image manifest for Visit Sudan.
 *
 * The site is built so every image source is a string in this single file.
 * To swap placeholders for real Sudan photography, drop your files in
 * /public/images/visit-sudan/ and change the values below.
 *
 * Default: Unsplash CDN URLs that read as "warm desert / Nile / Red Sea /
 * African market" — close enough to the desired mood for a live preview.
 * They are licensed under the Unsplash License (free to use).
 */
const local = (name) => `./images/visit-sudan/${name}`;

// Set USE_LOCAL=true once the real local files are in place.
const USE_LOCAL = false;

const REMOTE = {
  meroeHero:
    "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1800&q=85",
  nileSunset:
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1800&q=85",
  redSeaPortSudan:
    "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1800&q=85",
  nubianVillage:
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1800&q=85",
  coffeeRitual:
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1800&q=85",
  desertCamp:
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1800&q=85",
  khartoumNile:
    "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=1800&q=85",
  jebelBarkal:
    "https://images.unsplash.com/photo-1542800651-4ce98c5be8b9?auto=format&fit=crop&w=1800&q=85",
  sudaneseMarket:
    "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&w=1800&q=85",
};

const LOCAL = {
  meroeHero: local("meroe-hero.jpg"),
  nileSunset: local("nile-sunset.jpg"),
  redSeaPortSudan: local("red-sea-port-sudan.jpg"),
  nubianVillage: local("nubian-village.jpg"),
  coffeeRitual: local("coffee-ritual.jpg"),
  desertCamp: local("desert-camp.jpg"),
  khartoumNile: local("khartoum-nile.jpg"),
  jebelBarkal: local("jebel-barkal.jpg"),
  sudaneseMarket: local("sudanese-market.jpg"),
};

export const VISIT_SUDAN_IMAGES = USE_LOCAL ? LOCAL : REMOTE;
