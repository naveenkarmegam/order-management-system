// Export.js
import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { Download } from 'react-bootstrap-icons';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { mkConfig, generateCsv, download } from 'export-to-csv';

const Export = ({ table, columns }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows, type) => {
    console.log(rows.filter((row) => row.original.address ))
    if (type === 'csv') {
      const rowData = rows.filter((row) => row.original!=='address').map((row) => row.original);
      const csv = generateCsv(csvConfig)(rowData);
      download(csvConfig)(csv);
      
    } else if (type === 'pdf') {
      // Export PDF using jsPDF
      const doc = new jsPDF();
      const tableData = rows.map((row) => Object.values(row.original).slice(0, -1));
      const tableHeaders = columns.filter((col) => col.export !== false).map((c) => c.header);
      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
      });
      doc.save('order-info.pdf');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
      <Button
        onClick={handleMenuClick}
        startIcon={<Download className="fs-6" />}
      >
        Export
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleExportRows(table.getPrePaginationRowModel().rows, 'csv');
            handleMenuClose();
          }}
        >
          Export CSV
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleExportRows(table.getPrePaginationRowModel().rows, 'pdf');
            handleMenuClose();
          }}
        >
          Export PDF
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Export;
