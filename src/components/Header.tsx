'"use client";';
import Container from "./Container";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavMenu from "./NavMenu";
import Searchbar from "./Searchbar";

const Header = () => {
  return (
    <header className=" text-white shadow-md sticky top-0 z-50">
      <Container className=" text-black p-5 flex justify-between items-center h-16 max-w-full">
        <div className="flex items-center gap-2.5 w-auto md:w-1/3 justify-start md:gap-0">
          <MobileMenu /> <Logo />
        </div>

        <NavMenu />
        {/*Search bar*/}
        {/*admin navbar*/}
        <Searchbar />
      </Container>
    </header>
  );
};

export default Header;
