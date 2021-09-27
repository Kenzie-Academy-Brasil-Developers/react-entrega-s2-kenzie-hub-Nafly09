import { Container, InputContainer, TechsContainer } from "./styles";
import { Redirect } from "react-router-dom";
import Input from "../../Components/Input";
import TechCard from "../../Components/TechCard";
import Button from "../../Components/Button";
import { FiEdit2 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
function Dashboard({ authenticated }) {
  const [techs, setTechs] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@kenzieHub:token")) || ""
  );
  const [userData, setUserData] = useState([]);
  const { register, handleSubmit } = useForm();

  function loadTechs() {
    api
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const apiTechs = response.data.techs.map((tech) => ({
          ...tech,
          created_at: new Date(tech.created_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTechs(apiTechs);
      })
      .then((response) => setUserData(response.data))
      .catch((err) => console.log(err));
  }

  const removeTech = (id) => {
    const newTechs = techs.filter((tech) => tech.id !== id);
    api
      .delete(`/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => setTechs(newTechs));
  };

  useEffect(() => {
    loadTechs();
  }, []);

  const onSubmit = (tech) => {
    if (!tech) {
      return toast.error("Precisa ter uma tech válida");
    }
    api
      .post(
        "/users/techs",
        {
          title: tech.tecnology,
          status: tech.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => loadTechs());
  };
  console.log(techs);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <h3>Bem-vindo {userData.name}</h3>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova tecnologia"
            register={register}
            name="tecnology"
          />
          <Input
            icon={FiEdit2}
            placeholder="Aptidão com a tecnologia"
            register={register}
            name="status"
          />
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TechsContainer>
        {techs?.map((task) => (
          <TechCard
            key={task.id}
            title={task.title}
            date={task.created_at}
            mastery={task.status}
            onClick={() => removeTech(task.id)}
          />
        ))}
      </TechsContainer>
    </Container>
  );
}

export default Dashboard;
