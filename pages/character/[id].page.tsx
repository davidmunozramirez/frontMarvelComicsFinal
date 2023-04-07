import { Box, Divider, Link } from "@mui/material";
import { CharacterCard } from "dh-marvel/components/characterCard/characterCard";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { getCharacter } from "dh-marvel/services/marvel/marvel.service";
import { NextPage } from "next";

const CharacterId: NextPage = ({ data }: any) => {
  return (
    <LayoutGeneral>
    <Box sx={{ p: 4 }}>
      <CharacterCard
        image={data?.thumbnail?.path + "." + data?.thumbnail?.extension}
        name={data?.name}
        description={data?.description}
        comics={data?.comics?.items?.map((com: any) => {
          return (
            <div key={com} >
              <Divider>
                <Box sx={{ p: 1 }}>
                  <Link
                    key={com.name}
                    href={`/comics/${com.resourceURI.substr(43)}`}
                  >
                    {com.name}
                  </Link>
                </Box>
              </Divider>
            </div>  
          );
        })}
        id={data?.id}
      />
    </Box>
    </LayoutGeneral>
  );
};

export default CharacterId;

export async function getServerSideProps(context: { query: { id: number } }) {
  const { id } = context.query;
  const res = await getCharacter(id);

  console.log(res);

  return { props: { data: res } };
}
