import React from "react";
import clsx from "clsx";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ReplayIcon from "@material-ui/icons/Replay";
import TimerIcon from "@material-ui/icons/Timer";
import ViewListIcon from "@material-ui/icons/ViewList";

import { useStyles } from "./styles";

export const SideNav: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const onMouseEnter = () => {
    setOpen(true);
  };

  const onMouseLeave = () => {
    setOpen(false);
  };

  const mapTextToIcon = (text: string) => {
    switch (text) {
      case "판매하기":
        return <ShoppingCartIcon className={classes.buttonIcon} />;
      case "입고하기":
        return <AddCircleIcon className={classes.buttonIcon} />;
      case "반품하기":
        return <ReplayIcon className={classes.buttonIcon} />;
      case "입출고기록":
        return <TimerIcon className={classes.buttonIcon} />;
      case "재고관리":
        return <ViewListIcon className={classes.buttonIcon} />;
    }
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <List>
        {["판매하기", "입고하기", "반품하기", "입출고기록", "재고관리"].map(
          (text) => (
            <ListItem button key={text} className={classes.button}>
              <ListItemIcon>{mapTextToIcon(text)}</ListItemIcon>
              <ListItemText
                classes={{ primary: classes.buttonText }}
                primary={text}
              />
            </ListItem>
          ),
        )}
      </List>
    </Drawer>
  );
};
