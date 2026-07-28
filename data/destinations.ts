import type { StaticImageData } from "next/image";

import naritaArrival from "@/public/images/narita-arrival.jpg";
import hyattYokohama from "@/public/images/hyatt-yokohama.jpg";
import enoshimaDragonShrine from "@/public/images/enoshima-dragon-shrine.jpg";
import enoshimaIwayaCaves from "@/public/images/enoshima-iwaya-caves.jpg";
import yokohamaChinatown from "@/public/images/yokohama-chinatown.jpg";
import osanbashiPier from "@/public/images/osanbashi-pier.jpg";
import meotoIwa from "@/public/images/meoto-iwa.jpg";
import ryugushaShrine from "@/public/images/ryugusha-shrine.jpg";
import katsurahamaBeach from "@/public/images/katsurahama-beach.jpg";
import ryuotsuShrine from "@/public/images/ryuotsu-shrine.webp";
import kanmonStraits from "@/public/images/kanmon-straits.webp";
import jungmunBeach from "@/public/images/jungmun-beach.jpg";
import cheonjeyeonWaterfall from "@/public/images/cheonjeyeon-waterfall.jpg";
import sofukujiRyugumon from "@/public/images/sofukuji-ryugumon.jpg";
import gloverGarden from "@/public/images/glover-garden.jpg";
import izumiBath from "@/public/images/izumi-bath.jpg";
import cocomoMakeover from "@/public/images/cocomo-makeover.jpg";
import asakusaViewHotel from "@/public/images/asakusa-view-hotel.webp";
import kaminarimonGate from "@/public/images/kaminarimon-gate.jpg";
import sensojiDragonFountain from "@/public/images/sensoji-dragon-fountain.jpg";
import sensojiDragonCeiling from "@/public/images/sensoji-dragon-ceiling.jpeg";

/**
 * Every port on this voyage is anchored in sea-dragon mythology — which is
 * not a coincidence but the reason the itinerary was built the way it was.
 */
export type GlossaryTerm = {
  /** Romanised reading. */
  term: string;
  /** Native script — kanji, kana or hangul. */
  script: string;
  meaning: string;
};

export type Destination = {
  id: string;
  name: string;
  japaneseName: string;
  romaji: string;
  day: string;
  tagline: string;
  story: string;
  myth: { title: string; text: string };
  tradition: string;
  didYouKnow: string;
  glossary: GlossaryTerm[];
  /** How this place ties back to the dragon thread. Empty if it genuinely doesn't. */
  dragonConnection: string;
  /** Hex accent evoking the place. Decorative use only — several of these
   *  are too dark to set type in. */
  accent: string;
  /** The same hue lifted until it clears 5:1 on the darkest ground, for text. */
  accentText: string;
  image: StaticImageData;
  imageAlt: string;
};

