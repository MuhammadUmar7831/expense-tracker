// import React, { useState } from "react";
// import {
//   CssBaseline,
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Dashboard, AccountBalance, Receipt } from "@mui/icons-material";
// import QueryStatsIcon from "@mui/icons-material/QueryStats";
// import { Link } from "react-router-dom";

// const drawerWidth = 200;

// export default function DashBoard_Menu() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Dashboard
//           </Typography>
//           <Box sx={{ flexGrow: 1 }} />
//           <Typography variant="h6" noWrap component="div">
//             Nooran
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           <DrawerContent />
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           open
//         >
//           <DrawerContent />
//         </Drawer>
//       </Box>
//     </Box>
//   );
// }

// function DrawerContent() {
//   return (
//     <div>
//       <Toolbar />
//       <Divider />
//       <Box sx={{ overflow: "auto" }}>
//         <List>
//           {[
//             { name: "Stats", link: "/dashboard" },
//             { name: "Budgets", link: "/dashboard/budget" },
//             { name: "Expenses", link: "/dashboard/expense" },
//           ].map((item, index) => (
//             <Link to={item.link} key={index}>
//               <ListItem button>
//                 <ListItemIcon>
//                   {index === 0 && <QueryStatsIcon />}
//                   {index === 1 && <AccountBalance />}
//                   {index === 2 && <Receipt />}
//                 </ListItemIcon>
//                 <ListItemText primary={item.name} />
//               </ListItem>
//             </Link>
//           ))}
//         </List>
//       </Box>
//       <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
//         <Divider />
//         <ListItem className="flex">
//           <ListItemIcon></ListItemIcon>
//         </ListItem>
//       </Box>
//     </div>
//   );
// }
