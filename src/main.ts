import "./style.css";
import Typewriter from "./typewriter";

const app = document.querySelector<HTMLDivElement>("#app")!;

const typewriter = new Typewriter(app, {
  loop: true,
});

typewriter
  .pauseFor(200)
  .typeString("A simple yet powerful native javascript")
  .pauseFor(400)
  .typeString("\n\nLorem ipsum dolor sit amet")
  .pauseFor(400)
  .deleteChars(28)
  .typeString("\n\nDoes everyone struggle this much?")
  .pauseFor(400)
  .typeString("\n\nThere has to be an easier way.")
  .pauseFor(1000)
  .deleteAll(20)
  .start();
