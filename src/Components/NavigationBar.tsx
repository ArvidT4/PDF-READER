const NavigationBar = () => {
  return (
      <div className={"grid grid-cols-2"}>
          <div className={"grid grid-cols-6   focus:outline-none"}>
              <img className={"h-12 m-auto select-none pointer-events-none"} src={"/Aculubaliba.png"}/>
              <h1 className={"text-2xl m-auto font-serif col-start-2 col-end-5 hover:text-gray-600 duration-300 cursor-pointer"}> <a href={"/"}>Aculubaliba - PDF Reader</a></h1>
          </div>
          <div><ul className={"grid grid-cols-6 h-full"}>
                  <li className={"m-auto col-start-5 col-end-5 hover:text-gray-600 duration-300 cursor-pointer"}>
                      <a href={"/contact"}>Contact</a>
                  </li>
                  <li className={"m-auto col-start-6 col-end-6 hover:text-gray-600 duration-300 cursor-pointer"}>
                      <a href={"/about"}>About</a>
                  </li>
              </ul>
          </div>
      </div>

  );
};

export default NavigationBar;