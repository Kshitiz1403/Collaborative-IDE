import styled from "styled-components/macro";

export const StyledFolder = styled.section`
  font-weight: bold;
  padding-left: ${(p) => p.theme.indent}px;
  user-select: none;
  .tree__file {
    padding-left: ${(p) => p.theme.indent}px;
  }
`;
