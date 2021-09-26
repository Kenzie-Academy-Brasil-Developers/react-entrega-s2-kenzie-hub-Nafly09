import Button from "../../Components/Button";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Container, Content, AnimationContainer, Background } from "./styles";
import Input from "../../Components/Input/index";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function SignUp() {
  const schema = yup.object().shape({
    name: yup.string().required("Campo Obrigatório"),
    email: yup.string().email("Email inválido").required("Campo Obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 dígitos")
      .matches(
        /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Senha deve conter ao menos uma letra maiúscula\n, uma minúscula, um número e um caracter especial!"
      )
      .required("Campo Obrigatório"),
    bio: yup
      .string()
      .min(50, "Mínimo de 50 caracteres")
      .required("Campo Obrigatório"),
    contact: yup.string().required("Campo Obrigatório"),
    module: yup.string().required("Campo Obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas Diferentes")
      .required("Campo Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
            <Input
              register={register}
              icon={FiUser}
              label="Nome"
              placeholder="Seu nome completo"
              name="name"
              error={errors.name?.message}
            />
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
              icon={FiUser}
              label="Biografia"
              placeholder="Conte-nos mais sobre você"
              name="bio"
              error={errors.bio?.message}
            />
            <Input
              register={register}
              icon={FiUser}
              label="Contato"
              placeholder="Contato"
              name="contact"
              error={errors.contact?.message}
            />
            <Input
              register={register}
              icon={FiUser}
              label="Módulo Atual"
              placeholder="Qual o seu módulo no curso atualmente?"
              name="module"
              error={errors.module?.message}
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
            <Input
              register={register}
              icon={FiLock}
              label="Confirmação de senha"
              placeholder="Confirmação de senha"
              type="password"
              name="passwordConfirm"
              error={errors.passwordConfirm?.message}
            />
            <Button type="submit">Enviar</Button>
            <p>
              Já tem uma conta? Faça seu <Link to="/login">Login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default SignUp;
