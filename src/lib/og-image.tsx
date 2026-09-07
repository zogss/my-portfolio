import { ImageResponse } from 'next/og';

/** Open Graph / Twitter card dimensions. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

/** Pulled from `--charcoal-black-700` / `--royal-purple-700` in variables.css. */
const CHARCOAL = '#121120';
const PURPLE = '#663bc3';

interface OgImageOptions {
  /** Small label above the title, e.g. the section or project subtitle. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Rendered as pills along the bottom, e.g. a project's tech stack. */
  tags?: string[];
}

/**
 * Shared Open Graph card.
 *
 * Deliberately uses no custom font file: Satori's built-in font covers the Latin
 * characters both locales need (including Portuguese diacritics), which keeps
 * these routes free of any build-time network fetch or bundled binary.
 */
export const renderOgImage = ({
  eyebrow,
  title,
  description,
  tags,
}: OgImageOptions) =>
  new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        position: 'relative',
        // The brand glow lives on the container rather than in absolutely
        // positioned children: Satori clips a child's gradient at the element
        // box, which left a visible horizontal seam across the card.
        backgroundColor: CHARCOAL,
        backgroundImage: [
          `radial-gradient(1100px 900px at 12% -18%, ${PURPLE}59, transparent 62%)`,
          `radial-gradient(900px 800px at 96% 118%, ${PURPLE}3d, transparent 60%)`,
        ].join(','),
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {eyebrow ? (
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#a78bfa',
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 34 ? 68 : 86,
            lineHeight: 1.05,
            fontWeight: 800,
            color: '#ffffff',
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              lineHeight: 1.4,
              color: '#cbd5e1',
              maxWidth: 940,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {tags?.length ? (
          <div style={{ display: 'flex', gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  padding: '10px 22px',
                  borderRadius: 9999,
                  border: '1px solid #ffffff26',
                  background: '#ffffff0f',
                  color: '#e2e8f0',
                  fontSize: 24,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        ) : null}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            Yan Lucas
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#94a3b8' }}>
            yanlucas.site
          </div>
        </div>
      </div>
    </div>,
    OG_SIZE,
  );

/** Trims to a whole word so cards never end mid-word. */
export const truncate = (text: string, max: number): string => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
};
