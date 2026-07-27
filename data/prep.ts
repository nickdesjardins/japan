/**
 * Things to learn before leaving.
 *
 * Every video id below was checked against YouTube's oEmbed endpoint — a 200
 * there means the video exists *and* has embedding enabled. Titles and channel
 * names are copied from that response rather than written by hand.
 */
export type PrepVideo = {
  id: string;
  title: string;
  channel: string;
  heading: string;
  why: string;
};

export const prepVideos: PrepVideo[] = [
  {
    id: "5F5M7Lei7yQ",
    title: "Japan Shrine Manners | DONT make FOREIGNER MISTAKES",
    channel: "Paolo fromTOKYO",
    heading: "Shrine Etiquette: Bow, Rinse, Clap, Bow",
    why: "This trip is shrine-heavy: Enoshima's dragon shrine, Ryugusha in Toba, Ryūō-gū at Katsurahama. Paolo walks the full sequence, from the torii bow and temizuya rinse to coin, two bows, two claps, one bow.",
  },
  {
    id: "ydfskwks_dI",
    title: "Bathing at a Japanese Hot Spring | Onsen Etiquette",
    channel: "Japan Guide",
    heading: "Onsen Rules Before the Izumi Bath",
    why: "The Diamond Princess's Izumi bath follows Japanese rules: wash seated and fully before entering, no towel in the water, no swimsuit. Japan Guide films the actual sequence, so you walk in already knowing the choreography.",
  },
  {
    id: "GKeJ8OZV2xU",
    title: "Tutorial on How to Hold/Use Them Correctly | 10 Things You Should NEVER Do With Chopsticks in Japan",
    channel: "Let's ask Shogo | Your Japanese Friend in Kyoto",
    heading: "Chopstick Taboos You'd Never Guess",
    why: "Shogo covers the chopstick habits that read as rude in Japan: passing food chopstick to chopstick, standing them upright in rice, spearing. Useful in the ship's dining rooms and at every port lunch from Kochi to Nagasaki.",
  },
  {
    id: "3_fU0Yk4HmA",
    title: "50 Basic SURVIVAL Japanese Phrases for Travellers!",
    channel: "Easy2LearnJapanese",
    heading: "50 Survival Phrases for the Ports",
    why: "Fifty phrases at beginner pace: sumimasen, arigato gozaimasu, ordering, asking directions, numbers. Outside Tokyo and Yokohama, in Toba, Kochi and the Kanmon Straits towns, English thins out fast and these carry you.",
  },
  {
    id: "pSPbD0zj5Ow",
    title: "Your Ultimate Guide to Collecting Goshuin Stamps In Japan",
    channel: "Anne in Wonderland",
    heading: "Goshuin: The Souvenir Worth Collecting",
    why: "Buy a goshuincho and each shrine or temple hand-brushes a calligraphy stamp. Senso-ji, Enoshima and Sofuku-ji all offer them. This explains the etiquette, the cost, and why it beats anything from a gift shop.",
  },
  {
    id: "VbaF-qg0WSU",
    title: "Guide to Sensoji Temple in Asakusa Tokyo, Plus Skytree!",
    channel: "Kensho Quest",
    heading: "Senso-ji and Asakusa, Walked Through",
    why: "Your Tokyo day: Kaminarimon's giant lantern, Nakamise street, Senso-ji itself, and Skytree nearby. An orientation guide so you spend those hours looking at things rather than working out where they are.",
  },
  {
    id: "oE9Vx7rBD9I",
    title: "What to do in NAGASAKI during your first visit | Japan Travel",
    channel: "Laurens & Laura",
    heading: "Nagasaki: Triaging One Port Day",
    why: "A first-visit orientation to Glover Garden, the Peace Park, Dejima and Chinatown, so you can decide in advance what actually fits into a single day ashore rather than losing time choosing.",
  },
  {
    id: "UUZGLWeja_s",
    title: "JEJU ISLAND, SOUTH KOREA (2026) | 10 Best Things To Do On Jeju (+ Travel Tips)",
    channel: "World Wild Hearts",
    heading: "Jeju: Your One Stop in Korea",
    why: "Your only Korean port, and a different country with different customs. Covers Jungmun Beach, Cheonjeyeon Falls and Seongsan, enough to pick two or three that fit a short call rather than improvising at the pier.",
  },
];

/** Customs worth knowing, beyond the four rituals in `rituals`. */
export type Custom = {
  name: string;
  script: string;
  where: string;
  steps: string[];
  note: string;
};

