// import { UserOutlined } from "@ant-design/icons";
import { Image, Carousel } from "antd";
import BackToLogin from '../services/redirect';

const CarouselIntro = (width) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Carousel
        autoplay
        style={{
          width: width,
        }}
        dotPosition="top"
      >
        <div>
          <Image
            width={width}
            src={`https://mediaprocessor.websimages.com/fit/1920x1920/clickbongo.webs.com/Copy of House cleaning Service instagram advert - Made with PosterMyWall.jpg`}
          />
        </div>
        <div>
          <Image
            width={width}
            src={`https://mediaprocessor.websimages.com/fit/1920x1920/clickbongo.webs.com/Copy of House cleaning Service instagram advert - Made with PosterMyWall.jpg`}
          />
        </div>
        <div>
          <Image
            width={width}
            src={`https://mediaprocessor.websimages.com/fit/1920x1920/clickbongo.webs.com/Copy of House cleaning Service instagram advert - Made with PosterMyWall.jpg`}
          />
        </div>
        <div>
          <Image
            width={width}
            src={`https://mediaprocessor.websimages.com/fit/1920x1920/clickbongo.webs.com/Copy of House cleaning Service instagram advert - Made with PosterMyWall.jpg`}
          />
        </div>
      </Carousel>
    </div>
  );
};

const Introductory = () => {
  BackToLogin()
  const small = window.matchMedia("(max-width:600)");

  const CarouselSize = () => {
    if (small.matches) {
      return CarouselIntro(200);
    } else {
      return CarouselIntro(500);
    }
  };

  return CarouselSize();
};

export default Introductory;
