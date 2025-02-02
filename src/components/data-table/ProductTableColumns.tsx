import { TBike } from "../../types";

interface HeadCell {
    disablePadding: boolean;
    id: keyof TBike;
    label: string;
    numeric: boolean;
  }
  
  export const headCells: readonly HeadCell[] = [
    {
      id: "image",
      numeric: false,
      disablePadding: true,
      label: "Image",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "brand",
      numeric: false,
      disablePadding: false,
      label: "Brand",
    },
    {
      id: "model",
      numeric: false,
      disablePadding: false,
      label: "Model",
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price",
    },
    {
      id: "quantity",
      numeric: true,
      disablePadding: false,
      label: "Quantity",
    },
    // {
    //   id: "action",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Action",
    // },
  ];


  