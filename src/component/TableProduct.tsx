import { ProductsResponse, Product } from "@/services/products/getProduct/productResponse";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableProduct = ({
  data,
  isLoading,
  page,
  rowsPerPage,
  onClick,
}: {
  data: ProductsResponse;
  isLoading: boolean;
  page: number;
  rowsPerPage: number;
  onClick: (product: Product) => void;
}) => {
  return (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          <TableCell>ID</TableCell>
          <TableCell>TITLE</TableCell>
          <TableCell>BRAND</TableCell>
          <TableCell>CATEGORY</TableCell>
          <TableCell>AVAILABILITY</TableCell>
          <TableCell>PRICE</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : (
          data.products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((products) => (
              <TableRow key={products.id} hover>
                <TableCell>{products.id}</TableCell>
                <TableCell>{products.title}</TableCell>
                <TableCell>{products.brand ?? "-"}</TableCell>
                <TableCell>{products.category}</TableCell>
                <TableCell>{products.availabilityStatus}</TableCell>
                <TableCell>{products.price}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onClick(products)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default TableProduct;
