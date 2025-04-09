const Footer = () => {
  return (
    <div className={"bg-gray-100 w-full h-40 border-t border-gray-400 flex flex-col"}>
        <ul className={"grid grid-rows-2 grid-cols-3 w-1/2 m-auto mt-20 flex-1"}>
          <li className={"m-auto hover:text-gray-600 duration-300 cursor-pointer font-mono"}> <a href={"/"}>Home</a> </li>
          <li className={"m-auto hover:text-gray-600 duration-300 cursor-pointer font-mono"}> <a href={"/about"}>About</a> </li>
          <li className={"m-auto hover:text-gray-600 duration-300 cursor-pointer font-mono"}> <a href={"/contact"}>Contact</a> </li>
        </ul>
      <div className={"w-full text-center bg-gray-300 border-t border-gray-400"}>
          <div className={"flex place-self-center"}>
              Designed by - <p className={"italic ml-2 mr-2"}>Arvid Pettersson </p>
          </div>
      </div>
    </div>
  );
};

export default Footer;