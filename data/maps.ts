/* Where each place actually is, and which app will get you there.
   ------------------------------------------------------------------

   Coordinates are WGS84 decimal degrees, taken from OpenStreetMap raw
   geometry (much of it Japanese-government-sourced — MLIT PLATEAU building
   models and GSI base data), the Japanese GSI address geocoder, and Visit
   Jeju's own records, then cross-checked against a second source. They are
   the real-world positions rather than Google's internal POI anchors, so
   expect agreement within 10–30 m. Fine for a pin; not bit-identical.

   Two things this file exists to prevent:

   1. Being driven to the wrong place. Several of these have a near-twin with
      almost the same name — Cheonjeyeon and Cheonjiyeon are 12.7 km apart and
      differ by one syllable; Chinatown has two ornate Chinese temples 220 m
      apart; 雷門 is a gate AND a neighbourhood. Every pin below is coordinates
      first, name second, and each `script` is what you show a driver.

   2. Assuming Google Maps works everywhere. It does not — see MAP_APPS. */

export type MapPin = {
  lat: number;
  lng: number;
  /** What the place is called where it is. Show this to a driver. */
  script: string;
  /** Which country's map apps apply. */
  country: "jp" | "kr";
  /** Where the pin lands, and where the car can actually stop. */
  note?: string;
};

/** Keyed by destination id. `izumi-bath` is deliberately absent — it is a
    room on a moving ship and any coordinate for it is wrong within minutes. */
