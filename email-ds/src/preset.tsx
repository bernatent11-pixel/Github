import * as React from 'react';

/**
 * STYLE PRESETS — three house modes for the same section kit.
 *
 * Bernat named three brands he likes the look of. The benchmark measured all
 * three, and what separates them is not layout — it is **density, type size,
 * air and image treatment**. Those four dials, turned to different settings,
 * are why their emails feel like different publications while using the same
 * handful of shapes underneath.
 *
 * So rather than three sets of sections, there is one set of sections and three
 * presets. Switching the preset on an email re-proportions every section in it
 * at once, which is what makes two Milonga campaigns look genuinely different
 * without anyone redesigning a block.
 *
 * Each preset's numbers are derived from the measured DNA of the brand it is
 * calibrated to — the figures in the comments are from the 90-email benchmark.
 * They are NOT copies of anyone's layouts: no competitor campaign HTML was
 * available, so nothing here reproduces a specific email. What is borrowed is
 * proportion, which is not ownable and is the part that actually carries the
 * feeling.
 */
export interface StylePreset {
  name: 'dense' | 'systematic' | 'editorial';
  /** Hero headline. */
  headline: number;
  /** Section-level headline. */
  sectionTitle: number;
  /** Row / card title. */
  rowTitle: number;
  /** Body copy. Never below 16. */
  body: number;
  eyebrow: number;
  /** Line-height for body copy. */
  bodyLead: number;
  /** Vertical rhythm between sections. */
  pad: number;
  /** Gap inside a section — between rows, cards, columns. */
  gap: number;
  /** Default image treatment. */
  frame: 'bleed' | 'inset';
  /** Default alignment for headline stacks. */
  align: 'left' | 'center';
  /** Measure for centred body copy. */
  copyWidth: number;
  /** How hard the section leans on photography. Guidance, not enforced. */
  imagery: string;
}

export const PRESETS: Record<StylePreset['name'], StylePreset> = {
  /**
   * DENSE — calibrated to the MUD\WTR read.
   *
   * The most image-led of the three: 15.3 images per email, 10.3 of them
   * full-bleed, on a warm neutral surface (#ede9e7 dominant, 349 occurrences)
   * with very little type between them. Pictures do the talking and land back
   * to back; the copy is captions, not paragraphs.
   *
   * Tight padding is the whole trick. Generous air between full-bleed images
   * turns a sequence into a slideshow with gaps in it.
   *
   * Note: they run 13px body and 87% alt coverage. We keep the alt rigour and
   * refuse the 13px — see the 16px floor.
   */
  dense: {
    name: 'dense',
    headline: 34,
    sectionTitle: 24,
    rowTitle: 20,
    body: 16,
    eyebrow: 11,
    bodyLead: 1.45,
    pad: 24,
    gap: 12,
    frame: 'bleed',
    align: 'center',
    copyWidth: 420,
    imagery: 'Many images, most full-bleed, edge to edge and close together. Copy is short.',
  },

  /**
   * SYSTEMATIC — calibrated to the Athletic Brewing read.
   *
   * The most disciplined of the three and the closest to how Milonga already
   * works: one dominant colour carrying the whole email (navy at 417
   * occurrences against 326 for white), two accents, one warm neutral, a strict
   * spacing grid, and buttons at a heavy weight every single time.
   *
   * 13.1 images, 5.7 full-bleed — roughly half its pictures are inset figures
   * rather than scenes, which is what gives it structure rather than flow.
   *
   * The middle setting, and the safe default for a campaign that has to do a
   * job rather than make an impression.
   */
  systematic: {
    name: 'systematic',
    headline: 38,
    sectionTitle: 26,
    rowTitle: 22,
    body: 16,
    eyebrow: 11.5,
    bodyLead: 1.5,
    pad: 32,
    gap: 16,
    frame: 'inset',
    align: 'center',
    copyWidth: 460,
    imagery: 'About half the images inset as figures, half full-bleed. Everything on the grid.',
  },

  /**
   * EDITORIAL — calibrated to the Nowadays read, and the one worth reaching for
   * when an email has something to say.
   *
   * The outlier in the whole benchmark and the only brand of the six whose
   * emails survive images being turned off. Near-monochrome light ground
   * (#ffffff 635, #f6f6f6 142), the fewest images of any brand (7.9, only 3.4
   * full-bleed), **20px body type**, the most words per email (1003 against a
   * 690–813 range), 21% image links against a 61–87% category, and real
   * live-text headlines in 13 of 15 emails.
   *
   * The lesson underneath the numbers: bigger type did not force them to say
   * less. Generous type and generous air read as confidence, not as filler.
   *
   * Left-aligned by default — a letter is not centred.
   */
  editorial: {
    name: 'editorial',
    headline: 40,
    sectionTitle: 28,
    rowTitle: 22,
    body: 20,
    eyebrow: 12,
    bodyLead: 1.6,
    pad: 48,
    gap: 24,
    frame: 'inset',
    align: 'left',
    copyWidth: 480,
    imagery: 'Few images, mostly inset. Whitespace is the material. Let the words run.',
  },
};

export const PresetContext = React.createContext<StylePreset>(PRESETS.systematic);

/** The preset in force. Sections read this instead of hard-coding proportions. */
export function usePreset(): StylePreset {
  return React.useContext(PresetContext);
}

/**
 * Wrap an email (or one act of it) in a style preset.
 *
 * Switching this is the fastest way to make a campaign look unlike the last
 * one. It changes nothing about the brand — colours still come from the
 * contrast map — only how loud, how dense and how airy the email is.
 */
export function PresetProvider({
  preset,
  children,
}: {
  preset: StylePreset['name'] | StylePreset;
  children?: React.ReactNode;
}) {
  const value = typeof preset === 'string' ? PRESETS[preset] : preset;
  return <PresetContext.Provider value={value}>{children}</PresetContext.Provider>;
}
