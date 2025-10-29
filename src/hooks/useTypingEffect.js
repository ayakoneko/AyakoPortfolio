import { useEffect, useRef } from "react";

export default function useTypingEffect(words, speed = 100) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let w = 0, i = 0;

    const tick = () => {
      const word = words[w];
      el.textContent = word.slice(0, i++);
      if (i > word.length) {
        setTimeout(() => {
          i = 0;
          w = (w + 1) % words.length;
          el.textContent = "";
        }, 1000); // pause before next word
      }
    };

    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [words, speed]);

  return ref;
}