export const mapPins: Record<string, MapPin> = {
  "narita-arrival": {
    lat: 35.76415,
    lng: 140.38472,
    script: "成田国際空港 第1旅客ターミナル",
    country: "jp",
    note: "Terminal 1's central building. The complex is ring-shaped and 900 m across, so its geometric centre falls on open apron — and Terminal 2 is a separate building a kilometre north-east.",
  },
  "hyatt-yokohama": {
    lat: 35.44581,
    lng: 139.64523,
    script: "ハイアット リージェンシー 横浜",
    country: "jp",
    note: "The hotel's own footprint, beside the Kanagawa Arts Theatre. A NAVITIME record for this hotel is 220 m out on the wrong block — use the pin, not a name search.",
  },
  "yokohama-chinatown": {
    lat: 35.44245,
    lng: 139.64522,
    script: "横濱關帝廟",
    country: "jp",
    note: "Kanteibyō, the red-and-gold temple to Guan Yu founded here in 1862. Do not confuse it with Mazu-byō, an equally ornate Chinese temple 220 m east — that one is the 2006 sea-goddess hall. And the fortune salon is a separate address several blocks further east, so pin the branch you actually booked rather than assuming it is here.",
  },
  "yokohama-masobyo": {
    lat: 35.4421,
    lng: 139.64762,
    script: "橫濱媽祖廟（山下町136）",
    country: "jp",
    note: "The Mazu temple on Chinatown's east side, 220 m east of Kanteibyō. The two are easy to swap — Kanteibyō is the 1862 red-and-gold hall to Guan Yu, this is the 2006 sea-goddess one.",
  },
  "osanbashi-pier": {
    lat: 35.4517,
    lng: 139.64777,
    script: "横浜港大さん橋国際客船ターミナル",
    country: "jp",
    note: "This pin is out on the wooden roof deck, which is where you want to be for the view. Arriving by taxi with luggage, ask for the 2F set-down at the landward end — a two-to-three-minute walk from here.",
  },
  "meoto-iwa": {
    lat: 34.50896,
    lng: 136.78783,
    script: "二見興玉神社（夫婦岩）",
    country: "jp",
    note: "The shrine hall. The rocks stand 56 m offshore and there is no land access to them — you view them from the forecourt, so this is the pin to give a driver. Cars cannot enter the precinct.",
  },
  "ryugusha-shrine": {
    lat: 34.50796,
    lng: 136.78867,
    script: "龍宮社",
    country: "jp",
    note: "A genuinely separate building 135 m from the main hall, on the east approach. At low zoom the two pins sit almost on top of each other — that is correct, not an error.",
  },
  "katsurahama-beach": {
    lat: 33.49725,
    lng: 133.5747,
    script: "桂浜",
    country: "jp",
    note: "Mid-beach. The crescent is 344 m end to end, so no single pin is right: the car park is 272 m north and the Ryōma statue 166 m north-east and uphill.",
  },
  "ryuotsu-shrine": {
    lat: 33.4956,
    lng: 133.57464,
    script: "海津見神社 龍王宮",
    country: "jp",
    note: "There is no shrine called Ryūōtsu anywhere at Katsurahama — the brief's name is a garbling. This is the real one, on the headland at the south-west end. No vehicle access; you cross the little Ryūgū bridge and climb.",
  },
  "kanmon-straits": {
    lat: 33.96172,
    lng: 130.95877,
    script: "関門橋（下関・門司）",
    country: "jp",
    note: "Mid-span of the Kanmon Bridge — a place to look at from the balcony rather than go to. A bare search for 関門橋 can also return an unrelated bridge in Tochigi.",
  },
  "jungmun-beach": {
    lat: 33.244972,
    lng: 126.411646,
    script: "중문색달해변",
    country: "kr",
    note: "The sand itself. The car park where the taxi stops is 265 m north and 35 vertical metres up — a walk down, not a scramble. A coordinate circulating in Korean tourism listings puts this 500 m west at the clifftop; ignore it.",
  },
  "yeomiji-garden": {
    lat: 33.25257,
    lng: 126.41424,
    script: "여미지식물원 정문",
    country: "kr",
    note: "The glasshouse building itself. Say 정문 — the main gate — because the path up from the public car park runs at about ten degrees. And beware a name collision: a florist in Jeonju, 500 km away on the mainland, is called 여미지식물원 too, so pass the coordinates rather than the name.",
  },
  "cheonjeyeon-waterfall": {
    lat: 33.252676,
    lng: 126.418374,
    script: "천제연폭포",
    country: "kr",
    note: "Not Cheonjiyeon (천지연폭포), which is a different waterfall 12.7 km east in Seogwipo city. One syllable apart, and a driver given the wrong one takes you across the island.",
  },
  "sofukuji-ryugumon": {
    lat: 32.742567,
    lng: 129.882762,
    script: "崇福寺 三門（龍宮門）",
    country: "jp",
    note: "The gate itself. A generic 崇福寺 search lands 60 m east, inside the grounds and past the thing you came for — and there are other temples of the same name elsewhere in Japan, so say 長崎の崇福寺.",
  },
  "glover-garden": {
    lat: 32.732674,
    lng: 129.870071,
    script: "グラバー園 第2ゲート",
    country: "jp",
    note: "Gate 2, the upper entrance at the top of the free Glover Sky Road lift — the one Nagasaki recommends for anyone who would rather not climb. Gate 1 is 215 m away at the bottom of the hill.",
  },
  "cocomo-makeover": {
    lat: 35.712257,
    lng: 139.795212,
    script: "着物レンタル＆変身写真 COCOMO（浅草1-29-8）",
    country: "jp",
    note: "An address geocode rather than a verified shopfront pin, so give the driver the address. Reception is up one floor and the studio two floors above that.",
  },
  "asakusa-view-hotel": {
    lat: 35.715444,
    lng: 139.791944,
    script: "浅草ビューホテル",
    country: "jp",
    note: "The entrance and taxi porch are on the east face, toward Kokusai-dōri. Walking round the block from the west you will not find a door.",
  },
  "kaminarimon-gate": {
    lat: 35.711108,
    lng: 139.796385,
    script: "浅草の雷門",
    country: "jp",
    note: "Say 浅草の雷門, not just 雷門 — the bare name is also a Taitō-ku neighbourhood 230 m south-west, and a driver hearing only the ward name will take you there.",
  },
  "sensoji-dragon-fountain": {
    lat: 35.714373,
    lng: 139.796807,
    script: "浅草寺 お水舎",
    country: "jp",
    note: "The pavilion 40 m in front of the Main Hall and about 10 m off the centre line, on the right. Asakusa Shrine has its own basin 70 m north-east — a different institution and a different basin.",
  },
  "sensoji-dragon-ceiling": {
    lat: 35.714728,
    lng: 139.796747,
    script: "浅草寺 本堂",
    country: "jp",
  },
};

/**
 * A Google Maps universal link. Coordinates rather than a name, deliberately —
 * a name search is what puts you at the wrong waterfall.
 */
export function googleMapsUrl(pin: MapPin) {
  return `https://www.google.com/maps/search/?api=1&query=${pin.lat}%2C${pin.lng}`;
}

/**
 * Naver Map, for the Korean stops. Google cannot route you anywhere inside
 * South Korea, so on Jeju this is the link that actually works.
 */
export function naverMapUrl(pin: MapPin) {
  return `https://map.naver.com/p/search/${encodeURIComponent(pin.script)}`;
}

/* ------------------------------------------------------------------
   Does Google Maps work over there? In Japan, completely. In Korea,
   not for directions of any kind — and that is a legal problem rather
   than a technical one, so it has outlasted twenty years of asking.
   ------------------------------------------------------------------ */
export type MapApp = {
  name: string;
  script?: string;
  /** Which language `script` is in — a screen reader needs to be told. */
  scriptLang?: "ja" | "ko";
  where: string;
  what: string;
  /** What has to happen before you leave home. Empty if nothing does. */
  before?: string;
  essential: boolean;
};

