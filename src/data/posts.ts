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
    "userImage": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png",
    "location": "Paris, France",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/ZpkzMsFF/1.png"
    },
    "caption": "just a reminder—your softness is not a weakness. this body, this shape, this moment? all worth celebrating 🤍",
    "likes": 10343,
    "timestamp": "2 HOURS AGO",
    "comments": [
      { "username": "bloom.sunday", "text": "This softness is a whole mood 🕊️" },
      { "username": "bodymuse", "text": "Gentle power 💫" },
      { "username": "dailyskin", "text": "She’s art. That’s it." },
      { "username": "curveculture", "text": "Real bodies. Real beauty. ✨" },
      { "username": "tender.lens", "text": "Every line tells a story 💭" },
      { "username": "shapetruth", "text": "Who needs filters when you’re this honest?" },
      { "username": "meltandglow", "text": "Power in presence. Period." },
      { "username": "rootedlight", "text": "Your energy? Undeniable." },
      { "username": "embracedit", "text": "Loving this softness in a loud world 💗" },
      { "username": "wildfemme", "text": "Confidence looks good on you 🔥" }
    ]

  },
  {
    "id": "2",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png",
    "location": "Paris, France",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/RpdCz8Cc/2.png"
    },
    "caption": "No edits. No hiding. Just me, exactly as I am 🤍✨ Soft, strong, and owning every inch.",
    "likes": 10020,
    "timestamp": "2025/05/01",
    "comments": [
      { "username": "honestdays", "text": "This kind of realness is so needed." },
      { "username": "sofi.roses", "text": "You’re literally glowing." },
      { "username": "moodformonday", "text": "This caption gave me chills, in the best way." },
      { "username": "luciegrams", "text": "No filters, just facts 💯" },
      { "username": "stillwater.wave", "text": "Owning every inch. I felt that." },
      { "username": "peachy.chai", "text": "Absolutely stunning and honest." },
      { "username": "tuesdaycloud", "text": "You make confidence look effortless." },
      { "username": "waveandwild", "text": "🔥🔥🔥" },
      { "username": "notesbyliv", "text": "More of this energy please." },
      { "username": "from.within", "text": "✨✨✨" }
    ]
  },
  { 
    "id": "3",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png",
    "location": "Tuscany, Italy",
    "media": {
    "type": "video",
    "url": "https://res.cloudinary.com/ddunt6myr/video/upload/v1747083233/video2_nrqjkk.mp4"
    },
    "caption": "Some softness belongs in the wild. 🌾 Confidence isn’t loud — it’s present. And that’s more than enough.",
    "likes": 9724,
    "timestamp": "2025/04/10",
    "comments": [
      { "username": "curve.poetry", "text": "This is what freedom looks like 🌬️" },
      { "username": "goldenaura", "text": "Soft curves, strong presence — I’m here for it." },
      { "username": "dearskin", "text": "The calm energy is everything." },
      { "username": "bareandbrave", "text": "You make peace look powerful." },
      { "username": "wildgrace", "text": "She’s not hiding. She’s blooming." },
      { "username": "glowarchive", "text": "Nature + body love = this moment 🤍" },
      { "username": "bodybloom", "text": "Curves don’t need approval. They just need air." },
      { "username": "earthtone.muse", "text": "Living art 🌾" },
      { "username": "serenespace", "text": "This hits different. Quiet confidence >>" },
      { "username": "sundayease", "text": "This softness feels revolutionary." }
    ]
  },
  {
    "id": "4",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png",
    "location": "Los Angeles, CA",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/8DgDZCxR/4.png"
    },
    "caption": "Just out here living, unapologetically. Confidence isn’t about shrinking — it’s about showing up.",
    "likes": 11248,
    "timestamp": "2025/03/25",
      "comments": [
        { "username": "urban.curves", "text": "You’re redefining what power looks like 👏" },
        { "username": "lightandcurve", "text": "Main character energy 💥" },
        { "username": "dailybloom", "text": "Bold. Beautiful. Balanced." },
        { "username": "softstreet", "text": "Body goals in motion!" },
        { "username": "confidentandcozy", "text": "Real shape. Real life. Real fire." },
        { "username": "citychic", "text": "Love this energy on a Monday." },
        { "username": "essencevibe", "text": "Walking art 🖼️" },
        { "username": "feelgoodlooks", "text": "This is how you wear confidence." },
        { "username": "hercurvejourney", "text": "Just wow 🔥🔥" },
        { "username": "breathe.and.glow", "text": "This made my whole feed better 💫" }
      ]
  },
  {
    "id": "5",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png",
    "location": "Barcelona, Spain",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/yFKk6Hd5/5.png"
    },
    "caption": "Some days it’s just about feeling good in your own skin. This is one of those days 🤍",
    "likes": 10877,
    "timestamp": "2025/03/01",
    "comments": [
      { "username": "bloom.essence", "text": "Confidence looks gorgeous on you." },
      { "username": "softlightdiary", "text": "That glow from within ✨" },
      { "username": "curvecollective", "text": "She said comfort and served confidence." },
      { "username": "dailydrape", "text": "Stunning and so real." },
      { "username": "venusonrepeat", "text": "Body built like poetry 🔥" },
      { "username": "silkandskin", "text": "The way you own the room tho 😍" },
      { "username": "herdepth", "text": "You're literally the soft girl era 🌷" },
      { "username": "everyinchher", "text": "Every curve tells a story — and this one speaks peace." },
      { "username": "morningframes", "text": "Love the calm power in this." },
      { "username": "wildnserene", "text": "You in this light? Just wow." }
    ]
  },
  { 
    "id": "6",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png",
    "location": "Amsterdam, Netherlands",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/JwsXgRTq/6.png"
    },
    "caption": "Even the softest glow can hold the strongest presence.",
    "likes": 10594,
    "timestamp": "2025/02/05",
    "comments": [
      { "username": "sundaysmooth", "text": "You look amazing here 😍" },
      { "username": "realcurves", "text": "Loving the soft glam and those curves!" },
      { "username": "coffeewithglow", "text": "So elegant yet strong 🕊️" },
      { "username": "huggedinlight", "text": "Ugh you’re glowing" },
      { "username": "curvecoded", "text": "A whole vibe 🔥" },
      { "username": "lighttide", "text": "Literally perfect" },
      { "username": "roomlightlove", "text": "Soft beauty 🫶" },
      { "username": "warmhugz", "text": "Curvy queen energy" },
      { "username": "lowlightmood", "text": "This dress was made for you 💫" },
      { "username": "glowbasics", "text": "Can’t stop staring tbh" }
    ]
  },
  {
    "id": "7",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png",
    "location": "Berlin, Germany",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/rKVP2NQx/20250501-2341-image.png"
    },
     "caption": "Chose confidence, not filters. Real curves, real light, real me.",
    "likes": 9962,
    "timestamp": "2025/01/02",
    "comments": [
      { "username": "glowline", "text": "Serving natural glow 🔥" },
      { "username": "urbanmuse", "text": "That soft light and bold energy? Yes please." },
      { "username": "curveecho", "text": "Loving how unapologetic this is 💖" },
      { "username": "carlavibes", "text": "Gorgeous AND grounded" },
      { "username": "dayflow", "text": "The way you take up space is beautiful." },
      { "username": "eveningframe", "text": "This is what self-love in motion looks like." },
      { "username": "shadesoul", "text": "Confident and calm. Perfection." },
      { "username": "highvibe", "text": "✨✨✨" },
      { "username": "bodytruths", "text": "This is the kind of representation we need." },
      { "username": "slowdaydream", "text": "Soft but fierce, just how I like it." }
    ]
  },
  {
    "id": "8",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png",
    "location": "Lake Como, Italy",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png"
    },
    "caption": "Soft breeze, soft dress, strong body. This is peace. 🌊",
    "likes": 12031,
    "timestamp": "2024/11/25",
    "comments": [
      { "username": "marinasun", "text": "You belong in this light." },
      { "username": "curveloveclub", "text": "Curves and calm vibes 😍" },
      { "username": "shorelinesoul", "text": "Living for this whole mood." },
      { "username": "sundayout", "text": "You look so comfy and confident 🤍" },
      { "username": "driftandshine", "text": "Omg this is giving goddess by the dock." },
      { "username": "realform", "text": "This is what beauty looks like." },
      { "username": "sailandskin", "text": "Boat views and body goals 🔥" },
      { "username": "moonwake", "text": "Something about this just feels right." },
      { "username": "notetoher", "text": "Soft but unmissable ✨" },
      { "username": "dailydrip", "text": "Absolutely glowing, wow." }
    ]
  },
  {
    "id": "9",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png",
    "location": "Malibu Beach, CA",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/ymrtbRp6/8.png"
    },
     "caption": "Sun, salt, and self-love. This body belongs here. ☀️🌊",
    "likes": 12783,
    "timestamp": "2024/08/30",
    "comments": [
      { "username": "sunwarmth", "text": "You look so at home by the sea 🐚" },
      { "username": "coastalbreeze", "text": "That glow hits different 🔥" },
      { "username": "softsundays", "text": "Confidence looks amazing on you" },
      { "username": "saltyandfree", "text": "Honestly? Iconic." },
      { "username": "beachlight", "text": "💖☀️🌊" },
      { "username": "goldenhaze", "text": "This energy is everything" },
      { "username": "tidelove", "text": "Yes to all of this ✨" },
      { "username": "wavetide", "text": "That caption tho 💯" },
      { "username": "sunandskin", "text": "😍😍" },
      { "username": "curvesandcalm", "text": "Living your truth. We love to see it." }
    ]
  },
];
