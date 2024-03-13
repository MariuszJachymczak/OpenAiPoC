import Picture from "../../../assets/images/architecture-2256489_1920.jpg";
import Picture1 from "../../../assets/images/ey-encrypted-spreadsheet-with-financial-figures-and-graph-starry-night-background.jpg.rendition.3840.2560.jpg";

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-row h-1/4 font-inter">
        <div className="basis-1/4 overflow-hidden rounded-sm">
          <img
            src={Picture}
            alt="Innovative Solutions"
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-150"
          />
        </div>
        <div className="basis-3/4 bg-red07 hover:bg-red06 rounded-sm flex items-center justify-center">
          <div>ONE STEP SOLUTIONS FOR ALL YOUR CORPORATE NEEDS</div>
        </div>
      </div>
      <div className="flex flex-row h-3/4 font-inter">
        <div className="basis-1/4 bg-red07 hover:bg-red06 rounded-sm flex items-center justify-center">
          <div>Empowering your workflow and productivity</div>
        </div>
        <div className="basis-3/4 relative overflow-hidden">
          <img
            className="absolute w-full h-full object-cover rounded-sm transition-transform duration-700 hover:scale-125"
            src={Picture1}
            alt="Skyscrappers"
          />

          <div
            className="absolute w-full h-full rounded-sm flex flex-col items-center justify-start"
            style={{ pointerEvents: "none" }}
          >
            <p
              className="text-white p-4 text-3xl"
              style={{ pointerEvents: "auto" }}
            >
              Welcome to your digital gateway, where every click unlocks a
              universe of possibilities.
            </p>
          </div>
          <button
            type="button"
            className="absolute bottom-20 px-8 py-3 font-semibold rounded-sm bg-button01 text-gray-800"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            Go To Chat
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
