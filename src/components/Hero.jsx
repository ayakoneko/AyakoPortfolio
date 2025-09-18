import useTypingEffect from "../../src/hooks/useTypingEffect";

export default function Hero() {
  const ref = useTypingEffect(["software developer", "full-stack tinkerer", "lifelong learner"]);

  return (
    <header id="home" className="hero">
      <img className="hero-img" src="/images/tree5.webp" alt="tree street" />
      <div className="hero-overlay" />
      <div className="hero-content text-center">
        <h1 className="hero-title">Ayako Kaneko</h1>
        <p className="hero-subtitle"><span ref={ref} className="typing-effect" /></p>
      </div>
    </header>
  );
}