export const MAP_APPS: MapApp[] = [
  {
    name: "Google Maps",
    where: "Japan — everything",
    what: "Walking, driving and transit all work properly in Japan, and the transit directions are among the best anywhere. Search by place name rather than by address: Japanese addresses are block-based, not street-based, so a romanised address often finds nothing. Two useful tricks — the place card carries the Japanese name you can hold up to a driver, and where your app language differs from the local one Maps shows a speaker icon that pronounces the destination in Japanese.",
    before:
      "Download the offline areas for Tokyo, Yokohama and each port while you are on wifi. Be clear about what that buys you though: offline maps give driving directions only. Walking and transit routing do not work offline anywhere in the world.",
    essential: true,
  },
  {
    name: "Naver Map",
    script: "네이버 지도",
    scriptLang: "ko",
    where: "Jeju — the one that matters",
    what: "Google Maps cannot give driving, walking or cycling directions anywhere in South Korea, and has not been able to for twenty years: Korean law forbids exporting the detailed national basemap to servers abroad. Naver has that data, so it routes you through crosswalks, stairs and alleys that Google simply cannot see. Full English interface including English turn-by-turn voice, and no account, Korean phone number or Korean card needed — tap Skip when it asks you to log in.",
    before:
      "Install it and switch it to English at home: Menu → Settings → Language → English. Korea conditionally approved Google's map-data export in February 2026 but nothing had shipped a year later, so plan for Google not working and treat it as a bonus if it does.",
    essential: true,
  },
  {
    name: "GO",
    script: "タクシーアプリ GO",
    scriptLang: "ja",
    where: "Japan — taxis",
    what: "Japan's dominant taxi app, covering all 47 prefectures — including Toba, which nothing else reaches. Interface in English. Since November 2023 it takes overseas mobile numbers and foreign credit cards, so no Japanese phone number and no Japanese card.",
    before: "Make the account and register the card at home. SMS verification to a Canadian number is much easier before you are dealing with roaming.",
    essential: true,
  },
  {
    name: "Uber",
    where: "Japan — taxis, no setup",
    what: "Your existing Canadian account and card work as they are. In Japan it dispatches licensed taxis rather than private cars, and since 2026 a tourist-only tie-up with S.RIDE adds about 20,000 more taxis in Yokohama and Tokyo — eligibility keyed to the foreign phone number on your account. Good in Tokyo, Yokohama, Nagasaki and Kōchi; no use at Toba.",
    before: "Nothing, beyond keeping your Canadian number as the account number.",
    essential: false,
  },
  {
    name: "k.ride",
    where: "Jeju — taxis",
    what: "Kakao Mobility's own foreigner edition, running on the same driver pool as Kakao T, which has over 90% of Korean taxi hailing. It exists because Kakao T itself is awkward for visitors: it wants a Korean account and commonly rejects foreign cards. k.ride takes a Google or Apple sign-in, needs no phone verification, accepts cards issued outside Korea, and auto-translates the destination and the driver chat. Uber exists in Korea but is thin outside Jeju City and should not be your only plan.",
    before: "Install and sign in at home. App coverage at Gangjeong is thinner than in the city, and you will be arriving with 2,700 other people.",
    essential: true,
  },
  {
    name: "Papago",
    where: "Korea — translation",
    what: "Naver's translator, purpose-built for Korean, Japanese and Chinese and consistently better than Google for Korean menus and idiom. Live camera overlay for signs.",
    before: "Download the offline packs on wifi.",
    essential: false,
  },
  {
    name: "Google Translate",
    where: "Both — translation",
    what: "Camera translation of signs and menus, and a two-way conversation mode that is the thing which resolves \"the driver did not understand the destination\" when you share no language.",
    before: "Download the Japanese and Korean offline packs on wifi before you go.",
    essential: true,
  },
  {
    name: "Princess Cruises",
    where: "The ship",
    what: "Runs free on the ship's own network without buying an internet package. It carries the daily schedule, the deck plans, your onboard account — and, most usefully for this trip, the day's all-aboard time and the port agent's phone number.",
    before: "Install it and complete OceanReady before you fly. Over ship wifi it is slow.",
    essential: true,
  },
  {
    name: "Organic Maps",
    where: "Both — the backstop",
    what: "Free, OpenStreetMap-based, and it does genuine offline turn-by-turn walking navigation for both countries. That one install covers the two biggest gaps at once: Google cannot route pedestrians offline anywhere, and cannot route them at all in Korea.",
    before: "Download the Japan and Korea regions on wifi.",
    essential: false,
  },
];
