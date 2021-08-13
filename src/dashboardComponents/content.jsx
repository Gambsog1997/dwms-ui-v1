import UpperPart from "./upperSection";
import MiddleSection from "./centerSection";

const Contents = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-evenly",
          width: "auto",
        }}
      >
        <div
          style={{
            margin: "5px",
            padding: "10px",
            flexGrow: 1,
          }}
        >
          <UpperPart />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "10px",
          justifyContent: "center",
          padding: "10px",
          flexWrap: "wrap",
        }}
      ></div>
      <div>
        <MiddleSection />
      </div>
    </div>
  );
};

export default Contents;
