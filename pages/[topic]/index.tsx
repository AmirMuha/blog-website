import { GetServerSideProps, NextPage } from "next";
interface Props {}
const Page: NextPage<Props> = ({}) => {
  return null;
};
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  return {
    redirect: {
      destination: `/${params?.topic}/1`,
      permanent: true,
    },
  };
};
export default Page;
