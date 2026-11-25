import {useEffect, useRef, useState, type RefObject} from 'react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Sections marked with data-reveal rise and fade in once as they enter the viewport.
 * The page is only "armed" (content hidden until seen) after JS runs, so nothing is
 * ever invisible without it. Re-scans when `key` changes, for content that loads later.
 */
export function useReveal(key: unknown) {
  useEffect(() => {
    const root = document.querySelector('.mx');
    if (!root || reducedMotion() || !('IntersectionObserver' in window)) return;
    root.classList.add('mx-armed');
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = 'true';
          io.unobserve(entry.target);
        }
      },
      {rootMargin: '0px 0px -10% 0px', threshold: 0.08},
    );
    root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-shown])').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

/** Which section id is currently in the middle of the screen, for the nav's current item. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      {rootMargin: '-45% 0px -50% 0px'},
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join('|')]);
  return active;
}

/** True while the element is on screen. Used to play cover videos only when visible. */
export function useInView<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {threshold: 0.25});
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

/**
 * Tagline reveal: each word turns from muted to full colour as it crosses a line
 * 60% down the screen. One scroll listener, throttled through requestAnimationFrame.
 */
export function useWordReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
    if (reducedMotion()) {
      words.forEach((w) => (w.dataset.on = 'true'));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.6;
      for (const w of words) w.dataset.on = String(w.getBoundingClientRect().top < line);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}
