import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';

export interface ProseProps {
  /**
   * The paragraph. Wrap a phrase in `**double asterisks**` to lift it out of
   * the body — it is set bold in the accent colour, the way a person
   * underlines the part they actually mean.
   */
  text: string;
  bg?: EmailBg;
  /** Body size in px. Raise it on the paragraph that has to be read. */
  size?: number;
  align?: 'left' | 'center';
}

/** Splits `a **b** c` into plain and emphasised runs. */
export function splitEmphasis(text: string): Array<{ t: string; em: boolean }> {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('**') && part.endsWith('**')
        ? { t: part.slice(2, -2), em: true }
        : { t: part, em: false },
    );
}

/**
 * A paragraph of body copy where chosen phrases carry the weight. Use it for
 * letters and long-form sections — the emphasis is what the reader takes away
 * when they skim.
 */
export function Prose({ text, bg = 'forest', size = 14, align = 'left' }: ProseProps) {
  const t = onBg[bg];
  return (
    <p
      style={{
        fontFamily: fontStack,
        fontSize: size,
        lineHeight: 1.75,
        color: t.body,
        textAlign: align,
        margin: '0 0 16px',
      }}
    >
      {splitEmphasis(text).map((run, i) =>
        run.em ? (
          <strong key={i} style={{ fontWeight: 900, color: t.accent }}>
            {run.t}
          </strong>
        ) : (
          <React.Fragment key={i}>{run.t}</React.Fragment>
        ),
      )}
    </p>
  );
}
