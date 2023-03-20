import { Button } from 'antd';
import styled from 'styled-components';
import { Colors } from 'utils/colors';

export const AddButton = styled(Button)`
  border-radius: 0px;
  box-shadow: none;
  &:hover {
    background-color: ${Colors.PRIMARY} !important;
  }
`;
