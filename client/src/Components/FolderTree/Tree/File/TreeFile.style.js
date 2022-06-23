import styled from "styled-components/macro";

export const StyledFile = styled.div`
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  font-weight: normal;
  user-select: none;
  padding-left: ${(p) => p.theme.indent}px;
`;
