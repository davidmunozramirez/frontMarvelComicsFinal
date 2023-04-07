import { Pagination, Stack } from "@mui/material";
import React from "react";
import { FC } from "react";

type props = {
  page: number;
  onChange: any;
  count: number
};

export const ButtonPaginationTemplate: FC<props> = ({ page, onChange, count }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        color="primary"
        page={page}
        onChange={onChange}
      />
      <br></br>
    </Stack>
  );
};
