import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "./_components/header";

const HomePage = () => {
  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Dashboard</HeaderSubtitle>
          <HeaderTitle>Home</HeaderTitle>
        </HeaderLeft>
      </Header>
    </div>
  );
};

export default HomePage;
