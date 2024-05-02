import { Avatar, styled } from "@mui/material";
import { Children } from "react";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.shadows[4],
  marginLeft:'8px',
  border: `1.5px solid ${theme.palette.primary.main} `
}));

export default function CircleIcons({children}) {
  return (
    <>
      {Children.map(children, (child) => (
        <StyledAvatar className="Row">{child}</StyledAvatar>
      ))}
    </>
  );
}
