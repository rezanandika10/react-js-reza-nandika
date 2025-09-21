import { deleteProduct } from "@/services/products/deleteProduct/deleteProduct";
import { getAllProducts } from "@/services/products/getProduct/getProduct";
import { Product } from "@/services/products/getProduct/productResponse";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const getAllProduct = ({ currentPage }: any) => {
  const [page, setPage] = useState(currentPage ?? 1);
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products", page],
    queryFn: () => {
      return getAllProducts();
    },
  });
  const total = data?.data.total ?? 0;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const limit = data?.data.limit;
  return {
    data,
    isLoading,
    isError,
    error,
    page,
    setPage,
    total,
    limit,
    selected,
    setSelected,
    rowsPerPage,
    setRowsPerPage,
    handleSelect,
    refetch,
  };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const deletedProduct = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const deleteProductMutation = useDeleteProduct();

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProductMutation.mutateAsync(selectedProduct.id);
        console.log("Product deleted successfully:", selectedProduct.title);

        handleDialogClose();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return {
    deleteDialogOpen,
    selectedProduct,
    handleDeleteClick,
    handleDialogClose,
    handleConfirmDelete,
    isLoading: deleteProductMutation.isPending,
    isError: deleteProductMutation.isError,
    error: deleteProductMutation.error,
  };
};
