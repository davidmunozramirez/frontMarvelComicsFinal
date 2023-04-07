import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { CardDetail } from "dh-marvel/components/carDetail/cardDetail";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { Comic } from "dh-marvel/features/types";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { NextPage } from "next";
import Link from "next/link";

interface props {
  data: Comic;
}
/**
 * Route to display the details of a selected comic
 * @param data data fetched from the api
 * @returns a component which renders details of a comic
 * @author David Muñoz
 */
const ComicsDetail: NextPage<props> = ({ data }) => {
  return (
    <>
    <LayoutGeneral>
      <CardDetail
        title={data.title}
        image={data.thumbnail.path + "." + data.thumbnail.extension}
        description={data.description}
        price={data.price}
        characters={
          data.characters.available
            ? data.characters.items.map((charac: any) => {
                return (
                  <div key={charac}>
                    <Divider>
                      <Box sx={{ p: 1 }}>
                        <Link
                          key={charac.name}
                          href={`/character/${charac.resourceURI.substr(47)}`}
                        >
                          {charac.name}
                        </Link>
                      </Box>
                    </Divider>
                  </div>  
                );
              })
            : null
        }
        stock={data.stock}
        available={data.characters.available}
        oldPrice={data.oldPrice}
        id={data.id}
      ></CardDetail>
      </LayoutGeneral>
    </>
  );
};

export default ComicsDetail;

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query;
  const res = await getComic(id);

  console.log(res);

  return { props: { data: res } };
}
