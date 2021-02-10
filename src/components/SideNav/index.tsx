import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ReplayIcon from "@material-ui/icons/Replay";
import TimerIcon from "@material-ui/icons/Timer";
import ViewListIcon from "@material-ui/icons/ViewList";
import {
  SellRoute,
  RegisterRoute,
  ReturnRoute,
  TransactionsRoute,
  InventoryRoute,
} from "@components/Routing";

import { useStyles } from "./styles";

export const SideNav: React.FC = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState("판매하기");
  const [open, setOpen] = React.useState(false);

  const onMouseEnter = () => {
    setOpen(true);
  };

  const onMouseLeave = () => {
    setOpen(false);
  };

  const onMenuClick = (text: string) => {
    setSelected(text);
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

  const routes: { [key: string]: string } = {
    판매하기: SellRoute,
    입고하기: RegisterRoute,
    반품하기: ReturnRoute,
    입출고기록: TransactionsRoute,
    재고관리: InventoryRoute,
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
      <List disablePadding>
        {["판매하기", "입고하기", "반품하기", "입출고기록", "재고관리"].map(
          (text) => (
            <ListItem
              button
              key={text}
              className={clsx(classes.button, {
                [classes.buttonActive]: selected == text,
              })}
              onClick={() => onMenuClick(text)}
              component={Link}
              to={routes[text]}
            >
              {selected == text && (
                <Divider
                  className={classes.divider}
                  absolute
                  orientation="vertical"
                />
              )}

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
