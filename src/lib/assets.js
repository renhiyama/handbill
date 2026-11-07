const BASE = import.meta.env.BASE_URL

export const cardSrc = (name, w) => `${BASE}images/cards/${name}-${w}.jpg`
export const heroSrc = (w) => `${BASE}images/hero/crowd-${w}.jpg`

/** Intrinsic sizes of the stored files, so every <img> can carry width and height. */
export const CARD_DIMENSIONS = {
  'night-shift': [1280, 1023],
  'long-table': [1280, 855],
  'paper-and-pigment': [1280, 853],
  'ten-minute-city': [1280, 1017],
  'turf-war': [1280, 853],
  'second-hand-sunday': [1280, 961],
  'quiet-set': [1280, 853],
  'frame-by-frame': [1280, 923],
}

export const CREDITS = [
  {
    label: 'PinkBeachPlanet',
    href: 'https://commons.wikimedia.org/wiki/File:Beach-Please-2022-crowd-stage-lights-night-performance.jpg',
    licence: 'CC BY-SA 4.0',
  },
  {
    label: 'Ian T. McFarland',
    href: 'https://commons.wikimedia.org/wiki/File:Lights_(2011-04-24_by_Ian_T._McFarland).jpg',
    licence: 'CC BY-SA 2.0',
  },
  {
    label: 'Shixart1985',
    href: "https://commons.wikimedia.org/wiki/File:Baker_woman%27s_hands_kneading_bread_dough.jpg",
    licence: 'CC BY 2.0',
  },
  {
    label: 'Ahmad Ali Karim',
    href: 'https://commons.wikimedia.org/wiki/File:Screen_printing_demonstration_at_TEDxUTM.jpg',
    licence: 'CC0',
  },
  {
    label: 'Pietro Tessarin',
    href: 'https://commons.wikimedia.org/wiki/File:La_Fenice_Opera_House_from_the_stage.jpg',
    licence: 'CC BY-SA 4.0',
  },
  {
    label: 'bluesbby',
    href: 'https://commons.wikimedia.org/wiki/File:Just_a_soccer_ball_(34782492153).jpg',
    licence: 'CC BY 2.0',
  },
  {
    label: 'Touam (Hervé Agnoux)',
    href: 'https://commons.wikimedia.org/wiki/File:Matin_ensoleill%C3%A9_au_march%C3%A9_de_la_Terrasse.jpg',
    licence: 'CC BY-SA 4.0',
  },
  {
    label: 'Wilfredor',
    href: 'https://commons.wikimedia.org/wiki/File:Man_playing_an_acoustic_brazilian_guitar_(Viol%C3%A3o)_on_Marco_Zero_Square,_Refice,_Pernambuco,_Brazil.jpg',
    licence: 'CC0',
  },
  {
    label: 'DarkRavenCore',
    href: 'https://commons.wikimedia.org/wiki/File:Farjad_jolani_Cinematographer.jpg',
    licence: 'CC BY-SA 4.0',
  },
]
