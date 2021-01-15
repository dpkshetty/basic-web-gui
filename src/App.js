import "./App.scss";
import { useEffect, useState } from "react";
import { Alert, Button, Layout, message, Select, Space, Spin } from "antd";
import { baseUrl, endpoints } from "./environment";

const { Content } = Layout;
const { Option } = Select;

function App() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [content, setContent] = useState();

  const handleChange = (value) => {
    setValue(value);
  };

  const onSubmit = async () => {
    setLoading(true);
    fetch(baseUrl + value)
      .then((reponse) => reponse.text())
      .then((text) => {
        setLoading(false);
        setContent(text);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.toString());
      });
  };

  useEffect(() => {
    setContent();
  }, [value]);

  return (
    <Spin spinning={loading}>
      <Layout className="layout">
        <Content>
          <div className="site-layout-content">
            <Space>
              <Select
                defaultValue="lucy"
                onChange={handleChange}
                value={value}
                placeholder="Select option"
                allowClear={false}
                style={{ width: 200 }}
              >
                {Object.keys(endpoints).map((key) => (
                  <Option value={endpoints[key]} key={key}>
                    {key}
                  </Option>
                ))}
              </Select>
              <Button
                type="primary"
                onClick={onSubmit}
                disabled={value == null}
              >
                Submit
              </Button>
            </Space>

            {content && (
              <Alert
                style={{ marginTop: 20 }}
                message={
                  <span dangerouslySetInnerHTML={{ __html: content }}></span>
                }
                type="info"
              />
            )}
          </div>
        </Content>
      </Layout>
    </Spin>
  );
}

export default App;
