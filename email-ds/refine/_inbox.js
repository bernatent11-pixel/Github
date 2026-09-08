// Preview chrome: renders the email under a fake inbox row showing the sender,
// the subject line and the preview text.
//
// A design reviewed on its own always looks better than it performs, because
// the first thing anyone actually sees is a one-line subject in a crowded
// list. Reviewing the two together catches the common failure — a beautiful
// email whose subject and preheader say the same thing, or whose preheader is
// blank and gets filled with "View in browser".
//
// Usage from a harness:
//   mountEmail(MyEmail, { subject: '…', preheader: '…', label: 'Campaign · week 2' });
function mountEmail(Component, { subject, preheader, label, bg = '#004D27' } = {}) {
  const h = React.createElement;
  const font = "'Gotham','Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";

  const chrome = subject
    ? h('div', { style: { width: 600, margin: '0 auto 22px', fontFamily: font } },
        h('div', {
          style: {
            fontWeight: 700, fontSize: 10, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 10,
          },
        }, 'Inbox preview'),
        h('div', {
          style: {
            background: '#FFFFFF', borderRadius: 12, padding: '14px 18px',
            display: 'grid', gridTemplateColumns: '36px 1fr', columnGap: 13, rowGap: 3,
            alignItems: 'center',
          },
        },
          h('div', {
            style: {
              gridRow: '1 / span 2', width: 36, height: 36, borderRadius: '50%',
              background: bg, color: '#F0EFDF', display: 'grid', placeItems: 'center',
              fontWeight: 900, fontSize: 13,
            },
          }, 'M'),
          h('div', { style: { fontWeight: 700, fontSize: 13, color: '#12331F' } },
            'Milonga ', h('span', { style: { fontWeight: 400, color: '#808080' } }, '<connect@milonga.life>')),
          h('div', { style: { fontSize: 13, lineHeight: 1.4, color: '#12331F' } },
            h('span', { style: { fontWeight: 700 } }, subject),
            preheader ? h('span', { style: { color: '#808080' } }, ' — ' + preheader) : null),
        ))
    : null;

  const caption = label
    ? h('div', {
        style: {
          width: 600, margin: '18px auto 0', textAlign: 'center', fontFamily: font,
          fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
        },
      }, label)
    : null;

  ReactDOM.createRoot(document.getElementById('root')).render(
    h('div', { style: { padding: '28px 0 40px' } },
      chrome,
      h('div', { style: { width: 600, margin: '0 auto' } }, h(Component)),
      caption,
    ),
  );
}
