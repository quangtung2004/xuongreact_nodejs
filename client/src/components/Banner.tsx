import { Box, Stack, styled } from "@mui/material";
type BannerProps = {
  page: string;
};

const Banner = ({ page }: BannerProps) => {
  return (
    <>
      <BannerImage>
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <img />
          
        </Stack>
      </BannerImage>
    </>
  );
};

export default Banner;

const BannerImage = styled(Box)({
  backgroundImage: "url(./1.jpg)",
  height: "316px",
});
