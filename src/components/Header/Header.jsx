import React, { useContext } from "react";

import "./header.css";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Delete, Logout, Settings } from "@mui/icons-material";
import { GeneralFirebaseContext } from "../../context/GeneralFirebaseContext";

export default function Header() {
  const { user, logOut, deleteData } = useContext(GeneralFirebaseContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDia, setOpenDia] = React.useState(false);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(user);
  };

  const handleClear = () => {
    deleteData(user.uid);
    setOpenDia(false);
    navigate("/kazaAnketa");
  };

  const handleCloseDia = () => {
    setOpenDia(false);
  };

  const handleClose = (type) => {
    if (type === "close") {
      navigate("/");
      logOut();
    } else if (type === "clear") {
      setOpenDia(true);
    } else {
      navigate("/kazaNamazdar");
    }
    setAnchorEl(null);
  };

  return (
    <header>
      <div className="header__inner">
        <div className="kaza-logo" onClick={() => navigate("/")}>
          Kaza <br /> Tracker
        </div>
        {!user && (
          <div className="acc-off">
            <Button
              onClick={() => navigate("/login")}
              style={{
                borderRadius: 35,
              }}
              variant="contained"
            >
              Кируу
            </Button>
          </div>
        )}
        {user && (
          <div className="acc-on">
            {" "}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.email ? user.email[0].toUpperCase() : ""}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              className="header-dialog"
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>{user?.name}</MenuItem>

              <Divider />

              <MenuItem onClick={() => handleClose("kaza")}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Каза намаздарды озгортуу
              </MenuItem>
              <MenuItem onClick={() => handleClose("clear")}>
                <ListItemIcon>
                  <Delete size="small" />
                </ListItemIcon>
                Данныйлардын баарын очуруу
              </MenuItem>
              <MenuItem onClick={() => handleClose("close")}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <Dialog
              open={openDia}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Каза намаздарыныздын очурулуусун кабыл кыласызбы?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Кабыл кыла турган болсонуз сакталган каза намаздарыныз тууралы
                  бардык маалымат очурулот.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDia}>Жок</Button>
                <Button onClick={handleClear} autoFocus>
                  Кабыл кылам
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    </header>
  );
}
