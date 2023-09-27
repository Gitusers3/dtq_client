import React, { useState } from 'react';
import { Input, InputAdornment, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateIcon from '@mui/icons-material/Create';
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <Input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
      <label htmlFor="file-upload">
        <InputAdornment position="end">
          <IconButton disabled color="primary" component="span">
            <CloudUploadIcon />
          </IconButton>
          <IconButton disabled color="primary" component="span">
            <CreateIcon />
          </IconButton>
        </InputAdornment>
      </label>
    </div>
  );
};

export default FileUpload;
