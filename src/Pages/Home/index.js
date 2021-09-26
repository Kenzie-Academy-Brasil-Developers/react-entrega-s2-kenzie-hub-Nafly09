import { Container, Content } from "./styles";
import Button from "../../Components/Button";
import { useHistory } from "react-router";

function HomePage() {
  const history = useHistory();
  const handleNavigation = (path) => {
    return history.push(path);
  };

  return (
    <Container>
      <Content>
        <h1>KenzieHub</h1>
        <span>Plataforma número 1 de interação entre kenzinhos</span>
        <div>
          <Button whiteSchema onClick={() => handleNavigation("/signup")}>
            Cadastre-se
          </Button>
          <Button onClick={() => handleNavigation("/login")}>Login</Button>
        </div>
      </Content>
    </Container>
  );
}

export default HomePage;
