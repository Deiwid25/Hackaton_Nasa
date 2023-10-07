import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

type StyledButtonProps = {
  clicked: boolean;
};

/* This code exports a styled component called `MenuButton` which is a customized version of the
`Button` component from the `@mui/material` library. The customization is done using the `styled`
function from the same library. */
export const MenuButton = styled(Button)<StyledButtonProps>`
  ${({ theme, clicked }) => `
  background-color: ${
    clicked ? theme.palette.secondary.dark : theme.palette.secondary.main
  };
  color: ${clicked ? theme.palette.secondary.main : theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${theme.palette.secondary.light};
    color: ${theme.palette.secondary.main};
  }
  `};
`;

//Clicked property is only useful if it's manipulated with a State

// Like this
//   const [clicked, setClicked] = React.useState(false);

//   const handleButtonClick = () => {
//     setClicked(!clicked);
//   };
