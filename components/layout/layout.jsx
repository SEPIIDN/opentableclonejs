import Search from './search';
import Header from './header';
import MainContainer from './container';

function Layout(props) {
  return (
    <MainContainer>
      <Header />
      <Search />
      <main>{props.children}</main>
    </MainContainer>
  );
}

export default Layout;