export const customs: Custom[] = [
  {
    name: "Collecting a goshuin",
    script: "御朱印 · goshuin",
    where: "Enoshima, Ryūgūsha, Ryūō, Sōfuku-ji, Sensō-ji",
    steps: [
      "Buy the book first — a goshuinchō, around ¥1,500–2,000 at any shrine office. Enoshima is your first chance.",
      "Pray at the hall before you ask. The stamp records a visit you actually made, so the visit comes first.",
      "Find the desk marked 御朱印 or 授与所, open the book flat to the next blank page, and hand it over with both hands: goshuin o onegaishimasu.",
      "Leave ¥300–500 in coins on the tray, then wait quietly — it is written by hand and takes a few minutes.",
      "Keep the book for goshuin only. Station stamps and tourist-site stamps go somewhere else.",
    ],
    note:
      "It is not a souvenir stamp but a priest's handwritten record that you came and paid respects — which is why the order matters, why nobody will write one for a friend who stayed on the ship, and why turning up at closing time may get you a polite no.",
  },
  {
    name: "Writing an ema",
    script: "絵馬 · ema",
    where: "The plaque racks at every shrine on the route",
    steps: [
      "Buy a wooden plaque at the shrine office — usually ¥500–1,000 — and use the pens set out beside the rack.",
      "Write on the blank side and leave the painted face alone, unless the shrine's own sign says otherwise.",
      "Be specific. A wish is addressed to this particular kami, so 'a calm crossing home' beats 'happiness'.",
      "Add your first names if you like; the traditional address line is entirely optional for visitors.",
      "Hang it on the rack with the picture facing outward, and leave it there.",
    ],
    note:
      "The temptation is to take the plaque home as a keepsake, but the whole gesture is the leaving — the shrine gathers up the year's ema and ritually burns them, releasing the wishes.",
  },
  {
    name: "Wearing the kimono the right way round",
    script: "右前 · migi mae",
    where: "COCOMO, Asakusa — and any yukata aboard",
    steps: [
      "Wrap the right panel against your body first, then bring the left panel across over the top of it.",
      "Check a mirror: seen from the front, the collar should make a lowercase 'y'.",
      "Let the dresser tie and re-tie the obi. It is meant to feel firm and held, not loose.",
      "Take short steps, keep your arms low, and lift the hem slightly on stairs — the sleeves catch on everything.",
      "Sit by smoothing the back of the skirt underneath you rather than dropping into the chair.",
    ],
    note:
      "Right panel over left is how the dead are dressed for burial — hidari-mae — and it is the one mistake a Japanese passer-by will genuinely notice, so if a staff member reaches over to fix your collar without asking, let them.",
  },
  {
    name: "Chopsticks",
    script: "箸 · hashi",
    where: "Every meal ashore, and the ship's Japanese table",
    steps: [
      "Rest them on the hashioki, the little ceramic rest. No rest? Fold the paper sleeve into one.",
      "Never stand them upright in a bowl of rice — that is exactly how rice is offered to the dead.",
      "Never pass food chopstick-to-chopstick. Set it down on the other person's plate instead.",
      "Don't point with them, wave them while talking, spear food, or dig through a shared dish for the good bit.",
      "Take from communal plates with the serving chopsticks when they are provided.",
    ],
    note:
      "The upright-in-rice and chopstick-to-chopstick taboos both come straight from Buddhist funeral rites — that is why they land quite differently from ordinary clumsiness, and why a Japanese diner will wince rather than laugh.",
  },
  {
    name: "Shoes off, and the slipper rules",
    script: "玄関 · genkan",
    where: "Sōfuku-ji, tatami rooms, COCOMO, Jeju restaurants",
    steps: [
      "Watch for the step up and the rack of shoes. That raised lip — the genkan — is the border, not the door.",
      "Step out of your shoes onto the raised floor, then turn and set them neatly pointing back the way you came.",
      "Wear the house slippers on wood and lino, but take them off before you step on tatami. Socks only on the mats.",
      "Change into the toilet slippers waiting inside the washroom — and change back out of them on the way out.",
      "Pack shoes you can slip off standing up, and socks you would be happy to be seen in.",
    ],
    note:
      "Walking back into the restaurant still wearing the toilet slippers is the classic foreign-visitor mistake in Japan, and every single person in the room will spot it before you do.",
  },
  {
    name: "Bowing, and managing without the language",
    script: "お辞儀 · ojigi",
    where: "From the gangway onward, everywhere",
    steps: [
      "Bow from the waist with a straight back, hands at your sides or folded in front, eyes down rather than on the other person.",
      "Match what you are given: a small nod for a shop greeting, a slower and deeper bend when the thanks really means something.",
      "Learn four things and use them all day — sumimasen, arigatō gozaimasu, onegaishimasu, hai.",
      "Point at the item rather than the person, and hold your translation app out to be read instead of reading it aloud.",
      "Don't offer a handshake unless a hand comes out first, and never a hug.",
    ],
    note:
      "The instinct is to apologise at length for not speaking Japanese, but a bow and a sumimasen have already done that job — it is the over-explaining in English that actually makes the exchange awkward.",
  },
  {
    name: "Paying, and not tipping",
    script: "お会計 · o-kaikei",
    where: "Offering boxes, goshuin desks, Nakamise, taxis",
    steps: [
      "Carry cash. Shrines, temples, market stalls and owner-run shops still take coins and notes only, and goshuin desks always will.",
      "Hoard your coins — small ones for offering boxes, ¥500 pieces for goshuin. Exact change is the courteous way to pay.",
      "Put the money on the little tray on the counter rather than into the cashier's hand, and lift your change back off the tray.",
      "Pass notes and cards with both hands, and expect your change to be counted back to you aloud.",
      "Never tip — not the driver, not the guide, not the restaurant.",
    ],
    note:
      "Japan has gone far more cashless than its reputation suggests, but the exact things you will want to spend on here — offerings, charms, goshuin, street food at Nakamise — are precisely the ones that never took cards; and a tip left on a table reads as money forgotten, so someone will chase you down the street to return it.",
  },
  {
    name: "Photographs",
    script: "撮影禁止 · satsuei kinshi",
    where: "Sōfuku-ji, Sensō-ji, the Asakusa streets",
    steps: [
      "Look for the 撮影禁止 sign before you raise the camera. Inside temple and shrine halls, assume no unless told otherwise.",
      "Never photograph an altar, a statue behind its screen, or a priest mid-ritual.",
      "Ask before photographing a person — camera raised, questioning look, and a shake of the head means no.",
      "Step out of the walking line to shoot. Blocking the approach through a torii or a shop doorway is the real offence.",
      "Silence the shutter if your phone allows it, and put the camera down entirely while someone beside you is praying.",
    ],
    note:
      "On your kimono day in Asakusa you will be the one strangers want to photograph — the courtesy runs both ways, and you are completely entitled to smile and decline.",
  },
  {
    name: "Tattoos and the bath",
    script: "入れ墨 · irezumi",
    where: "The Izumi bath, and any bathhouse ashore",
    steps: [
      "Don't worry about the ship. Izumi is run for an international passenger list and does not turn tattooed guests away.",
      "Ashore, assume the opposite — roughly half of Japan's baths still refuse, and the person on the desk cannot make an exception.",
      "Carry waterproof cover patches for anything small; plenty of places will accept a covered tattoo even where the sign says no.",
      "Ask whether there is a kashikiri, a private bath you can book by the hour, which sidesteps the question entirely.",
      "If you are refused, take it lightly and move on.",
    ],
    note:
      "The rule is a leftover from the days when a tattoo meant yakuza membership, and it is genuinely loosening — Japan's tourism agency now asks operators to hand out cover stickers — but the staff member saying no is enforcing a house policy, not passing judgement on you.",
  },
  {
    name: "Korea for the day",
    script: "두 손으로 · du son euro",
    where: "Seogwipo, Jeju — one day, different rules",
    steps: [
      "Give and receive with both hands — money, a card, a bag, a shopping basket — or steady your right forearm with your left hand.",
      "Never pour your own drink. Fill your partner's glass, let them fill yours, and hold your glass with both hands while they do.",
      "Take your shoes off at floor-seating restaurants and guesthouses, exactly as in Japan.",
      "Bow shallower than you have been — a nod of the head, not a bend from the waist — and skip the tip here too.",
      "Treat Jeju as its own place rather than a Korean footnote or a Japanese near-miss; the history between the two countries is not light conversation.",
    ],
    note:
      "Two hands is the whole of Korean etiquette in miniature — it means 'you have my full attention' — which is why handing something over one-handed reads not as casual but as dismissive.",
  },
];