export const destinations: Destination[] = [
  {
    id: "narita-arrival",
    name: "Narita Airport Terminal 1 & the Road South to Yokohama",
    japaneseName: "成田国際空港 第1旅客ターミナル",
    romaji: "Narita Kokusai Kūkō Dai-ichi Ryokaku Tāminaru",
    day: "Day 2 · Tuesday, 20 July 2027",
    tagline: "The doors sigh open, someone bows, and Japan begins in traffic-cone orange.",
    story:
      "The cabin doors sigh open and Terminal 1 takes you in — a long ribbon of glass and steel that has been receiving the world since 1978. You clear immigration beneath signage in four scripts, and the first thing that happens is not a stamp but a bow: the officer, the baggage attendant, the woman at the kiosk. Outside, Japan announces itself as heat, wet and cicada-loud. Then you find the curb, and there it is, unmistakable in traffic-cone orange — the Airport Limousine. A white-gloved loader weighs your case, tags it, hands you the stub, and bows to the departing bus. For the next hour and forty minutes you sleep and wake against the glass while Chiba dissolves into Tokyo Bay: container cranes standing like grazing herons, the long silver reach of the bridges. Then the doors open in Yokohama, and the air tastes of salt.",
    myth: {
      title: "The Immovable Fire King of Narita",
      text:
        "Twenty minutes from your gate stands Narita-san Shinshō-ji, and the airport owes the town its name. In 940 the warlord Taira no Masakado declared himself a new emperor and the Kantō plain caught fire. The court sent the monk Kanchō east carrying an image of Fudō Myō-ō — the Immovable Wisdom King, wreathed in flame, said to have been carved by Kūkai himself. Kanchō set the statue down on the Shimōsa plain and prayed. The rebellion collapsed. When the monks tried to carry Fudō home, the statue would not lift; it had become immovable in fact as well as in name. They built the temple where it stood and called it Shinshō-ji, \"New Victory\".",
    },
    tradition:
      "No one will take a tip; offering one causes gentle distress. Money is not passed hand to hand but laid in a small tray on the counter, and returned the same way, often with both hands. Queues form on painted footprints without anyone being asked. And the bow you receive is not performance — return it, shallow and unhurried, and you have already said thank you correctly.",
    didYouKnow:
      "Terminal 1 has five satellite concourses — two of them perfect circles, a 1978 idea for parking jumbo jets nose-in around the rim.",
    glossary: [
      { term: "Rimujin basu", script: "リムジンバス", meaning: "\"Limousine bus\" — the orange airport coach, famous more for legroom than luxury" },
      { term: "Irasshaimase", script: "いらっしゃいませ", meaning: "\"Welcome, come in\" — called out to every customer crossing a shop threshold" },
      { term: "Otsukaresama desu", script: "お疲れさまです", meaning: "\"You must be tired\" — the all-purpose acknowledgement of someone's effort" },
      { term: "Fudō Myō-ō", script: "不動明王", meaning: "The Immovable Wisdom King, flame-wreathed; the deity of nearby Narita-san" },
    ],
    dragonConnection:
      "Fudō Myō-ō — Narita's own deity — is classically shown with the kurikara, the sword a dragon king coils around and swallows whole. Your voyage opens under a dragon-wrapped blade.",
    accent: "#E07A3F",
    accentText: "#D57D4A",
    image: naritaArrival,
    imageAlt: "An orange Airport Limousine coach waiting at the kerb of Narita Terminal 1.",
  },
  {
    id: "hyatt-yokohama",
    name: "Hyatt Regency Yokohama, Yamashita-chō",
    japaneseName: "ハイアット リージェンシー 横浜（山下町）",
    romaji: "Haiatto Rījenshī Yokohama",
    day: "Day 2 · Tuesday, 20 July 2027",
    tagline: "A window on the harbour, Chinatown five minutes south, your ship already waiting.",
    story:
      "Your room sits somewhere between the third floor and the nineteenth, and what it gives you is water. Beyond the plane trees of Yamashita Park the bay opens out: the Hikawa Maru riding at her permanent mooring, the Bay Bridge drawn in white cable across the horizon, and — just there, to the left — the low pale spine of Ōsanbashi, where your ship will be. Come nightfall, Minato Mirai lights up across the harbour and the great Ferris wheel counts the minutes in neon. The hotel is new here, opened in May 2020, standing on a street that was foreign concession ground when Yokohama was Japan's one open door to the world. Step out and turn right for the sea wall. Turn left and in five minutes you are under a gate the colour of a dragon's back, and everything smells of star anise.",
    myth: {
      title: "Akai Kutsu — The Girl in the Red Shoes",
      text:
        "On the sea wall in Yamashita Park sits a small bronze girl in red shoes, looking out at the water. She comes from a 1922 children's poem by Noguchi Ujō about a girl carried away overseas by a foreigner. Since a long investigation in the 1970s she has been identified with Iwasaki Kimi (1902–1911), given by her mother to American missionaries named Hewitt. When Kimi fell ill with tuberculosis the Hewitts sailed without her, and she died at nine in an orphanage in Azabu. Her mother went to her own grave believing her daughter had crossed this ocean. Some writers dispute the identification entirely — but the statue keeps watching the sea.",
    },
    tradition:
      "Evening in Yamashita Park has its own quiet choreography: couples walk the sea wall from the Red Shoes girl to the Hikawa Maru and back, buskers set up under the plane trees, and almost nobody eats while walking — food is finished standing beside the stall that sold it. Public bins are scarce, so people simply carry their rubbish home.",
    didYouKnow:
      "Yamashita Park is built on rubble from the 1923 Great Kantō Earthquake — the city swept its own ruins into the sea and planted a promenade on top.",
    glossary: [
      { term: "Minato Mirai", script: "みなとみらい", meaning: "\"Harbour of the future\" — the glass skyline across the water from your window" },
      { term: "Yamashita-kōen", script: "山下公園", meaning: "The seafront park below the hotel, opened in 1930 on earthquake rubble" },
      { term: "Hikawa Maru", script: "氷川丸", meaning: "1930 NYK liner moored permanently at the park, now a museum ship" },
      { term: "Kannai", script: "関内", meaning: "\"Inside the barrier\" — old name for Yokohama's foreign settlement quarter" },
    ],
    dragonConnection:
      "From this window you can trace tomorrow's whole dragon-road: Ōsanbashi's whale-back to the north, and five minutes south the Azure Dragon gate on Chinatown's eastern edge.",
    accent: "#24406B",
    accentText: "#638CCA",
    image: hyattYokohama,
    imageAlt: "The Hyatt Regency Yokohama rising above the Minato Mirai waterfront.",
  },
  {
    id: "enoshima-dragon-shrine",
    name: "Enoshima Island — the Dragon Shrine & the Bell of Dragon's Love",
    japaneseName: "江の島・江島神社・龍恋の鐘",
    romaji: "Enoshima · Enoshima-jinja · Ryūren no Kane",
    day: "Day 3 · Wednesday, 21 July 2027",
    tagline: "An island a goddess raised from the seabed, and a bell two lovers ring together.",
    story:
      "You cross the long bridge from Katase with the sea on both sides and Enoshima rising ahead, green and steep. Through the bronze torii — cast in 1821 — the lane narrows into souvenir stalls and grilled-squid smoke, and then Zuishinmon stands over you in vermilion and gold, built deliberately in the shape of Ryūgū-jō, the dragon's palace under the sea. Above it the island unfolds shrine by shrine: a long stone climb, or the Escar, Japan's first outdoor escalator, four minutes against twenty. In the octagonal Hōan-den, behind glass in dim light, sit two Benzaiten — one eight-armed and bristling with weapons, one naked, serene and startlingly human. Higher still, past cedars loud with cicadas, the dragon hall crouches over the sea. Then the path drops to Lovers' Hill, where a small bronze bell hangs above Sagami Bay and every inch of fence is furred with padlocks.",
    myth: {
      title: "Benzaiten and the Five-Headed Dragon",
      text:
        "The Enoshima Engi, written in 1047 by the monk Kōkei, says that for a thousand years a five-headed dragon, Gozuryū, lived in a lake inland and terrorised the village of Koshigoe with floods, fire, and children taken. Then in 552 the sea boiled, the sky darkened, and an island rose out of the bay: Enoshima, made as a seat for the goddess Benzaiten, who descended onto it. The dragon saw her and asked her to marry him. She refused, and told him plainly what he was. Shamed by her eloquence, he swore to protect the people instead, turned to face her island and became a hill — Tatsu-no-kuchi, Dragon's Mouth. Popular retellings soften it: she accepts him once he has reformed.",
    },
    tradition:
      "At Ryūren no Kane you ring the bell together — both of you with a hand on the rope, one stroke is enough. Then you write your two names on a padlock bought from the shops below and snap it shut on the wire fence among thousands of others. Couples who ring it together, the island promises, are never parted.",
    didYouKnow:
      "The eight-armed Benzaiten in the Hōan-den was given by Minamoto no Yoritomo in 1182, the year he prayed on this island for victory in the north.",
    glossary: [
      { term: "Enoshima-jinja", script: "江島神社", meaning: "One shrine in three halls: Hetsunomiya, Nakatsunomiya and Okutsunomiya" },
      { term: "Ryūren no Kane", script: "龍恋の鐘", meaning: "\"Bell of the dragon's love\", hung on Lovers' Hill in 1996" },
      { term: "Benzaiten", script: "弁財天", meaning: "Goddess of water, music, eloquence and wealth; Enoshima is her island" },
      { term: "Wadatsumi-no-miya", script: "龍宮", meaning: "\"Dragon palace\" — the sea-dragon hall raised above the caves in 1993" },
    ],
    dragonConnection:
      "The whole island is the dragon's love story: raised for Benzaiten, guarded by Gozuryū, who lies petrified across the mainland hills with his head at Tatsu-no-kuchi, still facing her.",
    accent: "#B23A2E",
    accentText: "#D66B61",
    image: enoshimaDragonShrine,
    imageAlt: "The Enoshima dragon shrine looking out over the Sagami Bay coastline.",
  },
  {
    id: "enoshima-iwaya-caves",
    name: "Enoshima Iwaya Sea Caves",
    japaneseName: "江の島岩屋",
    romaji: "Enoshima Iwaya",
    day: "Day 3 · Wednesday, 21 July 2027",
    tagline: "They hand you a candle at the cave mouth, and after that the light is yours.",
    story:
      "The path down the island's far side turns raw: black rock, a boardwalk pinned to the cliff, waves working underneath. At the entrance someone hands you a candle in a small holder, and you carry your own light into the First Cave — 152 metres of dripping stone that the sea cut and the earthquakes lifted clear of the water. The air goes cool and mineral. Rows of weathered stone figures watch from the walls, left by pilgrims across centuries. The passage forks: right, to a cramped inner sanctum said to be where Benzaiten first appeared and Enoshima Shrine began; left, into a tunnel local lore insists runs a hundred kilometres to an ice cave at the foot of Mount Fuji. The Second Cave is shorter and stranger. At the end of it a dragon waits in the dark. Clap, and it answers.",
    myth: {
      title: "The Grotto Where the Island Began",
      text:
        "Tradition holds that in 552, in the reign of Emperor Kinmei, an oracle directed that a shrine be raised in this grotto — the origin of Enoshima Shrine, and the place where Benzaiten took up residence. The caves became a site of severe practice. En no Gyōja, the mountain ascetic counted as the founder of Shugendō, is said to have trained here; so, later, are Kūkai, Ennin and Nichiren. In 1182 Minamoto no Yoritomo prayed in the cave before moving against Fujiwara no Hidehira in the north. By the Edo period this was mass pilgrimage: thousands came in by candlelight, exactly as you are about to.",
    },
    tradition:
      "The candle is the whole ritual. You hold it low and steady, cup a hand around it at the draughty corners, and let your eyes go slack until the walls come forward and the carved faces surface out of the dark. Don't touch the stone — centuries of hands have already polished it. At the end you hand the light back; the flame stays in the cave.",
    didYouKnow:
      "Local lore says the left branch of the First Cave runs all the way to Narusawa Ice Cave at the foot of Mount Fuji, roughly 100 km away.",
    glossary: [
      { term: "Iwaya", script: "岩屋", meaning: "Rock grotto; a sea cave used as a place of worship" },
      { term: "En no Gyōja", script: "役行者", meaning: "\"The ascetic En\" — 7th-century mountain mystic, founder of Shugendō" },
      { term: "Kōbō Daishi", script: "弘法大師", meaning: "Posthumous name of Kūkai, founder of Shingon Buddhism" },
      { term: "Ryūjin", script: "龍神", meaning: "The dragon god of the sea, master of the tides" },
    ],
    dragonConnection:
      "On the rock directly above the First Cave stands Wadatsumi-no-miya, the sea-dragon's hall. You are inside the hill the dragon guards, walking toward the spot where Benzaiten came ashore.",
    accent: "#C8A02E",
    accentText: "#C7A02F",
    image: enoshimaIwayaCaves,
    imageAlt: "Visitors carrying candle lanterns through the Iwaya sea caves.",
  },
  {
    id: "yokohama-chinatown",
    name: "Yokohama Chinatown — Kanteibyō & the Fortune Hall",
    japaneseName: "横浜中華街・関帝廟",
    romaji: "Yokohama Chūkagai · Kanteibyō",
    day: "Day 3 · Wednesday, 21 July 2027",
    tagline: "Five sticks of incense for a war god, then a stranger reads your face.",
    story:
      "You come in under Chōyōmon, the eastern gate, painted the blue-green of an azure dragon, and the temperature of the day changes. Five hundred-odd kitchens are working at once: pork buns steaming in towers, roast duck lacquered in the windows, sugar and sesame and hot oil. Then, up a side street, gold explodes. Kanteibyō is all carved dragons and glazed tile, unapologetically loud after the cedar hush of Enoshima. You buy five sticks of incense, light them at the great censer, fan the flame out rather than blow it, and walk the burners in order. Afterwards you duck into a fortune hall — a curtained booth, a small table, a woman who studies your face carefully before she touches the cards. She reads the bones under your skin first, then the tarot. You will argue about it the whole way to the ship.",
    myth: {
      title: "Guan Yu, the God Merchants Trust",
      text:
        "Kanteibyō enshrines Guan Yu, a general of the collapsing Han dynasty who died in 220 and has been climbing the ranks of heaven ever since — sworn brother, sworn defender, eventually a god. The novel Romance of the Three Kingdoms gave him a red face, a long beard and the Green Dragon Crescent Blade, forged, the story says, when a green dragon flew over the smithy and was cut apart into the steel. Historians doubt the weapon ever existed; that style of polearm postdates him by centuries. It hardly matters. Merchants adopted him not for war but for his absolute reliability with a promise and a ledger, and pray to him now for prosperity, honest dealing and safe returns.",
    },
    tradition:
      "Buy a set of five incense sticks at the reception desk. Light them at the great censer in the forecourt, and put the flame out by fanning, never by blowing. Then place one stick in each of the five burners, in order: the Jade Emperor, then Guan Yu, then Di Mu Niang Niang, then Guan Yin, then Fu De Zheng Shen. Bow, and say what you came to say.",
    didYouKnow:
      "The hall you enter is the fourth Kanteibyō. Fire destroyed the third on New Year's Day 1986 — but the three deity statues survived it, and are still here.",
    glossary: [
      { term: "Kanteibyō", script: "関帝廟", meaning: "\"Temple of Emperor Guan\" — Chinatown's central place of worship" },
      { term: "Chōyōmon", script: "朝陽門", meaning: "The blue east gate, guarded by Seiryū, the Azure Dragon of spring" },
      { term: "Ninsō", script: "人相", meaning: "Face-reading; divination from the features and the bone beneath" },
      { term: "Uranai", script: "占い", meaning: "Fortune-telling; an uranai-kan 占い館 is a fortune-telling hall" },
    ],
    dragonConnection:
      "You enter through the Azure Dragon's gate and pray to a god whose blade was legendarily forged from a green dragon that flew over the smithy at exactly the wrong moment.",
    accent: "#8C1F2F",
    accentText: "#DC6879",
    image: yokohamaChinatown,
    imageAlt: "The ornate painted gate and dragon roof carvings of Kanteibyo Temple.",
  },
  {
    id: "osanbashi-pier",
    name: "Ōsanbashi Pier — the Whale's Back",
    japaneseName: "横浜港大さん橋国際客船ターミナル",
    romaji: "Yokohama-kō Ōsanbashi Kokusai Kyakusen Tāminaru",
    day: "Day 3 · Wednesday, 21 July 2027",
    tagline: "A wooden deck with no pillars and no straight lines, and a white wall of ship.",
    story:
      "Ōsanbashi does not look like a terminal. It looks like something surfacing. You walk up a ramp and out onto a rooftop of Brazilian ipe, warm underfoot, folded and rippling like a dune — no columns anywhere, no steps, no right angles, grass growing in the hollows. Yokohama named it kujira no senaka, the whale's back, and once you are standing on it you cannot unsee the animal. To one side Minato Mirai stacks itself into the sky; to the other, the Bay Bridge. And filling the whole northern edge, close enough to read her rivets, Diamond Princess — 115,875 tons of her, built in Nagasaki, the first Princess ship ever launched from a Japanese yard. At 15:00 the horn goes, a note you feel in your sternum, and it is the wooden deck that slides away from you, and Japan begins to move.",
    myth: {
      title: "Ryūgū-jō, the Palace Under the Sea",
      text:
        "Everything from here is the sea-dragon's country. The Kojiki tells how Hoori, searching for a lost fishhook, went down to Ryūgū-jō, the dragon palace of Watatsumi, god of the sea, and stayed three years that felt like days. He married Watatsumi's daughter Toyotama-hime and was sent home with the tide jewels — one to raise the water, one to lower it. When Toyotama-hime came ashore to give birth she begged him not to look. He looked, and saw a wani, a great sea-serpent, and she fled back into the water for ever. Their grandson, the chronicles say, became Japan's first emperor.",
    },
    tradition:
      "Japanese sailings keep the old rituals where they can. Coloured paper streamers are thrown from the rails so that ship and shore are stitched together — and are meant to break, which is the point. As the lines come off, the port plays Hotaru no Hikari, Japan's farewell tune and the same melody as Auld Lang Syne. Nobody stops waving until faces are gone.",
    didYouKnow:
      "The rooftop got its nickname kujira no senaka, \"whale's back\", by public vote on 4 December 2006, chosen from 3,995 suggestions.",
    glossary: [
      { term: "Ōsanbashi", script: "大さん橋", meaning: "\"The great pier\" — Yokohama's international passenger terminal, rebuilt 2002" },
      { term: "Kujira no senaka", script: "くじらのせなか", meaning: "\"The whale's back\" — the rooftop deck, open to anyone, 24 hours a day" },
      { term: "Watatsumi", script: "綿津見", meaning: "The sea-dragon god whose palace lies beneath the water you are sailing over" },
      { term: "Hotaru no hikari", script: "蛍の光", meaning: "\"Light of the fireflies\" — the Japanese farewell song, played at castoff" },
    ],
    dragonConnection:
      "The whale's back carries you to the water's edge, and beyond it the dragon king's country begins. Wadatsumi-no-miya at Enoshima this morning honoured the very god whose sea you now sail.",
    accent: "#2F6D7A",
    accentText: "#4198AA",
    image: osanbashiPier,
    imageAlt: "The Diamond Princess berthed along the timber deck of Osanbashi Pier.",
  },
  {
    id: "meoto-iwa",
    name: "Futami Okitama Shrine & the Wedded Rocks",
    japaneseName: "二見興玉神社・夫婦岩",
    romaji: "Futami Okitama-jinja / Meoto Iwa",
    day: "Day 4 · Thursday, 22 July 2027",
    tagline: "Two rocks bound by a rice-straw rope, married since the making of the world.",
    story:
      "The tender noses into Toba and the bay opens flat and silver. A short ride west, the pines of Futamiura part, and there they are: the husband rock shouldering nine metres out of the shallows with a small torii on its crown, the wife rock low beside him, and slung between them the shimenawa — thirty-five metres of braided rice straw in five great strands, sagging, lifting, dripping over open water. You walk the shore path past frog after frog after frog. At the purification basin, water pours over a frog's back for wishes granted; at the shrine office you draw a kaeru-mikuji, tugging your fortune out of a frog's mouth. Unfold it. And somewhere out there, roughly seven hundred metres offshore and usually drowned, lies the rock this whole shrine is actually facing.",
    myth: {
      title: "The Rope, the Pair, and the Rock You Cannot See",
      text:
        "Japan's first story begins on the floating bridge of heaven. Izanagi and Izanami stir the brine with a jewelled spear; the drops that fall from its tip harden into the first island. There they marry, and go on to bear the islands of Japan and a host of kami — the mountains, the winds, the sea. The Wedded Rocks are read as that pair made stone: the tall husband, the smaller wife, joined by a rope no tide unties. But the rocks are not the object of worship. They stand as a torii, a frame — the true sacred body is Okitama Shingan, a submerged stone offshore where Sarutahiko Ōkami, the towering crossroads-kami who guided the heavenly grandchild down to earth, is said to have come ashore.",
    },
    tradition:
      "Futami is where pilgrims cleanse before going on to Ise. That is hamasangu: once you waded into this bay; today the priests purify you at the shrine office with mukushiogusa, \"unblemished salt grass\" gathered from the sacred rock. You take a sprig home as a talisman or steep it in your bath. And walk through the torii at its side — the centre is the kami's own path.",
    didYouKnow:
      "Frogs here are Sarutahiko's messengers and a pun: kaeru means both \"frog\" and \"to return\" — hence charms for safe returns and money coming back.",
    glossary: [
      { term: "Meoto Iwa", script: "夫婦岩", meaning: "\"Wedded Rocks\" — literally the husband-and-wife rocks" },
      { term: "shimenawa", script: "注連縄", meaning: "Sacred rice-straw rope marking the boundary of holy ground" },
      { term: "kaeru-mikuji", script: "かえるみくじ", meaning: "Fortune slip drawn from a frog's mouth, unique to this shrine" },
      { term: "hamasangu", script: "浜参宮", meaning: "Seaside purification undertaken before visiting the Ise Grand Shrine" },
    ],
    dragonConnection:
      "The pair who made the islands also fathered the sea-kami. Their rope hangs over the water you are sailing — and the dragon's own shrine waits three hundred metres east along this same shore path.",
    accent: "#D9A441",
    accentText: "#D4A246",
    image: meotoIwa,
    imageAlt: "The Wedded Rocks at Futami, joined above the water by a heavy straw shimenawa rope.",
  },
  {
    id: "ryugusha-shrine",
    name: "Ryugusha, the Sea-Dragon Shrine",
    japaneseName: "龍宮社",
    romaji: "Ryūgūsha",
    day: "Day 4 · Thursday, 22 July 2027",
    tagline: "A red-and-green shrine at the tideline, named for the dragon king's palace itself.",
    story:
      "Follow the path east from the Wedded Rocks, past the last of the frogs, until the walkway simply runs out at the water's edge. Here is Ryugusha: a small hall in vermillion with a green roof, standing so close to the sea that spray reaches it in a blow. There is no gap at all between shrine and ocean. You bow twice, clap twice, bow once, and the sound of your hands goes straight out over the bay. Inside is Watatsumi Ōkami, great kami of the sea, whom Japan has long read as Ryūjin the dragon. Then walk back up the approach, where the mochi shops are steaming. Futami's own is ofuku-mochi, wave-shaped and filled with bean paste — skewered gohei-mochi turns up at stalls hereabouts too, though it belongs to inland Chūbu rather than to this shrine's rites.",
    myth: {
      title: "Ryugu-jo, the Palace at the Bottom of the Sea",
      text:
        "Ryūgū-jō, the dragon palace, stands on the seabed, built of coral and crystal, each of its four sides holding a different season, where a day can equal a hundred years above. It is the house of Watatsumi, kami of the sea, whose other name is Ryūjin, the dragon. To this palace the fisherman Urashima Tarō is carried on a turtle's back. From it Hoori — grandfather of Japan's first emperor — brings home the sea-god's daughter and the two jewels that command the tides. This little hall at the waterline is named for that palace: it calls the dragon's own address down onto a shore where the sea is close enough to touch.",
    },
    tradition:
      "On the fifteenth day of the fifth lunar month the priests hold Gochūse, Ryugusha's annual rite. Sea vegetables and produce are laid on a small wooden boat and set adrift, and the village remembers a tsunami of 1792 that swept away most of a neighbourhood — and remembers, too, that the survivors fed and sheltered one another. The lesson itself is the offering.",
    didYouKnow:
      "The offerings are coded warnings: miru seaweed and matsuna greens pun on \"don't look, don't wait\" — when the sea draws back, run, don't watch.",
    glossary: [
      { term: "Ryūgū-jō", script: "龍宮城", meaning: "The dragon king's palace beneath the sea" },
      { term: "Watatsumi Ōkami", script: "綿津見大神", meaning: "Great kami of the sea, guardian of everyone who sails" },
      { term: "Ryūjin", script: "龍神", meaning: "The dragon god of the sea, master of the tides" },
      { term: "Gochūse", script: "郷中施", meaning: "\"Aid within the village\" — the shrine's tsunami memorial rite" },
    ],
    dragonConnection:
      "The voyage's namesake in miniature: a shrine literally called Dragon Palace, standing where the sea touches the path, for the kami whose house you will hear of again at Dan-no-ura.",
    accent: "#B23A2E",
    accentText: "#D66B61",
    image: ryugushaShrine,
    imageAlt: "Ryugusha, the small vermillion sea-dragon shrine standing at the tideline.",
  },
  {
    id: "katsurahama-beach",
    name: "Katsurahama Beach",
    japaneseName: "桂浜",
    romaji: "Katsurahama",
    day: "Day 5 · Friday, 23 July 2027",
    tagline: "A moon-famous crescent of five-coloured pebbles, with Ryoma staring down the Pacific.",
    story:
      "You hear it before you see it: the Pacific arriving all at once, no reef, no shelter, straight off the open ocean. Then the pines break and the crescent appears — five hundred metres of sand and stone strung between two headlands, Ryūzu at one end, Ryūō at the other. Dragon's head; dragon king. Crouch and the shingle is not grey but green, red, white, black and grey, rounded by rivers off Mount Ishizuchi and sorted by the surf. Above you Sakamoto Ryōma stands in bronze, 5.3 metres of him on a plinth that lifts him to thirteen and a half, kimono and Western boots, hands folded into his sleeves, facing the ocean he wanted Japan to cross. Do not swim; the undertow here kills people. Come back at dusk instead. This is the moon's beach.",
    myth: {
      title: "The Tree That Grows on the Moon",
      text:
        "The beach was written many ways in old records — Katsuura-hama and others — before the characters settled on 桂, katsura, the tree that East Asian legend says grows on the moon. In the story a man named Wu Gang is sentenced to fell it; every cut he makes heals over instantly, so he chops forever, and the shadow on the moon's face is his tree. Tosa's people took that name for their beach because the moon rising straight out of the Pacific here was reckoned the finest in the province. Kōchi's own folk song still says so: tsuki no meisho wa Katsurahama — \"for the moon, the famous place is Katsurahama.\"",
    },
    tradition:
      "Tsukimi, moon-viewing, is a real observance still. For the autumn harvest moon people gather with dango dumplings stacked in a pyramid and susuki pampas grass set where the light can reach it — an offering of what the season gave. In July you get the summer moon instead, lifting clear of the Pacific. The etiquette is nothing: bring little, say less, watch.",
    didYouKnow:
      "Katsurahama's pebbles come in exactly five colours from five different rocks — green tuff, red basalt, white quartz, black shale, grey sandstone.",
    glossary: [
      { term: "Katsurahama", script: "桂浜", meaning: "\"Katsura-tree beach\" — for the tree said to grow on the moon" },
      { term: "tsukimi", script: "月見", meaning: "Moon-viewing; a seasonal ritual of watching the moon rise" },
      { term: "goshiki no koishi", script: "五色の小石", meaning: "The beach's celebrated five-coloured pebbles" },
      { term: "Ryūō-misaki", script: "龍王岬", meaning: "Dragon King Cape, the headland closing the beach's far end" },
    ],
    dragonConnection:
      "The beach is held between two dragons — Ryūzu-misaki, Dragon's Head Cape, at one end and Ryūō-misaki, Dragon King Cape, at the other, with the sea-god's shrine on the stair above.",
    accent: "#4C6E93",
    accentText: "#6E8FB4",
    image: katsurahamaBeach,
    imageAlt: "The pine-framed crescent of Katsurahama beach on the Pacific coast of Kochi.",
  },
  {
    id: "ryuotsu-shrine",
    name: "Watatsumi Shrine — Katsurahama's Dragon King Palace",
    japaneseName: "海津見神社（桂浜龍王宮）",
    romaji: "Watatsumi-jinja / Katsurahama Ryūō-gū",
    day: "Day 5 · Friday, 23 July 2027",
    tagline: "Climb the cliff stair to a red torii and a dragon king who rules the tides.",
    story:
      "At the far end of the beach a small bridge crosses to Ryūō-misaki, and then the stone steps begin. They are steep, salt-worn, walled in by wind-cut green, and they climb the rock in short flights until the vermillion torii opens onto nothing but sky and water. The hall is tiny. The view is enormous — the whole crescent behind you, the Pacific in front, the surf working the cliff directly beneath your feet. Ōwatatsumi-no-kami is enshrined here: safety at sea, full nets, rain when the fields want it, and, they add, good marriages. Fishermen out of Urado have asked here for centuries; tradition credits the Chōsokabe lords with founding it. There is usually no priest. You drop coins in the box, bow into the wind, and the sea answers by hitting the rocks.",
    myth: {
      title: "The Dragon Who Keeps the Tides",
      text:
        "Ōwatatsumi is the sea given a will — born, the Kojiki says, of Izanagi and Izanami, master of every current and every creature in it. Japan long ago folded him together with Ryūjin the dragon, who keeps in his palace the kanju and manju, the tide-ebbing and tide-flowing jewels. The story that matters on this cape is Hoori's: having lost his brother's fishhook, he goes down to the dragon's palace, marries the sea-god's daughter Toyotama-hime, and comes home with both jewels — raising the tide against his brother, then letting it fall. To ask a dragon for the sea's mercy is to ask the one who decides when the water comes.",
    },
    tradition:
      "Drawing an omikuji: rattle the hexagonal box until one numbered stick slides out, hand over the number, take your slip and read it — daikichi, great blessing, down through kyō, curse. Good fortune goes home in your wallet. Bad fortune is folded and tied to the rack or a pine branch, traditionally one-handed, so the luck stays at the shrine and not with you.",
    didYouKnow:
      "Its formal name is Watatsumi Shrine; everyone calls it Ryūō-gū, the Dragon Palace. English spellings vary wildly — the cape itself is Ryūō-misaki.",
    glossary: [
      { term: "Ōwatatsumi-no-kami", script: "大綿津見神", meaning: "The great kami of the sea, ruler of all its creatures" },
      { term: "Ryūō-gū", script: "龍王宮", meaning: "\"Dragon King Palace\" — the shrine's popular name" },
      { term: "omikuji", script: "おみくじ", meaning: "Fortune drawn by lot; bad ones are tied off and left behind" },
      { term: "manju", script: "満珠", meaning: "The tide-flowing jewel kept in the dragon's palace" },
    ],
    dragonConnection:
      "Cape, shrine and kami are all dragon: Ryūō-misaki, Ryūō-gū, and Ōwatatsumi, whom Japan reads as Ryūjin. The same sea-god you saluted at Futami the day before.",
    accent: "#7E2B36",
    accentText: "#CE6F7C",
    image: ryuotsuShrine,
    imageAlt: "A small red shrine perched on the cliff above Katsurahama.",
  },
  {
    id: "kanmon-straits",
    name: "The Kanmon Straits",
    japaneseName: "関門海峡",
    romaji: "Kanmon Kaikyō",
    day: "Day 6 · Saturday, 24 July 2027",
    tagline: "The narrowest gap in Japan's history, where a child emperor sank to the dragon king.",
    story:
      "You never have to leave the balcony. Coffee, a chair, and Honshū closing on one side while Kyūshū closes on the other until the gap is barely six hundred and fifty metres and the ship is threading it. The water is not flat: it seams and boils and drags in ropes of current that can run past ten knots and reverse four times a day. Shimonoseki slides by — watch the shore for a red-and-white gate, Akama Jingū, built deliberately in the shape of the dragon palace. Then the Kanmon Bridge fills the sky, sixty-one metres of clearance, and for a few seconds the entire span passes overhead. Off to one side, low and green, Ganryūjima, where Musashi killed Kojirō with a carved oar in 1612. And below you, somewhere: 1185.",
    myth: {
      title: "A Capital Beneath the Waves",
      text:
        "Here on 25 April 1185 the Genpei War ended. Minamoto no Yoshitsune's archers shot the Taira helmsmen and rowers; the tide, by the traditional account, turned against the Taira through the afternoon. With defeat certain, Taira no Tokiko — Nii-no-Ama, the Nun of the Second Rank — gathered her grandson, the six-year-old Emperor Antoku, with the sacred sword at her waist and the sacred jewel under her arm. She turned him east to bid farewell to Ise, then west toward the Pure Land, and told him: nami no shita ni mo miyako no sōrō zo — beneath the waves, too, there is a capital. Then she carried him in. The mirror and jewel were recovered. The sword was not.",
    },
    tradition:
      "On the Kyūshū shore stands Mekari Jinja, whose priests still perform Mekari Shinji. In the small hours of the lunar New Year, by torchlight, three of them wade into the freezing strait and cut wakame seaweed stalk by stalk to lay on the altar — the sea's first harvest of the year, offered straight back to the sea. Fukuoka lists it as intangible folk culture.",
    didYouKnow:
      "Heikegani crabs wear a scowling samurai face on their shells — the drowned Heike, locals say. Sagan blamed fishermen's selection; the crabs are too small to eat.",
    glossary: [
      { term: "Ryūgū-jō", script: "龍宮城", meaning: "The dragon king's palace beneath the sea, where Antoku is said to have gone" },
      { term: "heikegani", script: "平家蟹", meaning: "\"Heike crab\" — its shell ridges read as a drowned samurai's face" },
      { term: "Dan-no-ura", script: "壇ノ浦", meaning: "The strait's eastern shore; site of the 1185 sea battle" },
      { term: "Kanmon Kaikyō", script: "関門海峡", meaning: "Strait named from Shimonoseki (kan) and Moji (mon)" },
    ],
    dragonConnection:
      "The voyage's keystone. Antoku vanishes into Ryūgū-jō, and medieval texts claim he was the Dragon King's daughter reborn — or the serpent Orochi — come to take back the sword Kusanagi.",
    accent: "#22344F",
    accentText: "#6A8CBF",
    image: kanmonStraits,
    imageAlt: "The Kanmon Bridge seen from the water, spanning the strait between Honshu and Kyushu.",
  },
  {
    id: "jungmun-beach",
    name: "Jungmun Saekdal Beach",
    japaneseName: "중문색달해수욕장",
    romaji: "Jungmun Saekdal Haesuyokjang",
    day: "Day 7 · Sunday, 25 July 2027",
    tagline: "Four colours of volcanic sand and grandmothers who surface whistling from the deep.",
    story:
      "You come down through the pines and the sand stops being one colour. Black, grey, red, white — jinmosal, Jeju calls it, ground out of the island's own lava and sorted into ribbons by the surf. Behind you a basalt headland rises in rusted columns; to the right the cliff opens into a sea cave fifteen metres tall, and inside it the rock folds like a lacquered screen. The water here is loud. Surfers wait beyond the break for the swell that makes Jungmun famous. Then you notice orange floats offshore, bobbing where no swimmer should be, and a sound carries across the water — a thin, ascending whistle. That is sumbisori, a haenyeo emptying her lungs after a minute under. She is seventy. She dives again. You stand in four colours of ash and understand you are on a volcano that never fully cooled.",
    myth: {
      title: "The Dragon Who Stole the Jade of Hallasan",
      text:
        "On Jeju's north shore, ten metres of black lava stands out of the surf with its head thrown back and its mouth open at the sky: Yongduam, Dragon Head Rock. The stories disagree, which is how you know they are old. In one, a dragon serving the Dragon King climbed Hallasan to fetch the elixir of eternal life and was shot down by the mountain's guardian spirit. In another it stole the guardian's sacred jade and the arrow found it anyway. Its body sank into the sea; its head froze mid-roar, still straining upward, and there it remains. A third telling makes it a white horse that dreamed of becoming a dragon and was caught in the act of ascending.",
    },
    tradition:
      "Haenyeo still work in cooperatives, ranked hagun, junggun and sanggun by skill, with the sanggun setting the day's boundaries and calling everyone back in. They dive on breath alone, no tank, resting between descents on a tewak float. Before the season they hold shamanic rites asking Yongwang, the Dragon King, and the wind grandmother Yeongdeung for calm water and a full net.",
    didYouKnow:
      "UNESCO inscribed the culture of the Jeju haenyeo in 2016. Some are in their eighties, working up to seven hours a day, one held breath at a time.",
    glossary: [
      { term: "haenyeo", script: "해녀 (海女)", meaning: "\"sea women\" — Jeju's breath-hold divers, many of them grandmothers" },
      { term: "sumbisori", script: "숨비소리", meaning: "the whistling exhalation a diver makes the instant she surfaces" },
      { term: "jinmosal", script: "진모살", meaning: "Jeju's word for the beach's four-coloured volcanic sand" },
      { term: "Yongduam", script: "용두암 (龍頭岩)", meaning: "Dragon Head Rock, on Jeju's north coast at Jeju City" },
    ],
    dragonConnection:
      "Jeju's sea belongs to Yongwang, the Dragon King; divers petition him before the season. On the north coast his fallen messenger is still visible — Yongduam, a dragon's head turned to stone.",
    accent: "#2E5F6E",
    accentText: "#4997AF",
    image: jungmunBeach,
    imageAlt: "The volcanic multi-coloured sand and basalt cliffs of Jungmun Saekdal beach.",
  },
  {
    id: "cheonjeyeon-waterfall",
    name: "Cheonjeyeon Waterfall",
    japaneseName: "천제연폭포 (天帝淵瀑布)",
    romaji: "Cheonjeyeon Pokpo",
    day: "Day 7 · Sunday, 25 July 2027",
    tagline: "Three falls, a pond twenty-one metres deep, and seven nymphs who come down at midnight.",
    story:
      "The path drops into a gorge so green the light turns underwater. Warm-temperate forest closes over you — ferns wedged into rock seams, vines, birds you cannot name — and the air loses ten degrees in a hundred steps. The first fall comes off a cliff twenty-two metres up into a pond that goes down twenty-one more, jade at the rim and black in the middle, cold enough to ache your fingers. Downstream a second fall throws thirty metres of white water into the ravine, and a third runs out to the sea. Over the gorge arches Seonimgyo, and along its flank, carved in stone, seven women fly in trailing ribbons with instruments in their hands. You climb to the bridge at dusk. The gorge exhales. Standing there, it is very easy to believe the story.",
    myth: {
      title: "The Seven Nymphs and the Pond of the Emperor of Heaven",
      text:
        "Cheonjeyeon means the Pond of the Emperor of Heaven, and the legend claims that is exactly what it is. When the world is asleep and no human eye is on the water, seven seonnyeo — heavenly maidens in the service of the Emperor of Heaven — descend a bridge of cloud into the gorge. They bathe in the pool beneath the upper fall, play among the rocks, and climb back into the sky before dawn. A separate island belief holds that anyone who stands under the falling water on the fifteenth day of the seventh lunar month will be healed of illness by the eighth. Swimming is forbidden now. The seven are carved on the bridge instead.",
    },
    tradition:
      "The nymphs are still honoured here: the Jungmun Chilseonyeo Festival, run by the village association, is staged each autumn in Cheonjeyeon Park beside the falls — recent editions have fallen in late September or early October — with a rite to the seven maidens, a re-enactment of their descent, and dancers in flowing seonnyeo robes. On ordinary days the etiquette is quieter. The gorge is a protected natural monument, so you keep to the boardwalk, take nothing away, and leave the pool alone.",
    didYouKnow:
      "The gorge became Natural Monument No. 378 in 1993. Its rock crevices shelter skeleton fork fern, a plant whose lineage predates flowers entirely.",
    glossary: [
      { term: "seonnyeo", script: "선녀 (仙女)", meaning: "heavenly maiden or nymph, a stock figure of Korean myth" },
      { term: "Cheonjeyeon", script: "천제연 (天帝淵)", meaning: "\"Pond of the Emperor of Heaven\" — the deep pool below the first fall" },
      { term: "Seonimgyo", script: "선임교 (仙臨橋)", meaning: "the arched bridge over the gorge, carved with all seven nymphs" },
      { term: "Yongwang", script: "용왕 (龍王)", meaning: "the Dragon King, who rules the sea and delivers the rain" },
    ],
    dragonConnection:
      "In Korean folk cosmology the Emperor of Heaven commands the dragon kings of the four seas, who carry the rain. This pond bears his name — and its water falls three times down to the Dragon King's door.",
    accent: "#2F7A63",
    accentText: "#3C9B7E",
    image: cheonjeyeonWaterfall,
    imageAlt: "Cheonjeyeon waterfall dropping into its turquoise pool through dense green forest.",
  },
  {
    id: "sofukuji-ryugumon",
    name: "Sofuku-ji and the Dragon Palace Gate",
    japaneseName: "崇福寺・龍宮門",
    romaji: "Sōfuku-ji Ryūgūmon",
    day: "Day 8 · Monday, 26 July 2027",
    tagline: "A red gate built to look like the door of the Dragon King's palace under the sea.",
    story:
      "You climb a narrow street above Nagasaki's old Chinese quarter and it surfaces in front of you: a two-storey gate lacquered a red that has no business in a Japanese temple, roof corners flung upward, its whole face saying somewhere else. This is the Ryugumon, the Dragon Palace Gate, built to resemble the entrance of Ryugu-jo, the Dragon King's hall on the seabed. What stands here dates from 1849, after fire and typhoon took the earlier gates; it is an Important Cultural Property. Climb the steep stair behind it to the Daiippomon — a gate has stood here since 1644, but the one in front of you was cut and fitted in China in the 1690s, carried over in pieces by junk and raised in 1696, its underside a honeycomb of brackets in vermilion and gold. Past that stands the Daiyuhoden of 1646. Those two are the National Treasures. Off to one side Mazu keeps her own hall: the Chinese sea goddess who looked after the crews who paid for all this.",
    myth: {
      title: "The Palace Under the Sea",
      text:
        "Ryugu-jo is the palace of the Dragon King on the ocean floor, built of coral and crystal, where each of the four sides looks out on a different season. The fisherman Urashima Taro rescues a turtle and is carried down there; he stays what feels like three days, feasting with the Dragon King's daughter, and comes home to find three hundred years gone and every face he knew long dead. The merchants of Fuzhou who founded this temple in 1629 knew a related sovereign, Longwang, the Chinese dragon king of the waters they crossed for a living. So they built his gate at the foot of their temple. You walk in through the ocean floor to reach the Buddha.",
    },
    tradition:
      "Buy a coil or a bundle of incense at the hall, light it from the flame, then wave it out rather than blowing — your breath is considered impure. Plant the sticks upright in the ash, press your palms together, bow once. At Obaku temples like this one, the sutras are still chanted using Ming-era Chinese pronunciation rather than Japanese readings.",
    didYouKnow:
      "In the famine of 1681–82 the priest Sengai had a cauldron cast here large enough to cook gruel for thousands a day. It still sits on the grounds.",
    glossary: [
      { term: "Ryūgūmon", script: "龍宮門", meaning: "Dragon Palace Gate — the temple's red two-storey entrance" },
      { term: "Ryūgū-jō", script: "龍宮城", meaning: "the undersea palace of the Dragon King, seat of Ryūjin" },
      { term: "Ōbaku", script: "黄檗", meaning: "the Chinese-founded third school of Japanese Zen, based at Manpuku-ji" },
      { term: "Chōnen", script: "超然", meaning: "the Fuzhou monk invited to found the temple in 1629 (Ch. Chaoran)" },
    ],
    dragonConnection:
      "The whole temple is entered through the Dragon King's front door. And Nagasaki still dances its Chinese dragon — the ja-odori, chasing a jewel through the streets each October at Kunchi.",
    accent: "#C8442E",
    accentText: "#D86D5B",
    image: sofukujiRyugumon,
    imageAlt: "The Ryugu-mon, the red-and-white Chinese-style Dragon Palace Gate at Sofuku-ji.",
  },
  {
    id: "glover-garden",
    name: "Glover Garden & Dejima",
    japaneseName: "グラバー園・出島",
    romaji: "Gurabā-en, Dejima",
    day: "Day 8 · Monday, 26 July 2027",
    tagline: "Japan's oldest Western house, on a hill above the harbour that built your ship.",
    story:
      "Moving walkways carry you up the Minamiyamate slope through hydrangea and palm, and Nagasaki keeps opening below you: cranes, the long grey spine of the Mitsubishi shipyard, the Megami bridge across the harbour mouth, and your own ship somewhere down there. Glover House sits at the top with its verandah wrapped the whole way round, roof low over the windows, floorboards cut in 1863 that have not moved since — the oldest surviving Western-style wooden building in Japan. You wander through Ringer's house, then Alt's; the rooms smell of wax and old timber. Outside, two bronzes face each other on the terrace: Puccini, and the soprano Tamaki Miura in her Cio-Cio-San costume. Below is the harbour Butterfly watches all night, listening for a gun. Later, at sea level, sixteen rebuilt houses stand on Dejima — the fan-shaped island where the Dutch were penned for two centuries and through which Western science leaked into Japan.",
    myth: {
      title: "Butterfly, Watching the Harbour",
      text:
        "Puccini's Madama Butterfly opened in 1904 and put this hillside in front of the world: Cio-Cio-San, a girl of fifteen married to an American naval officer in a house above Nagasaki harbour, abandoned, waiting three years, keeping vigil at the window through an entire night, and taking her own life when he returns with an American wife. Nagasaki adopted the story wholesale. Thomas Glover married a Japanese woman, Awajiya Tsuru, and lived on a hill with a harbour view, so his home became \"the Madame Butterfly House\" — though there is no evidence his life was Puccini's source. The garden keeps statues of the composer and of Tamaki Miura, who sang Cio-Cio-San around the world.",
    },
    tradition:
      "A young Nagasaki custom, cheerfully unhistorical: two heart-shaped paving stones are set into the garden's walkways, and couples hunt them down, stand on both, and are said to be lucky in love afterwards. Nobody pretends it is ancient. Everybody does it anyway — you will see people photographing their own feet on a hillside full of Meiji history.",
    didYouKnow:
      "Glover smuggled the Choshu Five out of Japan in 1863, opened the Takashima coal mine, and helped found the brewery that became Kirin.",
    glossary: [
      { term: "Dejima", script: "出島", meaning: "the fan-shaped artificial island that was Japan's only window on the West" },
      { term: "rangaku", script: "蘭学", meaning: "\"Dutch learning\" — Western science studied through the Dejima traders" },
      { term: "Chōchō-san", script: "蝶々さん", meaning: "\"Butterfly\" — Cio-Cio-San, heroine of Puccini's Nagasaki opera" },
      { term: "ja-odori", script: "龍踊", meaning: "Nagasaki's Chinese-derived dragon dance, performed at Kunchi" },
    ],
    dragonConnection:
      "Nagasaki's dragon came ashore off Chinese ships into this harbour. Every October the ja-odori dragons chase their jewel through the streets below this hill, and the Dragon Palace Gate is a tram ride away.",
    accent: "#2F6690",
    accentText: "#5093C6",
    image: gloverGarden,
    imageAlt: "The view over Nagasaki harbour from the terraces of Glover Garden.",
  },
  {
    id: "izumi-bath",
    name: "The Izumi Japanese Bath",
    japaneseName: "泉",
    romaji: "Izumi",
    day: "Day 9 · Tuesday, 27 July 2027",
    tagline: "The largest Japanese bath afloat: cypress, stone, steam and open ocean.",
    story:
      "You leave your shoes and everything else in a locker on Deck 15, step through the noren, and the ship's noise simply stops. First the low stool and the hand shower: you sit, you soap, you rinse every trace away — twice if you are unsure — because nothing enters the water but clean skin. Then the cypress tub. The heat takes your breath for a second, somewhere around forty-one degrees, and the hinoki gives off that sharp lemon-cedar scent that only happens when the wood is wet and hot. Your small towel goes on your head, never in the bath. Through the glass there is nothing at all: no coastline, no lights, no other vessel, just the North Pacific going grey to the horizon while eight hundred square metres of stone and pale timber breathe steam at it.",
    myth: {
      title: "Ryujin and the Two Tide Jewels",
      text:
        "Japan's sea dragon is Ryujin, who lives in Ryugu-jo beneath the waves and keeps the tides in two jewels: the kanju, which draws the water away, and the manju, which calls it back. In the old chronicles the hunter Hoori loses his brother's fishhook, descends to the Dragon King's palace to find it, marries Ryujin's daughter Toyotama-hime, and returns with both jewels — which he uses to strand and then drown his brother into submission. Toyotama-hime follows him ashore to give birth and begs him not to watch. He watches. She is a great sea creature. Shamed, she goes back to the ocean forever. Her grandson, the chronicles say, becomes Japan's first emperor.",
    },
    tradition:
      "The rules are absolute and easy. Wash completely at the seated shower before you get in; the tub is for soaking, never for cleaning. No swimsuit in the traditional bath. Long hair goes up. The small tenugui towel rides on your head or the rim, never in the water. Do not swim, splash or hold court. Rinse the stool for whoever is next.",
    didYouKnow:
      "Izumi means \"spring\" or \"source\". Japan's Hot Spring Law only counts water that issues from the ground — at 25°C or more, or carrying enough of one of nineteen listed minerals — so a tub of heated ordinary water like this one is, strictly speaking, a sento.",
    glossary: [
      { term: "onsen", script: "温泉", meaning: "hot spring — legally, water rising from the ground at 25°C+, or cold but mineral-rich" },
      { term: "sentō", script: "銭湯", meaning: "public bath of ordinary heated water; the neighbourhood kind" },
      { term: "hinoki", script: "檜", meaning: "Japanese cypress — the fragrant, rot-resistant timber of the finest tubs" },
      { term: "kakeyu", script: "かけ湯", meaning: "the rinse you pour over yourself before entering the water" },
    ],
    dragonConnection:
      "You are soaking in hot water directly above the Dragon King's roof. Ryujin's palace is the seabed, and the Pacific outside the cypress tub runs four kilometres deep in places.",
    accent: "#5C7F6E",
    accentText: "#6B9480",
    image: izumiBath,
    imageAlt: "The Izumi Japanese bath aboard the Diamond Princess, its cypress tubs facing the ocean.",
  },
  {
    id: "cocomo-makeover",
    name: "Geisha & Samurai: Studio cocomo",
    japaneseName: "変身写真スタジオ cocomo 浅草",
    romaji: "Henshin Shashin Sutajio cocomo, Asakusa",
    day: "Day 10 · Wednesday, 28 July 2027",
    tagline: "Two hours to become a geisha and a samurai — real oshiroi, real armour, real weight.",
    story:
      "The transformation happens in pieces and you feel every one. For her: hair scraped back and bound flat, then wax, then a brush loaded with oshiroi laying cold white over face, throat and the long V left bare at the nape — the one deliberate gap, the oldest flirtation in Japan. Eyebrows redrawn. Lower lip painted a small crushed red. Then the katsura goes on, a lacquered wig heavy enough that you change how you hold your neck, pinned with kanzashi. Then silk on silk until the hikizuri trails behind you across the studio floor and the brocade obi is pulled tight enough to make your posture someone else's. For him: laced scales, the do strapped down, sode at the shoulders, kabuto last with its crest rising off the brow. You look at each other. Neither of you is entirely in the room.",
    myth: {
      title: "Why the Face is White",
      text:
        "Tradition holds that in 692 a monk named Kanjo presented the Empress Jito with white face powder he had learned to make, and was rewarded for it — the first oshiroi in Japan. For a thousand years afterwards the powder was lead-based and quietly poisoned the women who wore it; safe formulas arrived only in the twentieth century. The white was never merely fashion. Geisha worked in rooms lit by candle and oil lamp, where a white face and a small red mouth read clearly across the dark while ordinary skin dissolved into it. The nape is left unpainted in two prongs — three for the most formal nights — a deliberate window of real skin at the back of the neck.",
    },
    tradition:
      "Geisha are artists, not a costume: years of training in dance, shamisen, song and conversation, and a strict ladder from maiko apprentice upward. A studio makeover is homage, not impersonation, so wear it properly. Small steps with the toes turned slightly in, chin down, hands folded low. Outdoors you lift the trailing hem in your left hand.",
    didYouKnow:
      "A full suit of Japanese armour weighs roughly 20–30kg, the helmet alone about three — which is why your first move wearing it is to find your balance.",
    glossary: [
      { term: "oshiroi", script: "白粉", meaning: "the white face powder that is the base of the entire transformation" },
      { term: "katsura", script: "鬘", meaning: "the lacquered, pinned wig worn by geisha (maiko style their own hair)" },
      { term: "hikizuri", script: "引きずり", meaning: "trailing kimono with a padded hem, dragged behind on the floor indoors" },
      { term: "yoroi", script: "鎧", meaning: "samurai armour of small scales laced with silk; kabuto 兜 is the helmet" },
    ],
    dragonConnection:
      "Dragons ride on both costumes: coiled through the gold brocade of an obi, and reared up as a maedate crest on the helmet — a warrior claiming the beast that commands water and storm.",
    accent: "#B03A4A",
    accentText: "#CF6D7A",
    image: cocomoMakeover,
    imageAlt: "A studio portrait from a geisha and samurai makeover session in Asakusa.",
  },
  {
    id: "asakusa-view-hotel",
    name: "Asakusa View Hotel",
    japaneseName: "浅草ビューホテル",
    romaji: "Asakusa Byū Hoteru",
    day: "Day 10 · Wednesday, 28 July 2027",
    tagline: "A high window with Senso-ji floodlit below and the Skytree burning above it.",
    story:
      "The lift doors open high on the Skytree side and the room has a small bay by the window with two chairs in it, which tells you exactly what this room is for. You sit. Directly below, Senso-ji is lit from underneath: the five-storey pagoda a stack of red and gold, the great sloping roof of the Main Hall, the Nakamise stalls shuttered down into a long line of painted panels. Behind it the Sumida turns black and silver. And past the river the Tokyo Skytree stands 634 metres up, changing colour to its own schedule — river blue tonight, or Edo purple, or orange. Old temple, new tower, one pane of glass. You kill the room lights so the reflections die, and stay at that window far longer than you meant to.",
    myth: {
      title: "The Boy on the Sumida",
      text:
        "In the Noh play Sumidagawa, a woman comes east from the capital out of her mind with grief, searching for her stolen son. A ferryman rows her across the Sumida and tells her, not knowing who she is, about a child slave traders abandoned sick on this bank a year before: the boy died at twelve, asked to be buried where the road passed, and asked travellers from the capital to say a prayer for him. It was her son. The villagers are keeping his anniversary that very night. She hears his voice inside their chanting, sees him at the burial mound, reaches for him — and at daybreak is holding nothing but grass. A temple upriver from your window still keeps his memory.",
    },
    tradition:
      "Japanese hotels leave a yukata and a folded cord on the bed and expect you to use them: a light cotton robe, left panel crossed over right, always — right over left is how the dead are dressed. There is green tea and a small kettle by the window. Brew it, put the yukata on, and watch the temple.",
    didYouKnow:
      "The Skytree's 634 metres is a pun. Read as numerals, 6-3-4 is mu-sa-shi — Musashi, the ancient province Tokyo was built on.",
    glossary: [
      { term: "Kinryū-zan", script: "金龍山", meaning: "\"Golden Dragon Mountain\" — Senso-ji's mountain name, lit up below you" },
      { term: "Sumidagawa", script: "隅田川", meaning: "the river beneath the window; the temple's founding river" },
      { term: "yukata", script: "浴衣", meaning: "unlined cotton robe supplied in the room and worn around the hotel" },
      { term: "Musashi", script: "武蔵", meaning: "the old province whose name gives the Skytree its exact height" },
    ],
    dragonConnection:
      "You are looking straight down onto Kinryu-zan, Golden Dragon Mountain. From this height you can trace the entire route the golden dragon dances on its two days of the year.",
    accent: "#23386B",
    accentText: "#6C89CF",
    image: asakusaViewHotel,
    imageAlt: "The Tokyo Skytree lit up at night above the rooftops of Asakusa.",
  },
  {
    id: "kaminarimon-gate",
    name: "Kaminarimon, the Thunder Gate",
    japaneseName: "雷門（風雷神門）",
    romaji: "Kaminarimon (Fūraijinmon)",
    day: "Day 11 · Thursday, 29 July 2027",
    tagline: "A 700-kilo red lantern, two furious weather gods, and a dragon hidden underneath.",
    story:
      "You reach the gate through a crowd and it still lands like a blow. The lantern hangs nearly four metres tall and weighs seven hundred kilograms — bamboo ribs from Kyoto, some three hundred sheets of mulberry paper, the characters for KAMINARIMON inked taller than your arm. On your left, Raijin: red, wild-haired, ringed with drums, mouth open. On your right, Fujin: green, hauling a great bag of wind across his shoulders. They have guarded this entrance in one form or another since the tenth century and have burned down with it more than once. Then do the thing almost nobody does. Step under the lantern, stop dead, and look straight up into its base — there, carved in dark wood on the underside, a dragon coils. Beyond it the Nakamise runs 250 metres of light to the next gate.",
    myth: {
      title: "The Wind God and the Thunder God",
      text:
        "Raijin carries a ring of drums slung around him, and the drums are thunder. Where his lightning strikes, the old farming belief runs, the rice comes up rich — which is why a god this terrifying is also a god you want nearby. Fujin carries the winds in an enormous bag over his shoulders and lets them out: the typhoons, and also the divine wind that scattered two Mongol invasion fleets. Both travelled to Japan from India by way of China, and Tawaraya Sotatsu's seventeenth-century screen of the pair fixed their image for good. At Kaminarimon they are set as gatekeepers, and that is precisely the point: the worst weather on earth stands in the doorway, facing outward.",
    },
    tradition:
      "Temple etiquette begins right here. You bow once, lightly, before passing under the gate, and you keep out of the exact centre of the path, which is left clear for the deity. Then the Nakamise, a shopping street that has fed pilgrims since the 1600s, where the correct thing to do is eat the ningyo-yaki hot and standing up.",
    didYouKnow:
      "The gate burned in 1865 and the site stood empty for 95 years. Panasonic's founder rebuilt it in 1960 in thanks for a healing, and still funds the lantern.",
    glossary: [
      { term: "Kaminarimon", script: "雷門", meaning: "Thunder Gate; formally Fūraijinmon, Gate of the Wind and Thunder Gods" },
      { term: "chōchin", script: "提灯", meaning: "collapsible paper lantern built on a spiralling bamboo frame" },
      { term: "Raijin", script: "雷神", meaning: "the thunder god, encircled by the ring of drums he beats" },
      { term: "Fūjin", script: "風神", meaning: "the wind god, carrying every wind in a bag across his shoulders" },
    ],
    dragonConnection:
      "A dragon is carved into the underside of the great lantern, carried over from the lantern before it. And the plaque above reads Kinryu-zan: you are entering Golden Dragon Mountain.",
    accent: "#C8352B",
    accentText: "#DA6861",
    image: kaminarimonGate,
    imageAlt: "The giant red lantern hanging beneath the Thunder Gate at Asakusa.",
  },
  {
    id: "sensoji-dragon-fountain",
    name: "Senso-ji's Dragon Fountain",
    japaneseName: "浅草寺・お水舎",
    romaji: "Sensō-ji Omizuya",
    day: "Day 11 · Thursday, 29 July 2027",
    tagline: "Purify your hands under a bronze dragon king, with an ink dragon overhead.",
    story:
      "Past the Hozomon, on the right, a small open pavilion with water running in it. Most people rinse and move on. Do not. Standing over the octagonal granite basin is a bronze dragon king, cast in 1903, reared up and coiled with a kind of sword-straight fury that a hundred and twenty years of Tokyo weather have turned green-black. This is Sakara Ryuo, one of the eight dragon kings who guard the Lotus Sutra, modelled by Takamura Koun — the sculptor behind the Saigo statue in Ueno. It was originally set in a fountain pond behind the Main Hall. Now look up. The pavilion ceiling carries a dragon painted in ink alone, black on pale wood, uncoiling directly over your head. You stand between two dragons and pour cold water over your hands. Nothing about a temple's water is accidental.",
    myth: {
      title: "The Dragon King's Daughter",
      text:
        "Sagara is the dragon king of the ocean, one of the eight naga kings who protect the Lotus Sutra. In the sutra's twelfth chapter his eight-year-old daughter appears before the assembly, and Shariputra objects: she is a child, she is not human, she is female, and a body like that cannot become a buddha. She does not argue. She offers the Buddha a jewel worth an entire world, he accepts it, and in the moment that takes she travels south, transforms, and attains perfect enlightenment in full view of everyone present. It is among the most-quoted passages in East Asian Buddhism. Her father's statue is the one standing on the basin, watching you wash your hands.",
    },
    tradition:
      "Temizu, in one continuous motion: take the ladle in your right hand, pour over the left, swap and pour over the right, cup the left palm and take water to your mouth, rinse, and spit beside the basin — never into it, never straight from the ladle. Then tip the handle upright so the last water cleans it for the next person. Where ladles have been removed, simply cup your hands.",
    didYouKnow:
      "Guides sometimes call this the \"divine dragon\" fountain; the figure's proper name is Sakara Ryuo, and the ink dragon on the ceiling is by Azuma Shoko.",
    glossary: [
      { term: "temizuya", script: "手水舎", meaning: "the roofed basin for rinsing hands and mouth before worship" },
      { term: "hishaku", script: "柄杓", meaning: "the long-handled ladle used for the purification" },
      { term: "Sakara Ryūō", script: "沙竭羅龍王", meaning: "Sāgara, dragon king of the ocean, cast in bronze above the basin" },
      { term: "hachidai ryūō", script: "八大龍王", meaning: "the Eight Great Dragon Kings, protectors of the Lotus Sutra" },
    ],
    dragonConnection:
      "Two dragons at once: Sakara Ryuo in bronze on the basin, an ink dragon painted on the ceiling above him. Here the temple's water is guarded by the beings who own all water.",
    accent: "#4E7566",
    accentText: "#649783",
    image: sensojiDragonFountain,
    imageAlt: "The bronze dragon of the Senso-ji purification fountain pouring water from its mouth.",
  },
  {
    id: "sensoji-dragon-ceiling",
    name: "Senso-ji Main Hall & the Golden Dragon",
    japaneseName: "浅草寺・観音堂",
    romaji: "Sensō-ji Kannon-dō",
    day: "Day 11 · Thursday, 29 July 2027",
    tagline: "The hall the golden dragon came down for, with a dragon painted across its ceiling.",
    story:
      "Up the steps into the Main Hall, and the crowd noise turns into something bigger and softer under the roof — coins landing on wood, the rope-bell, low chanting, incense soaked into every surface. Ahead, the inner sanctum glows gold around a shrine you cannot see into and never will: the Kannon pulled from the river in 628 is hibutsu, hidden, shown to nobody, not even the priests. Now tip your head back. The ceiling carries three enormous panels, each roughly six metres by five — two crowds of heavenly beings by Domoto Insho, and between them Kawabata Ryushi's dragon, painted on washi in 1958 when the hall rose again out of the firebombing. One thing to know: the dragon peeled off that ceiling on 8 July 2023 and was taken away for a restoration the temple said would run several years. Within weeks Senso-ji hung a full-size, high-resolution reproduction in the same frame, so there is a dragon overhead either way — and unless the original is home by the time you visit, the one you photograph is the copy.",
    myth: {
      title: "The Golden Dragon and the Thousand Pines",
      text:
        "On the eighteenth day of the third month, 628, two fishermen brothers — Hinokuma no Hamanari and Hinokuma no Takenari — hauled their net from the Sumida and found a tiny golden figure caught in it. In many tellings they cast it back and it returned to the net. They carried it to Haji no Nakatomo, the local headman, who recognised Sho Kannon, bodhisattva of compassion, shaved his head and turned his own house into a temple. A thousand pines rose overnight across the marsh, and three days later, the temple's own telling goes, a dragon with golden scales came down out of the sky into that pine grove. The temple has been Kinryu-zan — Golden Dragon Mountain — ever since. All three men are enshrined next door at Asakusa Shrine.",
    },
    tradition:
      "Senso-ji still draws its fortunes from the old Kannon hundred-slip set and, unlike most temples, has never softened the odds: about thirty per cent come out kyo, bad luck. That is deliberate. Shake the metal canister, take the numbered stick, open the matching drawer — and if the news is bad, fold it and tie it to the rack, leaving the luck behind you.",
    didYouKnow:
      "The Kinryu-no-mai golden dragon is 18 metres long, weighs 88kg, carries 8,888 scales, and dances only on 18 March and 18 October.",
    glossary: [
      { term: "Kinryū-zan", script: "金龍山", meaning: "\"Golden Dragon Mountain\" — the temple's mountain name, from the legend" },
      { term: "hibutsu", script: "秘仏", meaning: "\"hidden buddha\" — an image kept permanently out of sight" },
      { term: "Kinryū-no-mai", script: "金龍の舞", meaning: "the Golden Dragon Dance, created in 1958 for the hall's rebuilding" },
      { term: "omikuji", script: "おみくじ", meaning: "paper fortune drawn by numbered lot at a shrine or temple" },
    ],
    dragonConnection:
      "This is the dragon's own hall: a golden dragon named the mountain in 628, Kawabata Ryushi painted one across the 1958 ceiling, and eight dancers still bring an 18-metre one down the approach.",
    accent: "#C9A227",
    accentText: "#C29F2E",
    image: sensojiDragonCeiling,
    imageAlt: "The golden dragon painted across the ceiling of the Senso-ji main hall.",
  },
];
