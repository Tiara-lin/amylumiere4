export interface Post {
  id: string;
  username: string;
  userImage: string;
  location?: string;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  caption: string;
  likes: number;
  timestamp: string;
  comments: { username: string; text: string }[];
}

export const posts: Post[] = [
  {
    "id": "1",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/chMm3ncq/9.jpg",
    "location": "Paris, France",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/tPbhGfmr/1.jpg"
    },
    "caption": "Soft power. Quiet confidence. Real beauty.",
    "likes": 10343,
    "timestamp": "2 HOURS AGO",
    "comments": [
      { "username": "dylan_49", "text": "☀️☕" },
      { "username": "ruby_59", "text": "Effortless and earned" },
      { "username": "ben26", "text": "Rooted in light" },
      { "username": "candy_61", "text": "No edits needed" },
      { "username": "kevin53", "text": "Serenity queen" },
      { "username": "lucy75", "text": "Courage is calm" },
      { "username": "mia.59", "text": "Golden in motion" },
      { "username": "rachel.09", "text": "Dream shape" },
      { "username": "sara11", "text": "🎧🪑" },
      { "username": "ryan80", "text": "🧷🌊" }
    ]
  },
  {
    "id": "2",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/chMm3ncq/9.jpg",
    "location": "Paris, France",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/FL45n0FD/2.jpg"
    },
    "caption": "My shape doesn’t need fixing. It needs space.",
    "likes": 10020,
    "timestamp": "2025/05/01",
    "comments": [
      { "username": "amy96", "text": "Soul peace" },
      { "username": "dylan14", "text": "Quiet courage" },
      { "username": "nate.19", "text": "Shape of strength" },
      { "username": "amy26", "text": "Beauty: unfiltered" },
      { "username": "rachel60", "text": "Air of magic" },
      { "username": "zoe_43", "text": "Realness in frame" },
      { "username": "sara_48", "text": "Flow state" },
      { "username": "ruby_02", "text": "Stilled and centered" },
      { "username": "leo.09", "text": "🌊✨" },
      { "username": "mia_92", "text": "Unbothered grace" }
    ]
  },
  {
    "id": "3",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/chMm3ncq/9.jpg",
    "location": "Tuscany, Italy",
    "media": {
      "type": "video",
      "url": "https://res.cloudinary.com/ddunt6myr/video/upload/v1754024802/%E6%9C%AA%E5%91%BD%E5%90%8D_1024_x_1024_%E5%83%8F%E7%B4%A0_eikho6.mp4"
    },
    "caption": "I belong here. So does my body.",
    "likes": 9724,
    "timestamp": "2025/04/10",
    "comments": [
      { "username": "kevin10", "text": "🧘‍♀️🫶" },
      { "username": "mark66", "text": "🥹✨" },
      { "username": "tyler_29", "text": "🪞🌿" },
      { "username": "mark76", "text": "💥📍" },
      { "username": "zoe23", "text": "🌤️🪞" },
      { "username": "leo36", "text": "Composed and whole" },
      { "username": "nora65", "text": "Smile says everything" },
      { "username": "faye18", "text": "Owning the now" },
      { "username": "nate.55", "text": "Nourished inside" },
      { "username": "nora_34", "text": "Tender terrain" }
    ]
  },
  {
    "id": "4",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/chMm3ncq/9.jpg",
    "location": "Los Angeles, CA",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/1fkDMJzH/4.jpg"
    },
    "caption": "Joy tastes better when you love yourself.",
    "likes": 11248,
    "timestamp": "2025/03/25",
    "comments": [
      { "username": "candy_31", "text": "She is poetry" },
      { "username": "dan_55", "text": "Full stop beauty" },
      { "username": "lily.11", "text": "🌸💪" },
      { "username": "ruby.47", "text": "Chose self" },
      { "username": "jess.16", "text": "🫶📸" },
      { "username": "dylan.03", "text": "Glow in silence" },
      { "username": "tyler94", "text": "Kind to her shape" },
      { "username": "candy82", "text": "Joy on display" },
      { "username": "tyler_10", "text": "Gentle and firm" },
      { "username": "lucy_15", "text": "🌁👣" }
    ]
  },
  {
    "id": "5",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/chMm3ncq/9.jpg",
    "location": "Barcelona, Spain",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/Lh5M77zV/5.jpg"
    },
    "caption": "I don’t fit in a frame—I redefine it.",
    "likes": 10877,
    "timestamp": "2025/03/01",
    "comments": [
      { "username": "leo68", "text": "Unshaken beauty" },
      { "username": "rachel_96", "text": "Moves like music" },
      { "username": "mia.72", "text": "🍂✨" },
      { "username": "dan49", "text": "🖼️🌼" },
      { "username": "ruby_96", "text": "Free and framed" },
      { "username": "sophie59", "text": "Space holder" },
      { "username": "lucy.54", "text": "🔥🧡" },
      { "username": "ben.55", "text": "Eyes tell her story" },
      { "username": "mia_58", "text": "🌾🧡" },
      { "username": "hana54", "text": "Infinite curve" }
    ]
  },
  {
    "id": "6",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/chMm3ncq/9.jpg",
    "location": "Amsterdam, Netherlands",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/0RwvcTR9/6.jpg"
    },
    "caption": "I carry the softness the world needs.",
    "likes": 10594,
    "timestamp": "2025/02/05",
    "comments": [
      { "username": "luke56", "text": "💗🧘" },
      { "username": "candy.17", "text": "Walking her worth" },
      { "username": "dylan_86", "text": "Owns the frame" },
      { "username": "leo_39", "text": "Confidence sits well" },
      { "username": "rachel.75", "text": "Built like poetry" },
      { "username": "faye52", "text": "🌅📘" },
      { "username": "ella_01", "text": "Proud in posture" },
      { "username": "sophie48", "text": "🎧💡" },
      { "username": "nate.46", "text": "Built to bloom" },
      { "username": "ruby.52", "text": "Undeniably her" }
    ]
  },
  {
    "id": "7",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/chMm3ncq/9.jpg",
    "location": "Berlin, Germany",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/yn7YDxCM/7.jpg"
    },
    "caption": "Strong doesn’t mean shrinking your shine.",
    "likes": 9962,
    "timestamp": "2025/01/02",
    "comments": [
      { "username": "faye80", "text": "Full spectrum" },
      { "username": "faye42", "text": "Curve confidence" },
      { "username": "ella78", "text": "Soft doesn’t fold" },
      { "username": "dylan.78", "text": "Golden moment" },
      { "username": "amy_11", "text": "Fierce with ease" },
      { "username": "candy17", "text": "Truth in tension" },
      { "username": "nate.17", "text": "Power = presence" },
      { "username": "sara_18", "text": "Truly radiant" },
      { "username": "kevin09", "text": "Her strength is soft" },
      { "username": "mia24", "text": "Every piece fits" }
    ]
  },
  {
    "id": "8",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/chMm3ncq/9.jpg",
    "location": "Lake Como, Italy",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/xtzmc1n5/8.jpg"
    },
    "caption": "Every curve holds power and peace.",
    "likes": 12031,
    "timestamp": "2024/11/25",
    "comments": [
      { "username": "zoe.11", "text": "Peace posture" },
      { "username": "lily.04", "text": "Elegant always" },
      { "username": "dan.23", "text": "Power in pause" },
      { "username": "jake_05", "text": "Dressed in light" },
      { "username": "sophie_31", "text": "Balanced energy" },
      { "username": "mia26", "text": "🌿💭" },
      { "username": "dylan.95", "text": "Simplicity wins" },
      { "username": "sara.23", "text": "Muse in motion" },
      { "username": "zoe_60", "text": "📷🔊" },
      { "username": "jess_08", "text": "📖☀️" }
    ]
  },
  {
    "id": "9",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/chMm3ncq/9.jpg",
    "location": "Malibu Beach, CA",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/chMm3ncq/9.jpg"
    },
    "caption": "My body holds stories, not standards.",
    "likes": 12783,
    "timestamp": "2024/08/30",
    "comments": [
      { "username": "ben.70", "text": "Everything flows" },
      { "username": "ivy_72", "text": "Soft fire" },
      { "username": "tyler93", "text": "Calm and bold" },
      { "username": "ryan93", "text": "Story in curves" },
      { "username": "kevin.39", "text": "📍present" },
      { "username": "dan.36", "text": "🛋️🌤️" },
      { "username": "luke.41", "text": "She holds calm" },
      { "username": "matt.19", "text": "Shadow and shine" },
      { "username": "sara.68", "text": "🧷🧧" },
      { "username": "mark12", "text": "This is worth it" }
    ]
  }
];