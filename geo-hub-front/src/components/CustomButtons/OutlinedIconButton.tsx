import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

/* This code is exporting a styled component called `OutlinedIconButton` which is a customized version
of the `IconButton` component from the `@mui/material` library. The styling is defined using the
`styled` function from the same library, and it sets the background color to transparent, the border
radius to 100%, and adds a transition effect for the background color and text color. When the
button is hovered over, the background color changes to the primary light color defined in the
theme, and the text color changes to the secondary main color defined in the theme. */

export const OutlinedIconButton = styled(IconButton)`
  ${({ theme }) => `  
  background-color: transparent;
  borderRadius: "100%"
  transition: ${theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: transparent;
    color: white;  
  }
  &:focus {
    background-color: transparent;      
  }
  
  `};
`;
