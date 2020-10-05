import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import styled from "styled-components";
import { useRouter } from 'next/router'

const ToolbarContainItem = styled.div.attrs(({ align }: { align: string }) => ({
  className: `w-1/2 flex justify-${align}`,
}))``;

const index = () => {
  const router = useRouter()

  return (
    <AppBar position="sticky" color="default">
      <Toolbar variant="dense" className="flex">
        <ToolbarContainItem align="start">
          <Typography variant="h6">Store App</Typography>
        </ToolbarContainItem>

        <ToolbarContainItem align="end">
          <div>
            <Button variant="outlined"  disableElevation onClick={()=>router.push('/')} >
              Store
            </Button>
            <Button variant="outlined"  disableElevation style={{marginLeft:'2rem'}} onClick={()=>router.push('/raul')}>
              Raul
            </Button>
          </div>
        </ToolbarContainItem>
      </Toolbar>
    </AppBar>
  );
};

export default index;
