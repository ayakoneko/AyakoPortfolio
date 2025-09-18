import { useEffect, useRef } from "react";

export default function useTypingEffect(words, speed = 80) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let w = 0, i = 0, dir = 1;
    const tick = () => {
      el.textContent = words[w].slice(0, i);
      i += dir;
      if (i > words[w].length + 6) dir = -1;
      if (i < 0) { dir = 1; w = (w + 1) % words.length; }
    };
    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [words, speed]);
  return ref;
}
