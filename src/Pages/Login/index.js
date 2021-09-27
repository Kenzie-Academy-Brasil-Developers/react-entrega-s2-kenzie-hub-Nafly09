import Button from "../../Components/Button";
import { Redirect, useHistory } from "react-router";
import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Container, Content, AnimationContainer, Background } from "./styles";
import Input from "../../Components/Input/index";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";

function Login({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo Obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 dígitos")
      .required("Campo Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitFunction = ({ password, email }) => {
    const user = { password, email };
    api
      .post("/sessions", user)
      .then((response) => {
        const { token } = response.data;

        localStorage.setItem("@kenzieHub:token", JSON.stringify(token));

        setAuthenticated(true);
        return history.push("/dashboard");
      })
      .catch((_) => toast.error("Email ou senha inválidos"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Login</h1>
            <Input
              register={register}
              name="email"
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              error={errors.email?.message}
            />
            <Input
              register={register}
              icon={FiLock}
              label="Senha"
              placeholder="Uma senha bem segura"
              type="password"
              name="password"
              error={errors.password?.message}
            />
            <Button type="submit">Login</Button>
            <p>
              Não tem uma conta? Crie a sua <Link to="/signUp">Agora</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default Login;
