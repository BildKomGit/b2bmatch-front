// pages/index.tsx
import Main from '@/components/Main';
import { Session } from 'next-auth'
import Providers from "../components/Providers";
interface Props {
  session: Session | null
  children: React.ReactNode
}

const Home: React.FC = () => {
  return (
    <div>
      <Providers>
        <Main />
      </Providers>
    </div>
  );
};

export default Home;
