import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className="text-3xl text-center font-bold underline mt-10">
        Welcome!
      </h1>
      <p className="mt-12">
        Lorem ipsum dolor sit amet, cu decore electram torquatos pro, ea mutat
        dicant sit. Pro in quidam lobortis facilisis, no saepe evertitur duo,
        sed te cibo menandri. Ut est error nemore consequat, eam at petentium
        assentior, ei sea omnium ceteros tincidunt. Ut vis paulo exerci
        adipisci, per ei porro facilis efficiantur. Pro at nihil oratio.
      </p>
      <button
        className="px-8 py-2 border-2 rounded-md mx-auto flex justify-center mt-20 font-bold"
        style={{ borderColor: "#000080", color: "#000080" }}
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>
    </Layout>
  );
};

export default Home;
