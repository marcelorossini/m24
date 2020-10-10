// Imports padrão
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../components/site/Layout";
import { Divider, PageTitle, Button, ViewHtml } from "../../styles/global";
import {
  Container,
  ListService,
  ListItem,
  ListImage,
} from "../../styles/pages/servicos/index.js";

// Imports auxiliares
import api from "../../services/api";
import { fetchData } from "../../services/helpers";

const Servicos = (props) => {
  const router = useRouter();
  console.log(props.servicos);

  return (
    <>
      <Head>
        <title>Serviços - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Serviços</PageTitle>
          <ListService>
            {Object.keys(props.servicos).length > 0 &&
              props.servicos.map((item, index) => (
                <>
                  <li key={index}>
                    {index !== 0 && <Divider />}
                    <ListItem right={index % 2 !== 0}>
                      <PageTitle small>{item.title}</PageTitle>
                      <ListImage>
                        <img src={item.image} />
                      </ListImage>
                      <ViewHtml
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                      <Link href={`${router.pathname}/${item.url}`}>
                        <Button secondary>Saiba mais</Button>
                      </Link>
                    </ListItem>
                  </li>
                </>
              ))}
          </ListService>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;

export async function getStaticProps() {
  // Carregar
  const servicos = await fetchData(api.get("/services"));

  return {
    props: {
      servicos,
    },
  };
}
