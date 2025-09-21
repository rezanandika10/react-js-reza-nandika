import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllProduct, deletedProduct } from "./hooks";
import TableProduct from "@/component/TableProduct";

const HomePage: React.FC = () => {
  const { data, isLoading, page, setPage, rowsPerPage, setRowsPerPage } =
    getAllProduct({
      currentPage: 0,
    });

  const {
    deleteDialogOpen,
    selectedProduct,
    handleDeleteClick,
    handleDialogClose,
    handleConfirmDelete,
    isLoading: deleteIsLoading,
  } = deletedProduct();

  return (
    <Paper
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: 0,
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        boxShadow: 0,
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h6" mb={2}>
        Product Summary
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField label="Search..." variant="outlined" size="small" />
        <Button variant="contained" startIcon={<SearchIcon />}>
          Search
        </Button>
      </Box>
      {data?.data && (
        <TableProduct
          data={data.data}
          isLoading={isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          onClick={handleDeleteClick}
        />
      )}
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <TablePagination
          component="div"
          count={data?.data.total || 0}
          page={page || 0}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the product "
            {selectedProduct?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default HomePage;
