const NavigationBar = () => {
  return (
    <div className={"grid grid-cols-12  select-none pointer-events-none focus:outline-none"}>
        <img className={"h-12 m-auto"} src={"/Aculubaliba.png"}/>
        <h1 className={"text-2xl m-auto font-serif col-start-2 col-end-5"}>Aculubaliba - PDF Reader</h1>
    </div>
  );
};

export default NavigationBar;