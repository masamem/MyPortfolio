export const person = {
  name: 'Mugahed',
  handle: '@muvfx',
};

export const nav = [
  {label: 'About', href: '#about'},
  {label: 'Work', href: '#work'},
  {label: 'Contact', href: '#contact'},
];

export const bio = [
  'I make ideas move.',
  'I’m Mugahed Al-Maari, a Riyadh-based multimedia designer with 6+ years across branding, motion graphics, video, social content and interactive experiences.',
  'Available for freelance projects, creative collaborations and multimedia opportunities:',
];

/** Core creative disciplines presented as a typographic capability strip. */
export const press = [
  {name: 'Brand Identity', font: 'font-serif italic'},
  {name: 'MOTION', font: 'font-wide tracking-[0.08em]'},
  {name: 'video editing', font: 'font-display font-black lowercase tracking-[-0.04em]'},
  {name: 'Creative Direction', font: 'font-serif'},
  {name: '3D / AI', font: 'font-mono tracking-[0.04em]'},
  {name: 'Social Content', font: 'font-display font-medium italic'},
];

/**
 * Every expression is registered to the same 2:3 bust framing, padded to a
 * square, so they swap in place. A file that fails to load falls back to the base face
 * (a missing grab face falls back to g_grimace).
 */
export const faces = {
  base: {src: '/faces/base.svg', mood: 'chill'},
  l_left: {src: '/faces/l_left.svg', mood: 'watching you'},
  l_right: {src: '/faces/l_right.svg', mood: 'watching you'},
  x_cross: {src: '/faces/x_cross.svg', mood: 'suspicious'},
  x_tongue: {src: '/faces/x_tongue.svg', mood: 'goofy'},
  x_shock: {src: '/faces/x_shock.svg', mood: 'startled'},
  x_laugh: {src: '/faces/x_laugh.svg', mood: 'cackling'},
  x_skeptic: {src: '/faces/x_skeptic.svg', mood: 'unconvinced'},
  x_whistle: {src: '/faces/x_whistle.svg', mood: 'innocent'},
  x_smug: {src: '/faces/x_smug.svg', mood: 'smug'},
  x_dizzy: {src: '/faces/x_dizzy.svg', mood: 'seeing stars'},
  g_grimace: {src: '/faces/g_grimace.svg', mood: 'being squeezed'},
  g_ouch: {src: '/faces/g_ouch.svg', mood: 'OW'},
  g_squish: {src: '/faces/g_squish.svg', mood: 'pinched'},
} as const;

export type FaceKey = keyof typeof faces;

/** Faces dealt at random when a stretch is let go. */
export const releaseFaces: FaceKey[] = ['x_tongue', 'x_laugh', 'x_skeptic', 'x_whistle', 'x_smug', 'x_cross'];

/**
 * Landmarks in image UV (0–1, v from the top) measured on the prepared faces
 * (2:3 busts padded to square, so the sweater spans u 0.167–0.833 and meets
 * the frame edge from v 0.845 down). The disc is drawn in the same space and
 * sized so its arc clips the shoulders before they reach those edges.
 */
export const rig = {
  disc: {x: 0.5, y: 0.58, r: 0.41},
  nose: {x: 0.505, y: 0.505, r: 0.04},
  cheeks: [
    {x: 0.385, y: 0.53},
    {x: 0.625, y: 0.53},
  ],
  face: {x: 0.5, y: 0.51, rx: 0.175, ry: 0.23},
  hairLine: 0.26,
  /** |u − 0.5| beyond which a grab above the jaw is the ears / side hair. */
  sides: 0.19,
};
