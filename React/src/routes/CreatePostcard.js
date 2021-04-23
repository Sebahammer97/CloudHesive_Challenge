import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import { Upload, message, Image, Input, Button, Spin, Space } from "antd";
import {
  InboxOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { createPostcard } from "../functions/api";

export default function CreatePostcard() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { Dragger } = Upload;
  const { TextArea } = Input;
  const history = useHistory();

  const onFileUploading = ({ file, onSuccess }) => {
    try {
      if (verifyImage(file)) {
        const reader = new FileReader();
        reader.addEventListener("load", () => setImage(reader.result));
        reader.readAsDataURL(file);
        onSuccess("done");
        message.success(`${file.name} file upload success.`);
      }
    } catch {
      onSuccess("failed");
      message.error(`${file.name} file upload failed.`);
    }
  };

  const verifyImage = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadPostcard = () => {
    if (image !== null) {
      setLoading(true);
      createPostcard({ text, image })
        .then((res) => {
          alert("Postcard created successfully");
          alert(
            `Link to share: http://localhost:3000/postcard/view/${res.data.message}`
          );
          history.push("/");
        })
        .catch((error) => {
          message.error("Error");
          console.log(error);
          setLoading(false);
        });
    } else {
      message.error("Enter an image please.");
    }
  };

  return (
    <div className="App">
      <body className="App-body">
        {loading ? (
          <Space>
            <Spin size="large" />
          </Space>
        ) : (
          <>
            <p className="title">First step: Upload an Image</p>
            {image ? (
              <>
                <Image src={image} alt="postcard" width={200} />
                <Button
                  style={{ borderRadius: 20, margin: 10 }}
                  onClick={() => setImage(null)}
                >
                  <DeleteOutlined /> Change image
                </Button>
              </>
            ) : (
              <Dragger
                accept="image/png, image/jpeg"
                customRequest={onFileUploading}
                multiple={false}
                style={{ padding: 5 }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single upload. Strictly prohibit from uploading
                  company data or other band files
                </p>
              </Dragger>
            )}

            <p className="title">Second step: write a text to your postcard</p>
            <TextArea
              autoSize={{ minRows: 4 }}
              onChange={({ target }) => setText(target.value)}
              allowClear
            />
            <Button
              type="primary"
              style={{ borderRadius: 20, margin: 10 }}
              onClick={uploadPostcard}
            >
              Upload
              <UploadOutlined />
            </Button>
          </>
        )}
      </body>
    </div>
  );
}
