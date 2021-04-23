/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

// Components
import { Button, Image, Spin, Space, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { getPostcard } from "../functions/api";

export default function ViewPostcard() {
  const [postcard, setPostcard] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    loadPostcard();
  }, id);

  const loadPostcard = () => {
    setLoading(true);
    getPostcard(id)
      .then((res) => {
        setLoading(false);
        setPostcard(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        message.error("Error");
      });
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
            {postcard && (
              <>
                <Image src={postcard.image} alt="postcard" width={500} />
                <p>{postcard.text}</p>
                <Button type="primary" onClick={() => history.push("/")}>
                  Back to Home
                  <HomeOutlined />
                </Button>
              </>
            )}
          </>
        )}
      </body>
    </div>
  );
}
