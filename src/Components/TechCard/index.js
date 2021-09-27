import { Container } from "./styles";
import { FiClipboard, FiCalendar } from "react-icons/fi";
import Button from "../Button";
function TechCard({ title, date, mastery, onClick }) {
  return (
    <Container>
      <span>
        <FiClipboard /> {title}
      </span>
      <hr />
      <time>
        <FiCalendar /> {date}
      </time>
      <span>{mastery}</span>
      <Button onClick={onClick}>Remover Tech</Button>
    </Container>
  );
}

export default TechCard;
