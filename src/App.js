import "./App.scss";
import { useEffect, useState } from "react";
import { Alert, Button, Layout, message, Select, Space, Spin } from "antd";
import { baseUrl, endpoints, methodes } from "./environment";

const { Content } = Layout;
const { Option } = Select;

function App() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [method, setMethod] = useState(methodes.get);
  const [content, setContent] = useState();

  const onSubmit = async () => {
    setLoading(true);
    fetch(baseUrl + value, {
      method: method,
    })
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
                onChange={setValue}
                value={value}
                placeholder="Select endpoint"
                allowClear={false}
                style={{ width: 200 }}
              >
                {Object.keys(endpoints).map((key) => (
                  <Option value={endpoints[key]} key={key}>
                    {key}
                  </Option>
                ))}
              </Select>
              <Select
                onChange={setMethod}
                value={method}
                placeholder="Select method"
                allowClear={false}
                style={{ width: 200 }}
              >
                {Object.keys(methodes).map((key) => (
                  <Option value={methodes[key]} key={key}>
                    {methodes[key]}
                  </Option>
                ))}
              </Select>
              <Button
                method="primary"
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
                method="info"
              />
            )}
          </div>
        </Content>
      </Layout>
    </Spin>
  );
}

export default App;