/**
 * Travel phrases. `phonetic` is a respelling for an English speaker: Japanese
 * is mora-timed with no stress accent, so the syllables are evenly weighted
 * rather than marked for stress.
 */
export type Phrase = {
  en: string;
  script: string;
  romaji: string;
  phonetic: string;
  tip: string;
};

export type PhraseGroup = {
  group: string;
  lang: "ja-JP" | "ko-KR";
  note: string;
  phrases: Phrase[];
};

export const phrasebook: PhraseGroup[] = [
  {
    group: "The absolute basics",
    lang: "ja-JP",
    note: "These nine cover roughly eighty percent of the social contact you'll have, and Japanese people are genuinely delighted when visitors attempt them.",
    phrases: [
      {
        en: "Hello / good afternoon",
        script: "こんにちは",
        romaji: "Konnichiwa",
        phonetic: "kon-ni-chi-wa",
        tip: "The daytime greeting, roughly 10am until dark. The final は is written 'ha' but always pronounced 'wa'.",
      },
      {
        en: "Good morning",
        script: "おはようございます",
        romaji: "Ohayō gozaimasu",
        phonetic: "o-ha-yo-o go-za-i-mass",
        tip: "Before about 10am. You can drop the gozaimasu with friends, but never with hotel or shop staff.",
      },
      {
        en: "Good evening",
        script: "こんばんは",
        romaji: "Konbanwa",
        phonetic: "kom-ban-wa",
        tip: "After dark. The n before b naturally softens to an m sound. Same は-pronounced-wa rule as konnichiwa.",
      },
      {
        en: "Thank you",
        script: "ありがとうございます",
        romaji: "Arigatō gozaimasu",
        phonetic: "a-ri-ga-to-o go-za-i-mass",
        tip: "Use the past form ありがとうございました (arigatō gozaimashita, 'a-ri-ga-to-o go-za-i-mash-ta') when the kindness is finished, such as leaving a shop or restaurant.",
      },
      {
        en: "Excuse me / sorry / thanks for the trouble",
        script: "すみません",
        romaji: "Sumimasen",
        phonetic: "su-mi-ma-sen",
        tip: "The single most useful word in Japan. It does the work of excuse me, sorry, and thank-you-for-going-to-the-trouble all at once. Use it to flag down staff, to squeeze past someone on a train, and to accept a small favour. When in doubt, say this.",
      },
      {
        en: "Please (when asking for something)",
        script: "お願いします",
        romaji: "Onegai shimasu",
        phonetic: "o-ne-ga-i shi-mass",
        tip: "Attach it to almost any request, or say it alone while handing something over. Softer and more polite than ください (kudasai).",
      },
      {
        en: "Yes",
        script: "はい",
        romaji: "Hai",
        phonetic: "ha-i",
        tip: "Often means 'I'm listening' rather than 'I agree'. Japanese people say it constantly through a conversation, so don't read every hai as consent.",
      },
      {
        en: "No",
        script: "いいえ",
        romaji: "Iie",
        phonetic: "i-i-e",
        tip: "Sounds blunt in real use. To turn something down, 大丈夫です (daijōbu desu, 'da-i-jo-o-bu dess', literally 'I'm fine') is far more natural and is what locals actually say.",
      },
      {
        en: "Goodbye",
        script: "さようなら",
        romaji: "Sayōnara",
        phonetic: "sa-yo-o-na-ra",
        tip: "Heavier and more final than English 'goodbye' — it carries a hint of not meeting again, so it sounds odd leaving a café. Locals say ありがとうございました or 失礼します (shitsurei shimasu, 'shi-tsu-re-e shi-mass') instead.",
      },
    ],
  },
  {
    group: "Finding things",
    lang: "ja-JP",
    note: "Ask while showing a map or your phone screen — Japanese people will very often walk you there rather than try to explain.",
    phrases: [
      {
        en: "Where is the bathroom?",
        script: "トイレはどこですか",
        romaji: "Toire wa doko desu ka",
        phonetic: "to-i-re wa do-ko dess ka",
        tip: "トイレ is completely normal and neutral, not crude. お手洗い (o-tearai, 'o-te-a-ra-i') is the politer version for a nice restaurant or a ryokan.",
      },
      {
        en: "Where is the station?",
        script: "駅はどこですか",
        romaji: "Eki wa doko desu ka",
        phonetic: "e-ki wa do-ko dess ka",
        tip: "Put the name first: 東京駅はどこですか. Staff at the green みどりの窓口 ticket window are used to helping foreign visitors.",
      },
      {
        en: "Where is the taxi stand?",
        script: "タクシー乗り場はどこですか",
        romaji: "Takushī noriba wa doko desu ka",
        phonetic: "tak-shi-i no-ri-ba wa do-ko dess ka",
        tip: "乗り場 means 'boarding point' and works for buses (バス乗り場) and ferries too. Where there is a rank, never hail a cab on the street — join the queue. Rear doors open automatically; don't touch them.",
      },
      {
        en: "Where is the exit? (entrance = iriguchi)",
        script: "出口はどこですか",
        romaji: "Deguchi wa doko desu ka",
        phonetic: "de-gu-chi wa do-ko dess ka",
        tip: "Swap 出口 for 入口 (iriguchi, 'i-ri-gu-chi') to ask about the entrance. Large stations have many named exits — 東口 east, 西口 west, 北口 north, 南口 south — and the exit number matters more than the station name.",
      },
      {
        en: "Left",
        script: "左",
        romaji: "Hidari",
        phonetic: "hi-da-ri",
        tip: "As a direction, say 左です (hidari desu) — 'it's on the left'.",
      },
      {
        en: "Right",
        script: "右",
        romaji: "Migi",
        phonetic: "mi-gi",
        tip: "右です (migi desu) — 'it's on the right'. Remember Japan drives on the left and people generally walk on the left too, except in Osaka.",
      },
      {
        en: "Straight ahead",
        script: "まっすぐ",
        romaji: "Massugu",
        phonetic: "mas-su-gu",
        tip: "The double s is held for a beat — 'mass' then 'sugu'. まっすぐです means 'straight ahead'.",
      },
      {
        en: "Here",
        script: "ここ",
        romaji: "Koko",
        phonetic: "ko-ko",
        tip: "ここです ('it's here'). Very useful pointing at an address on your phone for a taxi driver.",
      },
      {
        en: "Over there",
        script: "あそこ",
        romaji: "Asoko",
        phonetic: "a-so-ko",
        tip: "Japanese splits 'there' three ways: ここ here by me, そこ (soko) there by you, あそこ over there away from both of us.",
      },
      {
        en: "Is it far?",
        script: "遠いですか",
        romaji: "Tōi desu ka",
        phonetic: "to-o-i dess ka",
        tip: "The answers you want are 近いです (chikai desu, 'it's close') or 歩けます (arukemasu, 'you can walk it').",
      },
    ],
  },
  {
    group: "Eating and drinking",
    lang: "ja-JP",
    note: "Ordering by pointing is completely normal — but say the allergy line before you order, never after the food arrives.",
    phrases: [
      {
        en: "A table for two (two people)",
        script: "二人です",
        romaji: "Futari desu",
        phonetic: "fu-ta-ri dess",
        tip: "Hold up two fingers as you say it. Staff will greet you with 何名様ですか (nan-mei-sama desu ka) — 'how many in your party?'",
      },
      {
        en: "The menu, please",
        script: "メニューをお願いします",
        romaji: "Menyū o onegai shimasu",
        phonetic: "me-nyu-u o o-ne-ga-i shi-mass",
        tip: "For an English menu ask 英語のメニューはありますか (eigo no menyū wa arimasu ka). Most tourist-area restaurants have one, a picture menu, or a QR code.",
      },
      {
        en: "Water, please",
        script: "お水をお願いします",
        romaji: "O-mizu o onegai shimasu",
        phonetic: "o-mi-zu o o-ne-ga-i shi-mass",
        tip: "Tap water and tea are free and usually brought unasked. The restaurant word for iced water is お冷 (o-hiya). Asking for a refill is never rude.",
      },
      {
        en: "This one, please (while pointing)",
        script: "これをください",
        romaji: "Kore o kudasai",
        phonetic: "ko-re o ku-da-sa-i",
        tip: "Pointing at the menu, the plastic food display in the window, or even another table's dish is completely acceptable and not considered rude.",
      },
      {
        en: "I have a ___ allergy",
        script: "○○アレルギーがあります",
        romaji: "○○ arerugī ga arimasu",
        phonetic: "___ a-re-ru-gi-i ga a-ri-mass",
        tip: "Say this BEFORE ordering, and use the word アレルギー — the softer 〇〇は食べられません (taberaremasen, 'I can't eat it') is often heard as a preference and quietly ignored. Allergen words: 卵 tamago egg, 乳製品 nyū-see-hin dairy, 小麦 ko-mu-gi wheat, そば so-ba buckwheat, ピーナッツ pi-i-nat-tsu peanut, ナッツ nat-tsu tree nuts, えび e-bi shrimp, かに ka-ni crab, 魚 sa-ka-na fish. Carry a printed Japanese allergy card: dashi fish stock and wheat-based soy sauce hide in almost everything.",
      },
      {
        en: "Does this contain ___?",
        script: "これに○○が入っていますか",
        romaji: "Kore ni ○○ ga haitte imasu ka",
        phonetic: "ko-re ni ___ ga ha-it-te i-mass ka",
        tip: "The direct question, and the one to fall back on. 入っています means 'it's in there'. Treat any hesitation or a drawn-out ちょっと… (chotto) as a yes.",
      },
      {
        en: "No wasabi, please",
        script: "わさび抜きでお願いします",
        romaji: "Wasabi nuki de onegai shimasu",
        phonetic: "wa-sa-bi nu-ki de o-ne-ga-i shi-mass",
        tip: "抜き means 'with it taken out' and works for other things — ねぎ抜き (negi nuki) for no spring onion. Say it when ordering, before the sushi is made. Sushi chefs shorten it to さび抜き (sabi nuki).",
      },
      {
        en: "Is it spicy?",
        script: "辛いですか",
        romaji: "Karai desu ka",
        phonetic: "ka-ra-i dess ka",
        tip: "Japanese 'spicy' is mild by Canadian standards. The two things that genuinely catch people out are wasabi and からし (karashi) mustard, which hit the sinuses rather than the tongue.",
      },
      {
        en: "The bill, please",
        script: "お会計をお願いします",
        romaji: "O-kaikei o onegai shimasu",
        phonetic: "o-ka-i-ke-e o o-ne-ga-i shi-mass",
        tip: "In many places you carry the slip from your table to the register by the door instead of paying seated. Never tip — it causes real confusion and staff will often chase you to return the money.",
      },
      {
        en: "It was delicious / thank you for the meal",
        script: "ごちそうさまでした",
        romaji: "Gochisōsama deshita",
        phonetic: "go-chi-so-o-sa-ma desh-ta",
        tip: "Said to the staff as you leave, and it lands well every time. Its partner いただきます (itadakimasu, 'i-ta-da-ki-mass') is said quietly before the first bite. To praise the food mid-meal, おいしいです (oishii desu, 'o-i-shi-i dess').",
      },
    ],
  },
  {
    group: "Money and shopping",
    lang: "ja-JP",
    note: "Japan runs on cash far more than Canada does, and shop prices are fixed — there is essentially no haggling outside flea markets.",
    phrases: [
      {
        en: "How much is it?",
        script: "いくらですか",
        romaji: "Ikura desu ka",
        phonetic: "i-ku-ra dess ka",
        tip: "Point and add これは: これはいくらですか (kore wa ikura desu ka). Prices are almost always shown tax-included, marked 税込 (zeikomi).",
      },
      {
        en: "That's expensive",
        script: "高いですね",
        romaji: "Takai desu ne",
        phonetic: "ta-ka-i dess ne",
        tip: "This is a remark, not the opening of a negotiation. Haggling is not done in Japanese shops and attempting it is simply awkward. The ね on the end softens it to 'that's a bit pricey, isn't it'.",
      },
      {
        en: "Can I pay by card?",
        script: "カードは使えますか",
        romaji: "Kādo wa tsukaemasu ka",
        phonetic: "ka-a-do wa tsu-ka-e-mass ka",
        tip: "When handing the card over, just カードでお願いします (kādo de onegai shimasu). Small restaurants, shrines, ramen ticket machines, and rural shops are frequently cash-only, so keep ¥10,000 or so on you at all times.",
      },
      {
        en: "Cash",
        script: "現金",
        romaji: "Genkin",
        phonetic: "gen-kin",
        tip: "現金のみ (genkin nomi) on a sign means cash only. 7-Eleven and Japan Post ATMs reliably accept Canadian debit and credit cards; many domestic bank ATMs will reject them.",
      },
      {
        en: "A bag, please",
        script: "袋をください",
        romaji: "Fukuro o kudasai",
        phonetic: "fu-ku-ro o ku-da-sa-i",
        tip: "Plastic bags have cost a few yen since 2020. Staff will ask 袋はご利用ですか (fukuro wa go-riyō desu ka) — 'do you need a bag?' — to which はい or 大丈夫です both work.",
      },
      {
        en: "I'm just looking",
        script: "見ているだけです",
        romaji: "Mite iru dake desu",
        phonetic: "mi-te i-ru da-ke dess",
        tip: "You'll hear the contracted 見てるだけです (miteru dake desu) more often. In practice a smile plus 大丈夫です (daijōbu desu) does the same job and is easier to say.",
      },
      {
        en: "Tax-free, please",
        script: "免税でお願いします",
        romaji: "Menzei de onegai shimasu",
        phonetic: "men-ze-e de o-ne-ga-i shi-mass",
        tip: "Tax-free shopping needs your actual passport, not a photocopy or a photo, at a shop displaying a Tax-Free logo, usually over about ¥5,000. Consumables get sealed in a bag you must not open before leaving Japan. Carry the passport on shopping days.",
      },
      {
        en: "May I try this on?",
        script: "試着してもいいですか",
        romaji: "Shichaku shite mo ii desu ka",
        phonetic: "shi-cha-ku shi-te mo i-i dess ka",
        tip: "Shops often hand you a thin face cover to pull over your head so makeup doesn't mark the garment. Take your shoes off at the step into the fitting room.",
      },
    ],
  },
  {
    group: "When something goes wrong",
    lang: "ja-JP",
    note: "Japan is extremely safe and lost property genuinely comes back, but the emergency numbers differ from Canada: 110 for police, 119 for fire and ambulance.",
    phrases: [
      {
        en: "Help!",
        script: "助けて！",
        romaji: "Tasukete!",
        phonetic: "tas-ke-te",
        tip: "For a genuine emergency — shout it. The u in 助 is swallowed, so it sounds like 'tas-ke-te'. On a crowded train, the phrase that brings immediate help against a groper is 痴漢です (chikan desu, 'chi-kan dess').",
      },
      {
        en: "I'm lost",
        script: "道に迷いました",
        romaji: "Michi ni mayoimashita",
        phonetic: "mi-chi ni ma-yo-i-mash-ta",
        tip: "Show the map on your phone as you say it. Police boxes (交番, kōban, 'ko-o-ban') sit on most busy corners and giving directions is a large part of what they're for.",
      },
      {
        en: "Does anyone speak English?",
        script: "英語を話せる人はいますか",
        romaji: "Eigo o hanaseru hito wa imasu ka",
        phonetic: "e-e-go o ha-na-se-ru hi-to wa i-mass ka",
        tip: "英語 has a long e — 'ee-go', not 'ay-go'. Asking one person directly, the softer 英語は話せますか (eigo wa hanasemasu ka) is better; many people will say no out of modesty and then help anyway.",
      },
      {
        en: "I don't understand",
        script: "わかりません",
        romaji: "Wakarimasen",
        phonetic: "wa-ka-ri-ma-sen",
        tip: "日本語がわかりません (nihongo ga wakarimasen) is 'I don't understand Japanese'. Holding out your phone with a translation app open is completely normal and people will happily type into it.",
      },
      {
        en: "Please say that again slowly",
        script: "もう一度ゆっくりお願いします",
        romaji: "Mō ichido yukkuri onegai shimasu",
        phonetic: "mo-o i-chi-do yuk-ku-ri o-ne-ga-i shi-mass",
        tip: "Politer than it looks and remarkably effective. もう一度 is 'one more time', ゆっくり is 'slowly'. People will slow right down without any offence taken.",
      },
      {
        en: "I need a doctor",
        script: "医者を呼んでください",
        romaji: "Isha o yonde kudasai",
        phonetic: "i-sha o yon-de ku-da-sa-i",
        tip: "For an ambulance, 救急車を呼んでください (kyūkyūsha o yonde kudasai) or dial 119 — ambulances themselves are free. Hospitals bill foreign visitors directly and often in cash, so travel insurance matters.",
      },
      {
        en: "Where is a pharmacy?",
        script: "薬局はどこですか",
        romaji: "Yakkyoku wa doko desu ka",
        phonetic: "yak-kyo-ku wa do-ko dess ka",
        tip: "薬局 is a dispensing pharmacy for prescriptions; for everyday medicine look for a ドラッグストア (doraggu sutoa) — Matsumoto Kiyoshi, Welcia, Sundrug. Important: several ordinary Canadian cold and allergy medicines containing pseudoephedrine are illegal to bring into Japan, so check before you pack.",
      },
      {
        en: "I've lost my passport",
        script: "パスポートをなくしました",
        romaji: "Pasupōto o nakushimashita",
        phonetic: "pa-su-po-o-to o na-ku-shi-mash-ta",
        tip: "Go to the nearest 交番 (kōban) police box first for a written loss report, then the Embassy of Canada in Tokyo (Akasaka) for an emergency travel document. Keep a photo of the ID page somewhere separate from the passport itself.",
      },
      {
        en: "Please call the police",
        script: "警察を呼んでください",
        romaji: "Keisatsu o yonde kudasai",
        phonetic: "ke-e-sa-tsu o yon-de ku-da-sa-i",
        tip: "Police is 110, fire and ambulance is 119 — neither is 911. Lost items are very often handed in: ask at a station's 遺失物 (ishitsubutsu) lost property counter or at any kōban.",
      },
    ],
  },
  {
    group: "At a shrine or temple",
    lang: "ja-JP",
    note: "Shrines are Shinto and temples are Buddhist; both welcome respectful visitors, and the etiquette is simple once you know the running order.",
    phrases: [
      {
        en: "May I take a photo?",
        script: "写真を撮ってもいいですか",
        romaji: "Shashin o totte mo ii desu ka",
        phonetic: "sha-shin o tot-te mo i-i dess ka",
        tip: "Always ask before photographing inside a hall, a priest, or a ceremony. 撮影禁止 (satsuei kinshi) on a sign means no photography and is common inside main halls, even where the grounds are fine.",
      },
      {
        en: "May I have a goshuin, please?",
        script: "御朱印をお願いします",
        romaji: "Goshuin o onegai shimasu",
        phonetic: "go-shu-in o o-ne-ga-i shi-mass",
        tip: "Pray first — walking straight to the stamp desk is a genuine breach of etiquette. Hand your book over open to the blank page you want used. A goshuin is a record of worship, not a souvenir stamp, so don't ask for one in an empty notebook. Usually ¥300–¥500, cash, exact change appreciated.",
      },
      {
        en: "Where can I receive a goshuin?",
        script: "御朱印はどこでいただけますか",
        romaji: "Goshuin wa doko de itadakemasu ka",
        phonetic: "go-shu-in wa do-ko de i-ta-da-ke-mass ka",
        tip: "Look for a desk signed 御朱印所 (goshuinjo) or 授与所 (juyosho). The book itself, a 御朱印帳 (goshuinchō), is sold at most large shrines for around ¥1,500–¥2,000 and makes a far better souvenir than anything in a gift shop.",
      },
      {
        en: "How much is the offering?",
        script: "お賽銭はいくらですか",
        romaji: "O-saisen wa ikura desu ka",
        phonetic: "o-sa-i-sen wa i-ku-ra dess ka",
        tip: "Expect a puzzled look — there is no set amount and asking is slightly odd, since sincerity is the point rather than the sum. A ¥5 coin is traditional because go-en puns on ご縁, 'a good connection'. Drop it in gently rather than throwing. At a shrine the sequence is: bow twice, clap twice, pray, bow once. At a temple there is no clapping — just press your palms together.",
      },
      {
        en: "Do I take my shoes off?",
        script: "靴を脱ぎますか",
        romaji: "Kutsu o nugimasu ka",
        phonetic: "ku-tsu o nu-gi-mass ka",
        tip: "At most temple halls, yes. There will be a step up, a shoe rack, or a plastic bag to carry them in. Wear socks and slip-on shoes on temple days, and expect the same rule in traditional restaurants and ryokan.",
      },
      {
        en: "May we go inside?",
        script: "中に入ってもいいですか",
        romaji: "Naka ni haitte mo ii desu ka",
        phonetic: "na-ka ni ha-it-te mo i-i dess ka",
        tip: "Some inner halls carry a separate ¥300–¥800 admission and some are closed to the public entirely. A small gesture toward the doorway with this phrase gets a clear yes or no.",
      },
      {
        en: "What time do you close?",
        script: "何時までですか",
        romaji: "Nanji made desu ka",
        phonetic: "nan-ji ma-de dess ka",
        tip: "Shrine grounds are often open late or all night, but the office and the goshuin desk typically close around 16:00–16:30. 拝観時間 (haikan jikan) on a sign means visiting hours.",
      },
      {
        en: "Thank you very much (polite, for a kindness received)",
        script: "どうもありがとうございました",
        romaji: "Dōmo arigatō gozaimashita",
        phonetic: "do-o-mo a-ri-ga-to-o go-za-i-mash-ta",
        tip: "The past tense form, for something already done for you — the right one after receiving a goshuin, a blessing, or directions. Add a small bow from the waist; the bow carries more weight than the words do.",
      },
    ],
  },
  {
    group: "One day in Korea — Jeju",
    lang: "ko-KR",
    note: "Jeju has a famously distinct dialect, but everyone speaks and understands standard Korean, so these ten will carry you comfortably through a port day.",
    phrases: [
      {
        en: "Hello",
        script: "안녕하세요",
        romaji: "Annyeonghaseyo",
        phonetic: "an-nyong-ha-se-yo",
        tip: "Works all day and in every situation, from a shopkeeper to a stranger on a path. Add a small nod as you say it. Korean bowing is lighter and quicker than Japanese bowing.",
      },
      {
        en: "Thank you",
        script: "감사합니다",
        romaji: "Gamsahamnida",
        phonetic: "kam-sa-ham-ni-da",
        tip: "The ㅂ in 합 assimilates to an m before the following n, so it is 'ham-ni-da' and never 'hap-nee-da' — this is the mistake foreigners make most. 고맙습니다 (gomapseumnida, 'ko-map-sseum-ni-da') is equally polite and slightly warmer.",
      },
      {
        en: "Excuse me (to get attention)",
        script: "저기요",
        romaji: "Jeogiyo",
        phonetic: "juh-gi-yo",
        tip: "This is how you call a waiter or flag down a stranger — said out loud across a restaurant, which feels rude to Canadians but is entirely normal in Korea. For squeezing past someone, use the formal 실례합니다 (sillyehamnida, 'shil-lye-ham-ni-da') instead.",
      },
      {
        en: "Yes",
        script: "네",
        romaji: "Ne",
        phonetic: "ne",
        tip: "Often comes out sounding like 'de'. Like Japanese hai, it frequently just signals 'I'm listening'. 예 (ye) is a more formal variant you'll hear from staff.",
      },
      {
        en: "No",
        script: "아니요",
        romaji: "Aniyo",
        phonetic: "a-ni-yo",
        tip: "To decline something being offered, 괜찮아요 (gwaenchanayo, 'gwen-cha-na-yo' — 'I'm fine, thanks') is much softer and more natural than a flat no.",
      },
      {
        en: "Where is the bathroom?",
        script: "화장실이 어디예요?",
        romaji: "Hwajangsiri eodiyeyo?",
        phonetic: "hwa-jang-shi-ri uh-di-ye-yo",
        tip: "The final ㄹ of 화장실 links into the next syllable, giving 'shi-ri'. In a pinch, just saying 화장실? (hwajangsil, 'hwa-jang-shil') with a questioning tone works perfectly.",
      },
      {
        en: "How much is it?",
        script: "얼마예요?",
        romaji: "Eolmayeyo?",
        phonetic: "uhl-ma-ye-yo",
        tip: "이거 얼마예요? (igeo eolmayeyo) is 'how much is this?' Jeju's traditional markets prefer cash; larger shops and cafés take foreign cards without any trouble.",
      },
      {
        en: "It's delicious",
        script: "맛있어요",
        romaji: "Masisseoyo",
        phonetic: "ma-shi-ssuh-yo",
        tip: "Present tense, so say it while eating — ideally to the cook. There is no exact Korean equivalent of gochisōsama; afterwards you say 잘 먹었습니다 (jal meogeotseumnida, 'jal muh-guh-sseum-ni-da'), 'I ate well'.",
      },
      {
        en: "Please give me this one",
        script: "이거 주세요",
        romaji: "Igeo juseyo",
        phonetic: "i-guh ju-se-yo",
        tip: "Point and say it — the single most useful sentence pattern in Korean. 주세요 attaches to any noun: 물 주세요 (mul juseyo) for water, 계산서 주세요 for the bill.",
      },
      {
        en: "Goodbye",
        script: "안녕히 계세요",
        romaji: "Annyeonghi gyeseyo",
        phonetic: "an-nyong-hi ge-se-yo",
        tip: "Use this one when YOU are the one leaving — it means 'stay well'. If the other person is the one departing, it is 안녕히 가세요 (annyeonghi gaseyo, 'go well'). Mixing them up is the classic learner's error. Leaving a shop, 수고하세요 (sugohaseyo) is a warm alternative that acknowledges the staff's hard work.",
      },
    ],
  },
];
