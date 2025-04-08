const DemoPicture = () => {
    const picture='/demo.png'
    return (
    <div className={"place-self-end"}>
        <img className={"h-60 pointer-events-none select-none focus:outline-none"} src={picture} alt={"img"}/>
    </div>
  );
};

export default DemoPicture;