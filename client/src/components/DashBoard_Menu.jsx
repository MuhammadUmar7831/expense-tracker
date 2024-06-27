
import { Box, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Card, CardContent, CardHeader } from '@mui/material';
import { Dashboard, AccountBalance, Receipt} from '@mui/icons-material';

const drawerWidth = 200;

export default function DashBoard_Menu() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 3,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Budgets', 'Expenses'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 && <Dashboard />}
                  {index === 1 && <AccountBalance />}
                  {index === 2 && <Receipt />}
                  
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', paddingLeft: 1, marginLeft: -20, marginTop: -10}}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom marginLeft={-85} >
          Hi, nooran tahir ✌
        </Typography>
        <Typography variant="subtitle1" gutterBottom marginLeft={-57}>
          Here I&#39;s what happening with your money, Let I&#39; s manage your expense.
        </Typography>
        <Grid container spacing={3}>
          {/* Top Cards */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" >Card 1</Typography>
                {/* Content for card 1 */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Card 2</Typography>
                {/* Content for card 2 */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Card 3</Typography>
                {/* Content for card 3 */}
              </CardContent>
            </Card>
          </Grid>
          {/* Activity Section */}
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, bgcolor: '#f0f4f8' }}>
              <Typography variant="h6">Activity</Typography>
              {/* Add your chart component here */}
            </Box>
          </Grid>
          {/* Latest Budgets */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300, bgcolor: '#f0f4f8' }}>
              <Typography variant="h6">Latest Budgets</Typography>
              {/* Add budget details here */}
            </Box>
          </Grid>
          {/* Latest Expenses Table */}
          <Grid item xs={12}>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#f0f4f8' }}>
              <Typography variant="h6">Latest Expenses</Typography>
              {/* Add expenses table here */}
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

              </table>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
